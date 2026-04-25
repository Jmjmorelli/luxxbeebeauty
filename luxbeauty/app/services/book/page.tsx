"use client"
import Link from "next/link";
import { useCart } from "@/app/context/cartContext";
import styles from "./page.module.css"
import { experimental_taintObjectReference, use, useEffect, useState } from "react";
import { index, unique } from "drizzle-orm/gel-core";
import { BookingData, BookingProvider, useBooking } from "@/app/context/bookingContext";
import { ConsoleLogWriter } from "drizzle-orm";
import { json } from "stream/consumers";
import { endpointClientChangedSubscribe } from "next/dist/build/swc/generated-native";
import { convertIndexToString, date } from "drizzle-orm/mysql-core";
import { createAppointment } from "@/app/actions";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from "@/app/components/CheckoutPage";
import { DocusealForm } from '@docuseal/react';
import { DocusealBuilder } from '@docuseal/react'
import { useRef } from 'react';
import SignaturePad from "@/app/components/SignaturePad";




const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const amount = 2000.00; // 2000 cents = 20 dollars lol

async function fetchBookedDates() {

    const res = await fetch("/api/appointments");
    const data = await res.json();

    // console.log(data.data);
    // console.log("db pulled");

    return data.data;
}


export default function Book() {



    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY == undefined) {
        throw new Error("Public key invalid");
    }
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    const [clientSecret, setClientSecret] = useState("");
    const [token, setToken] = useState();


    useEffect(() => {
        fetch("/api/payment", { method: "POST" })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));



        // fetch('/api/docuseal', {
        //     method: 'POST',
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setToken(data.token);
        //     });

    }, []);


    const containerRef = useRef(null);

    useEffect(() => {
        let NutrientViewer: any;

        async function loadPdf() {
            const container = containerRef.current;
            if (!container) return;

            try {
                NutrientViewer = (await import("@nutrient-sdk/viewer")).default;

                NutrientViewer.unload(container);

                await NutrientViewer.load({
                    container,
                    useCDN: true,
                    document: "/documents/Eyelash-Extension-Consent-Form.pdf",
                });

                console.log("PDF loaded");
            } catch (err) {
                console.error("PDF failed to load:", err);
            }
        }

        loadPdf();

        return () => {
            if (NutrientViewer && containerRef.current) {
                NutrientViewer.unload(containerRef.current);
            }
        };
    }, []);




    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // <<<<<<<<<<<<<<<<<<<<<
    const [selectedTime, setSelectedTime] = useState<String | null>(null);
    const [bookedTimes, setBookedTimes] = useState<any[]>([]);


    useEffect(() => {
        async function load() {
            const data = await fetchBookedDates();
            setBookedTimes(data);
        }

        load();
    }, []);



    // useEffect(() => {



    // }, [selectedDate]);

    //cart logic
    const { cart } = useCart();
    const { addToCart } = useCart();
    const { removeFromCart } = useCart();
    const { clearCart } = useCart();
    const { checkCart } = useCart();

    // DETERMINE HOW LONG THE CLIENT SESSION WILL BE FOR BOOKING

    const totalMinutes = cart.reduce(
        (sum, item) => sum + item.duration, 0
    );

    const totalHours = totalMinutes / 60;

    // bookingData vars

    // const [uniqueBookingID, setUniqueBookingID] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerNotes, setCustomerNotes] = useState("");

    const [submitted, setSubmitted] = useState(false);


    // booking logic
    const { booking } = useBooking();
    const { clearBooking } = useBooking();
    const { checkBooking } = useBooking();
    const { addBooking } = useBooking();


    function calculateEndTimeToString(time: number) {
        const hours = Math.floor(time);
        const minutes = (time % 1) * 60;

        const period = hours >= 12 ? "PM" : "AM";

        let displayHour = hours % 12;
        if (displayHour === 0) displayHour = 12;

        const minuteStr = minutes === 0 ? "00" : minutes.toString();

        return `${displayHour}:${minuteStr} ${period}`;
    }
    // GETS ALL INFORMATION READY BEFORE SENDING TO DB
    const initializeBookingData = () => {

        // setUniqueBookingID(crypto.randomUUID());
        // setListServices(JSON.stringify(cart));
        // setStatus("Confirmed");
        // setCreatedAt(Date.now());
        // setAppointmentNotes("N/a");

        const uniqueBookingID = crypto.randomUUID();
        const listServices = JSON.stringify(cart);
        const status = "confirmed";
        const createdAt = Date.now();
        const appointmentNotes = "N/a";

        let startAt = "";
        let endAt = "";

        if (!selectedTime) {
            return;

        }
        if (selectedTime?.includes("9:00")) {
            startAt = "9:00 AM";
            endAt = calculateEndTimeToString(9 + totalHours);
            // setEndAt(9 + totalHours);
        }
        else if (selectedTime?.includes("10:00")) {
            startAt = "10:00 AM";
            endAt = calculateEndTimeToString(10 + totalHours);
            // setStartAt(10);
            // setEndAt(10 + totalHours);
        }
        else if (selectedTime?.includes("11:00")) {
            startAt = "11:00 AM";
            endAt = calculateEndTimeToString(11 + totalHours);
            // setStartAt(11);
            // setEndAt(11 + totalHours);
        }
        else if (selectedTime?.includes("12:00")) {
            startAt = "12:00 PM";
            endAt = calculateEndTimeToString(12 + totalHours);
            // setStartAt(12);
            // setEndAt(12 + totalHours);
        }
        else if (selectedTime?.includes("1:00")) {
            startAt = "1:00 PM";
            endAt = calculateEndTimeToString(1 + totalHours);
            // setStartAt(1);
            // setEndAt(1 + totalHours);
        }
        else if (selectedTime?.includes("2:00")) {
            startAt = "2:00 PM";
            endAt = calculateEndTimeToString(2 + totalHours);
            // setStartAt(2);
            // setEndAt(2 + totalHours);
        }
        else if (selectedTime?.includes("3:00")) {
            startAt = "3:00 PM";
            endAt = calculateEndTimeToString(3 + totalHours);
            // setStartAt(3);
            // setEndAt(3 + totalHours);
        }
        else if (selectedTime?.includes("4:00")) {
            startAt = "4:00 PM";
            endAt = calculateEndTimeToString(4 + totalHours);
            // setStartAt(4);
            // setEndAt(4 + totalHours);
        }






        // SEND TO BACKEND FOR DB PROCESSING
        const selectedDateString = selectedDate?.toDateString() ?? "not selected";
        addBooking(uniqueBookingID, customerName, customerPhone, customerEmail, listServices, startAt, endAt, status, appointmentNotes, customerNotes, createdAt, selectedDateString);

    }

    function getCalendarDays(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfTheMonth = new Date(year, month, 1);
        const lastDayOfTheMonth = new Date(year, month + 1, 0);

        const startDay = firstDayOfTheMonth.getDay();
        const daysInMonth = lastDayOfTheMonth.getDate();

        const days: (Date | null)[] = []; // <<<<<<<<<<<<<<<<<<<<<

        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        // fill remaining cells to make full weeks
        while (days.length % 7 !== 0) {
            days.push(null);
        }

        return days;

    }

    const calendarDays = getCalendarDays(currentMonth);


    function handlePreviousMonth() {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    }

    function handleNextMonth() {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    }

    async function isTodayBooked() {
        const bookedTimes = await fetchBookedDates();

        for (let index = 0; index < bookedTimes.length; index++) {
            console.log(bookedTimes[index]);
        }
        console.log(selectedDate);
    }

    function isSameDay(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    function convertToDashFormat(dateStr: string) {
        const parts = dateStr.split(" ");

        const monthMap: Record<string, string> = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04",
            May: "05", Jun: "06", Jul: "07", Aug: "08",
            Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };

        const month = monthMap[parts[1]];
        const day = parts[2].padStart(2, "0");
        const year = parts[3];

        return `${year}-${month}-${day}`;
    }

    function isTimeUnavailable(
        time: string,
        selectedDate: Date,
        bookedTimes: any[]
    ) {

        const formattedDate = selectedDate
            ? selectedDate.toISOString().split("T")[0]
            : null;


        if (!formattedDate) return false;


        return bookedTimes.some((booking) => {
            // console.log("seeing FORMAT!!" + booking.date);
            const bookingDate = convertToDashFormat(booking.date);

            // console.log(formattedDate);
            // console.log(bookingDate);
            // console.log(booking.startTime);
            return (

                bookingDate === formattedDate &&
                booking.startTime === time
            );
        });
    }

    function isTodayAvailable(day: Date | null) {
        if (!day) return false;
        if (day.getDay() == 0) {
            return false;
        }
        else if (day.getDay() == 1) {
            return false;
        }

        return true;
    }
    return (

        <div className="body-wrap boxed-container">
            <div className={styles.bookingWrapper}>
                <div className={styles.returnBtn}
                    style={{ position: "fixed", display: "flex", margin: "1rem", color: "white", borderRadius: "10px", backgroundColor: "black", zIndex: "1000", bottom: "0", justifyContent: "center", alignItems: "center" }}
                >
                    <Link href="/services/" style={{ color: "white" }}>
                        Return to Services
                    </Link>
                </div>
                <div>
                    <div className={styles.container}>
                        <div className="datePicker" style={{ paddingTop: "2rem", marginLeft: "1rem", color: "black" }}>
                            When would you like to book your appointment?
                        </div>

                        <div className="calendar">
                            <div className="calendar__month">
                                <div className="cal-month__previous" onClick={handlePreviousMonth}>Prev</div>
                                <div className="cal-month__current">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
                                <div className="cal-month__next" onClick={handleNextMonth}>Next</div>
                            </div>
                            <div className="calendar__head">
                                {dayNames.map((day) => (
                                    <div key={day} className="cal-head__day">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="calendar__body">
                                {calendarDays.map((day, index) => {

                                    const available = isTodayAvailable(day)
                                    const isSelected =
                                        !!day &&
                                        !!selectedDate &&
                                        day.toDateString() === selectedDate.toDateString();

                                    if (available) {

                                        return (
                                            <div className={isSelected ? 'cal-body__daySelected' : 'cal-body__day'} key={index} onClick={() => {
                                                setSelectedDate(day);
                                            }
                                            }>
                                                {day ? day.getDate() : ""}
                                            </div>
                                        );
                                    }
                                    else {
                                        return (

                                            <div className="cal-body__dayDisabled" key={index}>
                                                {day ? day.getDate() : ""}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>


                        {
                            selectedDate &&
                            <div style={{ marginLeft: "1rem", color: "green", fontWeight: "bold" }}>
                                {selectedDate.toLocaleDateString()}
                            </div>
                        }
                        {
                            selectedDate &&
                            <div style={{ marginLeft: "1rem", color: "black" }}>
                                What time?
                            </div>
                        }


                        <div className={styles.timeGrid} style={{ paddingTop: "1rem" }}>
                            {[
                                "9:00 AM", "10:00 AM",
                                "11:00 AM", "12:00 PM",
                                "1:00 PM", "2:00 PM",
                                "3:00 PM", "4:00 PM"
                            ].map((time) => {
                                if (!selectedDate) return false;

                                const unavailable = isTimeUnavailable(time, selectedDate, bookedTimes);

                                return (
                                    <button
                                        key={time}
                                        className={`${styles.timeBtn} ${selectedTime === time ? styles.active : ""}`}
                                        disabled={unavailable}
                                        onClick={() => {
                                            if (!unavailable) {
                                                setSelectedTime(time);
                                            }
                                            else setSelectedTime(null);
                                        }}
                                    >
                                        {unavailable ? `Unavailable` : time}
                                    </button>
                                );
                            })}
                        </div>



                        {
                            selectedDate && selectedTime &&
                            <section>
                                <form className={styles.feedForm} action="#">
                                    <input style={{ textAlign: "center", border: "1px solid #ccc", borderRadius: "10px" }} placeholder="Name" type="text"
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        } />
                                    <input style={{ textAlign: "center", border: "1px solid #ccc", borderRadius: "10px" }} name="phone" placeholder="Phone number"
                                        onChange={(e) =>
                                            setCustomerPhone(e.target.value)
                                        } />
                                    <input style={{ textAlign: "center", border: "1px solid #ccc", borderRadius: "10px" }} name="email" placeholder="E-mail" type="email"
                                        onChange={(e) =>
                                            setCustomerEmail(e.target.value)
                                        } />
                                    <input style={{ textAlign: "center", border: "1px solid #ccc", borderRadius: "10px" }} name="customerNotes" placeholder="Comments/Requests" type="text"
                                        onChange={(e) =>
                                            setCustomerNotes(e.target.value)
                                        } />
                                </form>
                            </section>
                        }

                        {
                            selectedDate && selectedTime &&
                            <div style={{ paddingTop: "2rem", marginLeft: "1rem" }}>
                                *As per policy, a $20 fee is required to secure your booking
                            </div>
                        }


                        {
                            selectedDate && selectedTime &&
                            <div style={{ margin: "1rem" }}>
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        mode: "payment",
                                        amount: 2000,
                                        currency: "usd",
                                    }}
                                >
                                    <CheckoutPage amount={amount} />
                                </Elements>
                            </div>
                        }

                        <div style={{ paddingTop: "2rem", marginLeft: "1rem", marginRight: "1rem" }}>
                            Please note some services may not be available at certain times, due to the length of the service.
                        </div>

                        <div style={{ paddingTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>
                            If you have any questions about booking, please reach out to me via DM! Thank you!
                        </div>

                        <div style={{ paddingTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>
                            Electronic consent forms coming soon.
                        </div>
                        {/* 
                        <div style={{ margin: "auto", display: "flex", justifyContent: "center", marginTop: "3rem", marginBottom: "5rem" }}>
                            <button className={styles.nextBtn}
                                onClick={() => initializeBookingData()}>Proceed</button>
                        </div> */}


                        <div style={{ marginBottom: "8rem" }}>

                        </div>

                        {/* <SignaturePad
                            name="Joseph Morelli"
                            onSigned={(pdfUrl) => {
                                window.open(pdfUrl, "_blank");
                            }}
                        /> */}


                    </div>
                </div>
            </div>
        </div >

    );
}