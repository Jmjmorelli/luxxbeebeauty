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
// import { createAppointment } from "@/app/actions";
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

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // <<<<<<<<<<<<<<<<<<<<<
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [bookedTimes, setBookedTimes] = useState<any[]>([]);
    const [endTime, setEndTime] = useState<string>("");
    let endAt: string = "";

    useEffect(() => {
        async function load() {
            const data = await fetchBookedDates();
            setBookedTimes(data);
            // console.log(data);
        }
        load();

    }, []);



    //cart logic
    const { cart } = useCart();
    const { addToCart } = useCart();
    const { removeFromCart } = useCart();
    const { clearCart } = useCart();
    const { checkCart } = useCart();



    function calculateEndTimeToString(time: number) {
        const hours = Math.floor(time);
        const minutes = (time % 1) * 60;

        const period = hours >= 12 ? "PM" : "AM";

        let displayHour = hours % 12;
        if (displayHour === 0) displayHour = 12;

        const minuteStr = minutes === 0 ? "00" : minutes.toString();


        return `${displayHour}:${minuteStr} ${period}`;
    }
    // DETERMINE HOW LONG THE CLIENT SESSION WILL BE FOR BOOKING

    const totalMinutes = cart.reduce(
        (sum, item) => sum + item.duration, 0
    );

    const totalHours = totalMinutes / 60;


    useEffect(() => {
        if (selectedTime?.includes("9:00")) {
            setEndTime(calculateEndTimeToString(9 + totalHours));
        }
        else if (selectedTime?.includes("10:00")) {
            setEndTime(calculateEndTimeToString(10 + totalHours));
        }
        else if (selectedTime?.includes("11:00")) {
            setEndTime(calculateEndTimeToString(11 + totalHours));
        }
        else if (selectedTime?.includes("12:00")) {
            setEndTime(calculateEndTimeToString(12 + totalHours));
        }
        else if (selectedTime?.includes("1:00")) {
            setEndTime(calculateEndTimeToString(1 + totalHours));
        }
        else if (selectedTime?.includes("2:00")) {
            setEndTime(calculateEndTimeToString(2 + totalHours));
        }
        else if (selectedTime?.includes("3:00")) {
            setEndTime(calculateEndTimeToString(3 + totalHours));
        }
        else if (selectedTime?.includes("4:00")) {
            setEndTime(calculateEndTimeToString(4 + totalHours));
        }


        // console.log(totalHours);
        // console.log(totalMinutes);
        // console.log(calculateEndTimeToString(totalHours + 9));
        // console.log(cart);
    }, [selectedTime]);

    useEffect(() => {
        setSelectedTime(null);

    }, [selectedDate]);

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

    function convertToDashFormat(dateStr: string) {
        const [month, day, year] = dateStr.split("/");

        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    function timeToNumber(time: string) {
        const [clock, period] = time.split(" ");
        let [hours, minutes] = clock.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        return hours + minutes / 60;
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

        // console.log(bookedTimes);
        return bookedTimes.some((booking) => {
            const bookingDate = convertToDashFormat(booking.date);

            // console.log("booking date in DB: " + bookingDate);
            // console.log("selecting for this date: " + formattedDate);
            // console.log(booking.startTime);
            // console.log(time);

            const selectedTimeNumber = timeToNumber(time);
            const startTimeNumber = timeToNumber(booking.startTime);
            const endTimeNumber = timeToNumber(booking.endTime);

            return (
                bookingDate === formattedDate &&
                selectedTimeNumber >= startTimeNumber &&
                selectedTimeNumber < endTimeNumber
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
                                        } required
                                    />
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
                            selectedDate && selectedTime && customerName && customerPhone && customerEmail &&
                            <div style={{ margin: "1rem" }}>
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        mode: "payment",
                                        amount: 2000,
                                        currency: "usd",
                                    }}
                                >
                                    <CheckoutPage amount={amount}
                                        uniqueBookingID={crypto.randomUUID()}
                                        customerEmail={customerEmail}
                                        formattedDate={selectedDate.toLocaleDateString()}
                                        selectedTime={selectedTime}
                                        customerName={customerName}
                                        customerPhone={customerPhone}
                                        customerNotes={customerNotes}
                                        listServices={JSON.stringify(cart)}
                                        bookingStatus={"confirmed"}
                                        appointmentNotes={"empty"}
                                        endAt={endTime}
                                    />
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