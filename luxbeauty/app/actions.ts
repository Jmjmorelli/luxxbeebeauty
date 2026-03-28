'use server';

import { appointmentsTable } from "./db/schema"
import { db } from "./db"

export async function createAppointment(prevState: any, formData: FormData) {

    const name = formData.get('customer_name') as string;
    const phone = formData.get('customer_phone') as string;

    if (!name || !phone) {
        return { success: false, message: "Name and phone are required" };
    }

    else {

        await db.insert(appointmentsTable).values({
            id: crypto.randomUUID(),
            customer_name: name,
            customer_phone: phone,
            customer_email: formData.get('customer_email') as string,
            service_names: "test service",
            start_at: Date.now(),
            end_at: Date.now() + 3600000,
        });

        return { success: true, message: "Appointment booked!" };
    }
}