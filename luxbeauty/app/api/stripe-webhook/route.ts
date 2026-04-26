import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(req: Request) {

    console.log("inside stripe webhook");
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing Stripe signature" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("Webhook signature failed:", err);

        return NextResponse.json(
            { error: "Invalid Stripe signature" },
            { status: 400 }
        );
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const {
            customerEmail,
            formattedDate,
            selectedTime,
            uniqueBookingID,
        } = paymentIntent.metadata;
        console.log("metadata:", paymentIntent.metadata);

        await transporter.sendMail({
            from: `"LuxxBeeBeauty" <${process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: "Appointment Confirmed",
            html: `
        <h2>Appointment Confirmed</h2>
        <p>Your booking has been confirmed.</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
        <p><strong>Booking ID:</strong> ${uniqueBookingID}</p>
      `,
        });
    }

    return NextResponse.json({ received: true });
}