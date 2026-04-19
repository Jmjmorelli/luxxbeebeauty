// app/api/create-payment-intent/route.ts

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000, // $50.00
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}