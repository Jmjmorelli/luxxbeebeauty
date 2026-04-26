import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { useBooking } from "@/app/context/bookingContext";
import { useCart } from "@/app/context/cartContext";
import { date } from "drizzle-orm/mysql-core";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


const { addBooking } = useBooking();
const { cart } = useCart();

function calculateEndTimeToString(time: number) {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;

    const period = hours >= 12 ? "PM" : "AM";

    let displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;

    const minuteStr = minutes === 0 ? "00" : minutes.toString();

    return `${displayHour}:${minuteStr} ${period}`;
}

const totalMinutes = cart.reduce(
    (sum, item) => sum + item.duration, 0
);

const totalHours = totalMinutes / 60;

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
            uniqueBookingID,
            customerName,
            customerPhone,
            customerEmail,
            listServices,
            selectedTime,
            // endAt,
            bookingStatus,
            appointmentNotes,
            customerNotes,
            // createdAt,
            formattedDate

        } = paymentIntent.metadata;

        let endAt: string = "";

        if (selectedTime?.includes("9:00")) {
            // startAt = "9:00 AM";
            endAt = calculateEndTimeToString(9 + totalHours);
            // setEndAt(9 + totalHours);
        }
        else if (selectedTime?.includes("10:00")) {
            // startAt = "10:00 AM";
            endAt = calculateEndTimeToString(10 + totalHours);
            // setStartAt(10);
            // setEndAt(10 + totalHours);
        }
        else if (selectedTime?.includes("11:00")) {
            // startAt = "11:00 AM";
            endAt = calculateEndTimeToString(11 + totalHours);
            // setStartAt(11);
            // setEndAt(11 + totalHours);
        }
        else if (selectedTime?.includes("12:00")) {
            // startAt = "12:00 PM";
            endAt = calculateEndTimeToString(12 + totalHours);
            // setStartAt(12);
            // setEndAt(12 + totalHours);
        }
        else if (selectedTime?.includes("1:00")) {
            // startAt = "1:00 PM";
            endAt = calculateEndTimeToString(1 + totalHours);
            // setStartAt(1);
            // setEndAt(1 + totalHours);
        }
        else if (selectedTime?.includes("2:00")) {
            // startAt = "2:00 PM";
            endAt = calculateEndTimeToString(2 + totalHours);
            // setStartAt(2);
            // setEndAt(2 + totalHours);
        }
        else if (selectedTime?.includes("3:00")) {
            // startAt = "3:00 PM";
            endAt = calculateEndTimeToString(3 + totalHours);
            // setStartAt(3);
            // setEndAt(3 + totalHours);
        }
        else if (selectedTime?.includes("4:00")) {
            // startAt = "4:00 PM";
            endAt = calculateEndTimeToString(4 + totalHours);
            // setStartAt(4);
            // setEndAt(4 + totalHours);
        }

        // Initiate booking creation time and unique booking ID 
        const createdAt = Date.now();

        addBooking(uniqueBookingID, customerName, customerPhone, customerEmail, listServices, selectedTime, endAt, bookingStatus, appointmentNotes, customerNotes, createdAt, formattedDate);



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