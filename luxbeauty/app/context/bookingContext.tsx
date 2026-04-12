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
    booking: BookingData;
    addToBooking: (booking: BookingData) => void;
    removeFromBooking: (index: string) => void;
    clearBooking: () => void;
    checkBooking: () => void;
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
        name: string,
        phone: string,
        email: string,
        services: string,
        startTime: number,
        endTime: number,
        appointmentNotes: string) => {
        // const newBooking : BookingData = {
        //     id: crypto.randomUUID.toString(),
        //     customer_name: name,
        //     customer_phone: phone,
        //     service_names: services,
        //     start_at: startTime,
        //     end_at: endTime,
        //     status: "Confirmed",
        //     appointment_notes: appointmentNotes,
        //     customer_notes: "",
        //     created_at:
        

        // }

            // console.log(newBooking);

        // sessionStorage.setItem(
    }


    // add customer_phone
    // add customer_email
    // add service_names: 
    // add start_at: 
    // add end_at:
    // add status:
    // add appointment_notes: 
    // add customer_notes:
    // add created_at: 



    // const addToBooking = (data: BookingData) => {


    //     setBooking((prev) => {
    //         const updatedBooking = [...prev, data];
    //         sessionStorage.setItem("booking", JSON.stringify(updatedBooking));
    //         console.log(updatedBooking);
    //         return updatedBooking;
    //     });
    // }


    // const removeFromBooking = (id: string) => {
    //     setBooking((prev) => {
    //         const updatedBooking = prev.filter((item) => item.id !== id);
    //         sessionStorage.setItem("booking", JSON.stringify(updatedBooking));
    //         return updatedBooking;
    //     })
    // }

    const checkBooking = () => {
        console.log(booking);
    }

    const clearBooking = () => {
        // setBooking([]);
        sessionStorage.setItem("booking", JSON.stringify([]));
    }



    return (
        <BookingContext.Provider value={{ clearBooking, checkBooking }}>
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
