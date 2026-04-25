import { PDFDocument, rgb } from "pdf-lib";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { signature, name } = body;

        const pdfPath = path.join(
            process.cwd(),
            "public",
            "documents",
            "Eyelash-Extension-Consent-Form.pdf"
        );

        const existingPdfBytes = await fs.readFile(pdfPath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const signatureImageBytes = signature.split(",")[1];
        const signatureImage = await pdfDoc.embedPng(
            Buffer.from(signatureImageBytes, "base64")
        );

        firstPage.drawText(name, {
            x: 80,
            y: 150,
            size: 12,
            color: rgb(0, 0, 0),
        });

        firstPage.drawImage(signatureImage, {
            x: 80,
            y: 90,
            width: 200,
            height: 80,
        });

        firstPage.drawText(new Date().toLocaleDateString(), {
            x: 350,
            y: 110,
            size: 12,
            color: rgb(0, 0, 0),
        });

        const signedPdfBytes = await pdfDoc.save();

        const signedFileName = `signed-${Date.now()}.pdf`;

        const signedPath = path.join(
            process.cwd(),
            "public",
            "signed",
            signedFileName
        );

        await fs.mkdir(path.dirname(signedPath), { recursive: true });
        await fs.writeFile(signedPath, signedPdfBytes);

        return NextResponse.json({
            success: true,
            pdfUrl: `/signed/${signedFileName}`,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Failed to sign PDF" },
            { status: 500 }
        );
    }
}