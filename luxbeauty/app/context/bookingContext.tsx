"use client"
import { check, CheckBuilder } from "drizzle-orm/gel-core";
import { date, datetime } from "drizzle-orm/mysql-core";
// pretty much rinsed and repeated the cart logic but kept seperate booking data
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { json } from "stream/consumers";

import { db } from "../db/index";
import { appointmentsTable, InsertAppointment, SelectAppointment } from "../db/schema";




export type BookingData = {
    id: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    service_names: string;
    start_at: number;
    end_at: number;
    status: string;
    appointment_notes: string;
    customer_notes: string;
    created_at: number;
}

type BookingContextType = {
    booking: BookingData | undefined;
    clearBooking: () => void;
    checkBooking: () => void;
    addBooking: (id: string,
        name: string,
        phone: string,
        email: string,
        services: string,
        startTime: number,
        endTime: number,
        status: string,
        appointmentNotes: string,
        customerNotes: string,
        createdAt: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {


    const [booking, setBooking] = useState<BookingData>();

    useEffect(() => {
        const savedBooking = sessionStorage.getItem("booking");
        if (savedBooking) {
            setBooking(JSON.parse(savedBooking));
        }
    }, []);

    // add appointment to db using the API route
    const addBooking = async (
        id: string,
        name: string,
        phone: string,
        email: string,
        services: string,
        startTime: number,
        endTime: number,
        status: string,
        appointmentNotes: string,
        customerNotes: string,
        createdAt: number) => {
        const newBooking: BookingData = {
            id: id,
            customer_name: name,
            customer_phone: phone,
            customer_email: email,
            service_names: services,
            start_at: startTime,
            end_at: endTime,
            status: status,
            appointment_notes: appointmentNotes,
            customer_notes: customerNotes,
            created_at: createdAt
        };

        try {

            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            });

            if (!res.ok) {
                throw new Error('Failed to create appointment');
            }


            const data = await res.json();
            console.log("Success:", data);

        } catch (err) {
            console.log("Error:", err)
        }



    }





    const checkBooking = () => {
        console.log(booking);
    }

    const clearBooking = () => {
        // setBooking([]);
        sessionStorage.setItem("booking", JSON.stringify([]));
    }



    return (
        <BookingContext.Provider value={{ booking, addBooking, clearBooking, checkBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used inside a BookingProivder");
    }

    return context;
}
