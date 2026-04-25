import { transporter } from "@/app/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, subject, text, html } = await req.json();

    const info = await transporter.sendMail({
      from: `"LuxxBeeBeauty" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true, info });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}