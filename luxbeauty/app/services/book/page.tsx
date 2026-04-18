"use client"
import Link from "next/link";
import { useCart } from "@/app/context/cartContext";
import styles from "./page.module.css"
import { experimental_taintObjectReference, use, useEffect, useState } from "react";
import { index, unique } from "drizzle-orm/gel-core";
import { BookingData, useBooking } from "@/app/context/bookingContext";
import { ConsoleLogWriter } from "drizzle-orm";
import { json } from "stream/consumers";
import { endpointClientChangedSubscribe } from "next/dist/build/swc/generated-native";
import { date } from "drizzle-orm/mysql-core";
import { createAppointment } from "@/app/actions";


const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function Book() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // <<<<<<<<<<<<<<<<<<<<<
    const [selectedTime, setSelectedTime] = useState<String | null>(null);

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

        let startAt = 0;
        let endAt = 0;

        if (selectedTime?.includes("9:00")) {
            startAt = 9;
            endAt = 9 + totalHours;
            // setEndAt(9 + totalHours);
        }
        else if (selectedTime?.includes("10:00")) {
            startAt = 10;
            endAt = 10 + totalHours;
            // setStartAt(10);
            // setEndAt(10 + totalHours);
        }
        else if (selectedTime?.includes("11:00")) {
            startAt = 11;
            endAt = 11 + totalHours;
            // setStartAt(11);
            // setEndAt(11 + totalHours);
        }
        else if (selectedTime?.includes("12:00")) {
            startAt = 12;
            endAt = 12 + totalHours;            
            // setStartAt(12);
            // setEndAt(12 + totalHours);
        }
        else if (selectedTime?.includes("1:00")) {
            startAt = 1;
            endAt = 1 + totalHours;
            // setStartAt(1);
            // setEndAt(1 + totalHours);
        }
        else if (selectedTime?.includes("2:00")) {
            startAt = 2;
            endAt = 2 + totalHours;
            // setStartAt(2);
            // setEndAt(2 + totalHours);
        }
        else if (selectedTime?.includes("3:00")) {
            startAt = 3;
            endAt = 3 + totalHours;
            // setStartAt(3);
            // setEndAt(3 + totalHours);
        }
        else if (selectedTime?.includes("4:00")) {
            startAt = 4;
            endAt = 4 + totalHours;            
            // setStartAt(4);
            // setEndAt(4 + totalHours);
        }






        // SEND TO BACKEND FOR DB PROCESSING

        addBooking(uniqueBookingID, customerName, customerPhone, customerEmail, listServices, startAt, endAt, status, appointmentNotes, customerNotes, createdAt);

    }

    // useEffect(() => {
    //     if (submitted == true) 
    // }, [submitted]);





    function testingLog() {

        // console.log(uniqueBookingID);
        // console.log(customerName);
        // console.log(customerPhone);
        // console.log(customerEmail);
        // console.log(listServices);
        // console.log(startAt);
        // console.log(endAt);
        // console.log(status);
        // console.log(appointmentNotes);
        // console.log(customerNotes);
        // console.log(createdAt);

        // console.log(selectedDate);
        // console.log(selectedTime);

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


    return (


        <div className="body-wrap boxed-container">
            <div className={styles.bookingWrapper}>

                <div>
                    <div className={styles.container}>
                        <div className="datePicker" style={{ paddingTop: "2rem", marginLeft: "1rem" }}>
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
                                    const isSelected =
                                        day &&
                                        selectedDate &&
                                        day.toDateString() === selectedDate.toDateString();

                                    return (
                                        <div className="cal-body__day" key={index} onClick={() => {
                                            setSelectedDate(day);
                                        }
                                        }>
                                            {day ? day.getDate() : ""}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>



                        <div style={{ marginLeft: "1rem", marginTop: "3rem" }}>
                            What time?
                        </div>


                        <div className={styles.timeGrid} style={{ paddingTop: "1rem" }}>
                            {[
                                "9:00 AM", "10:00 AM",
                                "11:00 AM", "12:00 PM",
                                "1:00 PM", "2:00 PM",
                                "3:00 PM", "4:00 PM"
                            ].map((time) => (
                                <button key={time} className={`${styles.timeBtn} ${selectedTime === time ? styles.active : ""}`}
                                    onClick={() => {
                                        setSelectedTime(time);
                                    }
                                    }
                                >
                                    {time}
                                </button>
                            ))}
                        </div>



                        <section>
                            <form className={styles.feedForm} action="#">
                                <input placeholder="Name" type="text"
                                    onChange={(e) =>
                                        setCustomerName(e.target.value)
                                    } />
                                <input name="phone" placeholder="Phone number"
                                    onChange={(e) =>
                                        setCustomerPhone(e.target.value)
                                    } />
                                <input name="email" placeholder="E-mail" type="email"
                                    onChange={(e) =>
                                        setCustomerEmail(e.target.value)
                                    } />
                                <input name="customerNotes" placeholder="Comments/Requests" type="text"
                                    onChange={(e) =>
                                        setCustomerNotes(e.target.value)
                                    } />
                            </form>
                        </section>



                        <div style={{ paddingTop: "2rem", marginLeft: "1rem" }}>
                            Please note some services may not be available at certain times, due to the length of the service. If you have any questions about booking, please reach out to me via DM! Thank you!
                        </div>
                        <button className="buttonSubmit"
                            onClick={() => initializeBookingData()}>Submit Booking</button>
                    </div>

                    <button className="nextBtn" ><Link href="/services/book/checkout">Checkout</Link></button>

                    <button onClick={() => testingLog()}>
                        checkCart console log
                    </button>

                </div>
            </div>
        </div >

    );
}