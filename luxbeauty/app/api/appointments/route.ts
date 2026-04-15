// app/api/appointments/route.ts
import { db } from "@/app/db";
import { appointmentsTable } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        await db.insert(appointmentsTable).values(data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to create appointment" },
            { status: 500 }
        );
    }
}