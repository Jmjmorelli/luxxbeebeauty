import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { useBooking } from "@/app/context/bookingContext";
import { date } from "drizzle-orm/mysql-core";




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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  type BookingData = {
    id: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    service_names: string;
    start_at: string;
    end_at: string;
    status: string;
    appointment_notes: string;
    customer_notes: string;
    created_at: number;
    booking_date: string;
  }


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
      endAt,
      bookingStatus,
      appointmentNotes,
      customerNotes,
      // createdAt,
      formattedDate

    } = paymentIntent.metadata;


    const createdAt = Date.now();
    const newBooking: BookingData = {
      id: uniqueBookingID,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      service_names: listServices,
      start_at: selectedTime,
      end_at: endAt,
      status: bookingStatus,
      appointment_notes: appointmentNotes,
      customer_notes: customerNotes,
      created_at: createdAt,
      booking_date: formattedDate
    };

    console.log("service ends at this time inside the webhook" + endAt);
    console.log("notes are: " + customerNotes);
    try {
      const res = await fetch('https://luxxbeebeauty.com/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (!res.ok) {
        throw new Error('Failed to create appointment');
      }

      const data = await res.json();
      console.log("Success:", data);

    } catch (err) {
      console.log("Error:", err)
    }


    // Initiate booking creation time and unique booking ID 
    // note to self
    // instead of calling it the bookingcontext logic, i just moved it over here instead bcause accessing the bookingcontext (client) from here is not allowed (server)
    // addBooking(uniqueBookingID, customerName, customerPhone, customerEmail, listServices, selectedTime, endAt, bookingStatus, appointmentNotes, customerNotes, createdAt, formattedDate);


    const services = JSON.parse(listServices);

    const servicesHTML = services
      .map((service: any) => {
        return `
      <div>
        <strong>${service.name}</strong> (${service.duration} mins)
      </div>
    `;
      })
      .join("");


    await transporter.sendMail({
      from: `"LuxxBeeBeauty" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: "[TEST] Appointment Confirmed",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Your booking has been confirmed.</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
        <p><strong>Booking ID:</strong> ${uniqueBookingID}</p>
      `,
    });

    await transporter.sendMail({
      from: `"LuxxBeeBeauty" <${process.env.SMTP_USER}>`,
      // to: "luxxbeebeauty@gmail.com",
      to: "business@luxxbeebeauty.com",
      subject: "[TEST] You have received a client booking",
      html: `
            <h2>Hi Eyrkah, a client has booked with you please review their details and the following service(s):</h2>
           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
            <h2 style="text-align: center; color: #111;">Appointment Confirmed</h2>
    <p>Thank you for booking with LuxxBeeBeauty! Here are your appointment details:</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #f7f7f7;">
        Booking ID
      </td>
      <td style="border: 1px solid #ddd; padding: 12px;">
        ${uniqueBookingID}
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #f7f7f7;">
        Date
      </td>
      <td style="border: 1px solid #ddd; padding: 12px;">
        ${formattedDate}
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #f7f7f7;">
        Time
      </td>
      <td style="border: 1px solid #ddd; padding: 12px;">
        ${selectedTime}
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #f7f7f7;">
        Service(s) 
      </td>
      <td style="border: 1px solid #ddd; padding: 12px;">
        ${servicesHTML}
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #f7f7f7;">
        Status
      </td>
      <td style="border: 1px solid #ddd; padding: 12px;">
        Confirmed
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #f7f7f7;">
        Customer Notes/Requests
      </td>
      <td style="border: 1px solid #ddd; padding: 12px;">
        ${customerNotes}
      </td>
    </tr>
  </table>

  <p style="margin-top: 20px;">
    If you have any questions, please reply to this email.
  </p>

  <p style="font-size: 12px; color: #777; text-align: center; margin-top: 30px;">
    LuxxBeeBeauty
  </p>
</div>`
    });

  }

  return NextResponse.json({ received: true });
}