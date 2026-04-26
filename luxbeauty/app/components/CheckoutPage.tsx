"use client";

import React, { useState, useEffect, useInsertionEffect } from "react";
import { useStripe, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { AwsDataApiTransaction } from "drizzle-orm/aws-data-api/pg";
import Link from 'next/link';
import { useBooking } from "../context/bookingContext";
import { useCart } from "../context/cartContext";
import { stat } from "fs";
import { unique } from "drizzle-orm/gel-core";


const CheckoutPage = ({ amount, uniqueBookingID, customerEmail, formattedDate, selectedTime,
    customerName, customerPhone, customerNotes,
    listServices,
    bookingStatus,
    appointmentNotes }
    : {
        amount: number;
        uniqueBookingID: string;
        customerEmail: string;
        formattedDate: string;
        selectedTime: string;
        customerName: string;
        customerPhone: string;
        customerNotes: string;
        listServices: string;
        // endAt: string;
        bookingStatus: string;
        appointmentNotes: string;
        // createdAt: number;
    }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const { addBooking } = useBooking();
    const { cart } = useCart();

    const totalMinutes = cart.reduce(
        (sum, item) => sum + item.duration, 0
    );

    const totalHours = totalMinutes / 60;

    
    useEffect(() => {
         fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
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
                formattedDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));





    }, [amount, customerEmail]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const test: number = 123;


        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const returnUrl = new URL("http://localhost:3000/payment-success");
        returnUrl.searchParams.set("id", uniqueBookingID);

        console.log("do we enter?");

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: returnUrl.toString()
            },
        });

        if (error) {
            // This point is only reached if there is an immediate error when 
            // confirming the payment . Show the error to your customer 
            setErrorMessage(error.message);
        }
        else if (!error) {

            // const uniqueBookingID = crypto.randomUUID();
            const listServices = JSON.stringify(cart);
            const status = "confirmed";
            const createdAt = Date.now();
            const appointmentNotes = "N/a";

            let startAt = "";
            let endAt = "";

            if (!selectedTime) {
                return;

            }


            // TODO: 

            // The payment UI automatically closes with a success animation.
            // Your customer is redirected to your `return_url`
        }

        setLoading(false);

    };


    return (
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            <button style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }} className="nextBtn" disabled={!stripe || loading}> {!loading ? `Submit Booking` : "Processing..."}
            </button>
        </form>
    );

};

export default CheckoutPage;