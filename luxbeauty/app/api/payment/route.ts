import { NextRequest, NextResponse } from "next/server";
import { BOOKING_FEE_CENTS } from "@/app/lib/booking";
import { z } from "zod";
import { parse } from "path";
import { request } from "https";

const PaymentSchema = z.object({
      uniqueBookingID: z.string().uuid(),
      customerName: z.string().trim().min(1).max(100),
      customerPhone: z.string().trim().min(1).max(30),
      customerEmail: z.string().trim().email().max(200),
      listServices: z.string().max(450),   // stays under Stripe's 500 cap
      selectedTime: z.string().max(20),
      endAt: z.string().max(20),
      bookingStatus: z.enum(["confirmed"]),
      appointmentNotes: z.string().max(450),
      customerNotes: z.string().trim().max(450),
      formattedDate: z.string().max(20),
  });

const parsed = PaymentSchema.safeParse(await request.json());
if(!parsed.success) { 
    return NextResponse.json({ error: "Invalid input" }, {status: 400});
}
const data = parsed.data;

export async function POST(request: NextRequest) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

    try {
        const {
            // amount, never trust the client
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
            amount: BOOKING_FEE_CENTS,
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