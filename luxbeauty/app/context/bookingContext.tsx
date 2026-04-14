"use client"
import { check, CheckBuilder } from "drizzle-orm/gel-core";
import { date, datetime } from "drizzle-orm/mysql-core";
// pretty much rinsed and repeated the cart logic but kept seperate booking data
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { json } from "stream/consumers";


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
        appointmentNotes: string) => void;
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

    // add customer name
    const addBooking = (
        id: string,
        name: string,
        phone: string,
        email: string,
        services: string,
        startTime: number,
        endTime: number,
        appointmentNotes: string) => {
        const newBooking: BookingData = {
            id: id,
            customer_name: name,
            customer_phone: phone,
            customer_email: email,
            service_names: services,
            start_at: startTime,
            end_at: endTime,
            status: "Confirmed",
            appointment_notes: appointmentNotes,
            customer_notes: "",
            created_at: 1

        }

        console.log(newBooking);

        sessionStorage.setItem("booking", JSON.stringify(newBooking));
        return (newBooking);
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
