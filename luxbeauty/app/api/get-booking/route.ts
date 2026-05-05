"use server";
import { db } from "@/app/db";
import { eq } from 'drizzle-orm';
import { appointmentsTable } from "@/app/db/schema";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "Missing booking id" },
            { status: 400 }
        );
    }

    // console.log("id is: " + id);
    const result = await db
        .select({
            status: appointmentsTable.status,
        })
        .from(appointmentsTable)
        .where(eq(appointmentsTable.id, id))
        .limit(1);

    if (result.length === 0) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({
        status: result[0].status,
    });
}