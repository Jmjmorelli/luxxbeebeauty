"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import checkmark from "@/app/images/greenCheck.png";
import { useState } from "react";
import { useEffect } from "react";
import { error } from "console";



export default function PaymentSuccess() {
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        async function getBookingStatus() {

            try {
                const res = await fetch(`/api/get-booking?id=${id}`);

                if (!res.ok) {
                    throw new Error("Request Failed");
                }
                const data = await res.json();

                if (data) {
                    console.log(JSON.stringify(data));
                    (true);
                    setBookingConfirmed(true);
                }
                else {
                    console.log("Data went wrong");
                    (false);
                    setBookingConfirmed(false);
                }
            } catch (err) {
                console.log("Error: ", err);
            }

        }

        getBookingStatus();

    }, []);

    return (

        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            {bookingConfirmed &&

                <div className="mb-10">

                    <h1 className="text-4xl font-extrabold mb-2"></h1>
                    <h3>Thank you! Your booking has been successfully submitted! </h3>

                    <div style={{ margin: "1rem" }}>You should have received a confirmation email, along with your unique ID, this used to track your booking electronically.</div>
                    <div style={{ margin: "1rem" }}>Any problems?  <a
                        href="mailto:business@luxxbeebeauty.com?bcc=luxxbeebeauty@gmail.com&subject=Booking%20Help"
                    >Send an email!</a> or DM</div>
                </div>
            }

            {!bookingConfirmed &&
                <div className="mb-10">
                    <h3>Error, if you believe this an error, please DM @luxxbeebeauty</h3>
                </div>
            }

        </main>
    );
}
