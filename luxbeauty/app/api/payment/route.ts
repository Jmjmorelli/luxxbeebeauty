import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


export async function POST(request: NextRequest) {

    try {
        const {
            amount,
            uniqueBookingID,
            customerName,
            customerPhone,
            customerEmail,
            listServices,
            selectedTime,
            endAt,
            bookingStatus,
            appointmentNotes,
            customerNotes,
            formattedDate, } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
            metadata: {
                uniqueBookingID,
                customerName,
                customerPhone,
                customerEmail,
                listServices,
                selectedTime,
                endAt,
                bookingStatus,
                appointmentNotes,
                customerNotes,
                formattedDate,
            },
        });

        console.log("service ends at this time inside the payment api" + endAt);


        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error("Internal error:", error);
        return NextResponse.json({
            error: `Internal Server Error: ${error}`
        },
            { status: 500 }
        );
    }

}