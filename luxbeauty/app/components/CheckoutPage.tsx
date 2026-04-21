"use client";

import React, { useState, useEffect, useInsertionEffect } from "react";
import { useStripe, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { AwsDataApiTransaction } from "drizzle-orm/aws-data-api/pg";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));






    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment ({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
            },
        });

        if (error) {
            // This point is only reached if there is an immediate error when 
            // confirming the payment . Show the error to your customer 
            setErrorMessage(error.message);
        } 
        else {
            // The payment UI automatically closes with a success animation.
            // Your customer is redirected to your `return_url`
        }

        setLoading(false);

    };


    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            <button disabled={!stripe || loading}> {!loading ? `Pay ${amount}` : "Processing..."}
            </button>
        </form>
    );

};

export default CheckoutPage;