import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type BookingBody = {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    serviceIds: string[];
    serviceNames: string[];
    startAt: string;
    durationMinutes: number;
    notes?: string;
}

export async function POST(req: Request) {
    try {
        const body: BookingBody = await req.json();
        
        const start = new Date(body.startAt);
        const end = new Date(start.getTime() + body.durationMinutes * 60 * 1000);

        const startIso = start.toISOString();
        const endIso = end.toISOString();

        const { data: conflicts, error: conflictError } = await supabaseAdmin
        .from("appointments")
        .select("idm,start_at,end_at")
        .neq("status", "cancelled")
        .lt("start_at", endIso)
        .gt("end_at", startIso);  

        if (conflictError) {
            return NextResponse.json(
                { success: false, message: conflictError.message },
                { status: 500 }
            );
        }

        if (conflicts && conflicts.length > 0) {
            return NextResponse.json(
                { success: false, message: "That time is already booked."},
                { status: 409 }
            );
        }
        
        const { data, error } = await supabaseAdmin
        .from("appointments")
        .insert({
            customer_name: body.customerName,
            customer_phone: body.customerPhone,
            customer_email: body.customerEmail ?? null,
            service_ids: body.serviceNames,
            start_at: startIso,
            end_at: endIso,
            notes: body.notes ?? null,
        })
        .select()
        .single();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, appointment: data });
    } catch {
        return NextResponse.json(
            { success: false, message: "invalid request." },
            { status: 400 }
        );
    }
}