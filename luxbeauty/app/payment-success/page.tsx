"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h3>Your booking has been successfully submitted! </h3>

                <div style={{ margin: "1rem" }}>You should have received a confirmation email, along with your unique ID, this used to track your booking electronically.</div>
                <div style={{ margin: "1rem" }}>Any problems? <a
                    href="mailto:business@luxxbeebeauty.com?
                    bcc=luxxbeebeauty@gmail.com?
                    
                    
                    ">Send us an email!</a></div>
            </div>
        </main>
    );
}
