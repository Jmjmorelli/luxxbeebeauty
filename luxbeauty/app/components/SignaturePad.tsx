"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

type SignaturePadProps = {
    name: string;
    onSigned?: (pdfUrl: string) => void;
};

export default function SignaturePad({ name, onSigned }: SignaturePadProps) {
    const sigRef = useRef<SignatureCanvas | null>(null);

    async function handleSubmit() {
        if (!sigRef.current || sigRef.current.isEmpty()) {
            alert("Please sign first");
            return;
        }

        const signature = sigRef.current
            .getTrimmedCanvas()
            .toDataURL("image/png");

        const res = await fetch("/api/sign-pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ signature, name }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data);
            alert("Failed to sign PDF");
            return;
        }

        onSigned?.(data.pdfUrl);
    }

    return (
        <div>
            <h2>Electronic Signature</h2>

            <SignatureCanvas
                ref={sigRef}
                canvasProps={{
                    width: 500,
                    height: 200,
                    style: {
                        border: "1px solid #ccc",
                        background: "white",
                        borderRadius: "8px",
                    },
                }}
            />

            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button type="button" onClick={() => sigRef.current?.clear()}>
                    Clear
                </button>

                <button type="button" onClick={handleSubmit}>
                    Sign PDF
                </button>
            </div>
        </div>
    );
}