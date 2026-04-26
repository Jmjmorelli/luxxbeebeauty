"use client";

import React, { useState, useEffect, useInsertionEffect } from "react";
import { useStripe, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { AwsDataApiTransaction } from "drizzle-orm/aws-data-api/pg";
import Link from 'next/link';
import { useBooking } from "../context/bookingContext";
import { useCart } from "../context/cartContext";
import { stat } from "fs";
import { unique } from "drizzle-orm/gel-core";

type CheckoutPageProps = {
    amount: number;
    customerEmail: string;
    formattedDate: string;
    selectedTime: string;
};


function calculateEndTimeToString(time: number) {
    const hours = Math.floor(time);
    const minutes = (time % 1) * 60;

    const period = hours >= 12 ? "PM" : "AM";

    let displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;

    const minuteStr = minutes === 0 ? "00" : minutes.toString();

    return `${displayHour}:${minuteStr} ${period}`;
}

const CheckoutPage = ({ amount, customerEmail, formattedDate, selectedTime, customerName, customerPhone, customerNotes }
    : { amount: number; customerEmail: string; formattedDate: string; selectedTime: string; customerName: string; customerPhone: string; customerNotes: string }) => {
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
    const uniqueBookingID: string = crypto.randomUUID();
    
    useEffect(() => {
        console.log("sending the email" + customerEmail);
        
        fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                customerEmail,
                formattedDate,
                selectedTime,
                uniqueBookingID,
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
            if (selectedTime?.includes("9:00")) {
                startAt = "9:00 AM";
                endAt = calculateEndTimeToString(9 + totalHours);
                // setEndAt(9 + totalHours);
            }
            else if (selectedTime?.includes("10:00")) {
                startAt = "10:00 AM";
                endAt = calculateEndTimeToString(10 + totalHours);
                // setStartAt(10);
                // setEndAt(10 + totalHours);
            }
            else if (selectedTime?.includes("11:00")) {
                startAt = "11:00 AM";
                endAt = calculateEndTimeToString(11 + totalHours);
                // setStartAt(11);
                // setEndAt(11 + totalHours);
            }
            else if (selectedTime?.includes("12:00")) {
                startAt = "12:00 PM";
                endAt = calculateEndTimeToString(12 + totalHours);
                // setStartAt(12);
                // setEndAt(12 + totalHours);
            }
            else if (selectedTime?.includes("1:00")) {
                startAt = "1:00 PM";
                endAt = calculateEndTimeToString(1 + totalHours);
                // setStartAt(1);
                // setEndAt(1 + totalHours);
            }
            else if (selectedTime?.includes("2:00")) {
                startAt = "2:00 PM";
                endAt = calculateEndTimeToString(2 + totalHours);
                // setStartAt(2);
                // setEndAt(2 + totalHours);
            }
            else if (selectedTime?.includes("3:00")) {
                startAt = "3:00 PM";
                endAt = calculateEndTimeToString(3 + totalHours);
                // setStartAt(3);
                // setEndAt(3 + totalHours);
            }
            else if (selectedTime?.includes("4:00")) {
                startAt = "4:00 PM";
                endAt = calculateEndTimeToString(4 + totalHours);
                // setStartAt(4);
                // setEndAt(4 + totalHours);
            }


            await fetch("/api/send-email", {
                method: "POST",
                body: JSON.stringify({
                    to: customerEmail,
                    subject: "Appointment Confirmed",
                    html: `
                     <h2>Appointment Confirmed</h2>
                     <p>Date: ${formattedDate}</p>
                     <p>Time: ${selectedTime}</p>
                     `,
                }),
            });
            // What is missing

            addBooking(uniqueBookingID, customerName, customerPhone, customerEmail, listServices, startAt, endAt, status, appointmentNotes, customerNotes, createdAt, formattedDate);


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