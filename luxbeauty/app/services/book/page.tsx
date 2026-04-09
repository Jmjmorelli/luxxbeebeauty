"use client"
import Link from "next/link";
import { useCart } from "@/app/context/cartContext";
import styles from "./page.module.css"
import { useState } from "react";
import { index } from "drizzle-orm/gel-core";
import { BookingProvider, useBooking } from "@/app/context/bookingContext";


// const timeSlots = [
//     "9:00 AM", , "10:00 AM",
//     "11:00 AM", "12:00 PM",
//     "1:00 PM", "2:00 PM",
//     "3:00 PM", "4:00 PM",
// ];



const dates = [
    "Apr 4",
    "Apr 5",
    "Apr 6",
    "Apr 7",
    "Apr 8",
    "Apr 9",
    "Apr 10",
    "Apr 11"
];

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


    // booking logic
    const { booking } = useBooking();
    const { addToBooking } = useBooking();
    const { removeFromBooking } = useBooking();
    const { clearBooking } = useBooking();
    const { checkBooking } = useBooking();

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

    function logSelection(x: Date | null) {
        console.log("day selected" + x);
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
                                        <div className="cal-body__day" key={index} onClick={() => logSelection(day); addToBooking()
                                }>
                                { day? day.getDate() : ""}
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
                                    console.log(time);
                                }
                                }
                            >
                                {time}
                            </button>
                        ))}
                    </div>



                    <div style={{ paddingTop: "2rem", marginLeft: "1rem" }}>
                        Please note some services may not be available at certain times, due to the length of the service. If you have any questions about booking, please reach out to me via DM! Thank you!
                    </div>
                </div>

                <button className="nextBtn" ><Link href="/services/book/checkout">Checkout</Link></button>

                <button onClick={checkCart}>
                    checkCart console log
                </button>

            </div>
        </div>
        </div >

    );
}