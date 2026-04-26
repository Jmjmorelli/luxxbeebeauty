'use client';

import { useFormState } from "react-dom";
// import { createAppointment } from "../actions";

import BottomSheetNav from "../components/BottomSheetNav"
import { db } from "../db"
import { appointmentsTable } from "../db/schema"
import { useActionState } from "react";
import styles from "./page.module.css"


export default function Policies() {

  const policies = [
    {
      title: "Deposit",
      text: "A $20 deposit is required to book your appointment.",
    },
    {
      title: "Cancellations & Rescheduling",
      text: "If you need to cancel or reschedule, please let me know at least 48 hours before your appointment. Anything later may be subject to a fee depending on the situation.",
    },
    {
      title: "Foreign Fills",
      text: "Foreign fills will incur a $40 fee.",
    },
    {
      title: "Squeeze-In Appointments",
      text: "Any appointment not listed on my schedule is considered a squeeze-in and will include a $40 fee.",
    },
    {
      title: "Fill Appointments",
      text: "Fill appointments require at least 40% of lashes remaining on each eye. Anything less will be priced as a full set.",
    },
    {
      title: "Grace Period",
      text: "A 10-minute grace period is provided. After 10 minutes, a $15 late fee may apply.",
    },
    {
      title: "Guests",
      text: "You may bring a guest, but please let me know before your appointment.",
    },

  ];

  return (
    <div >
      <div className={styles.policiesPage}>
        <section className={styles.policiesHero}>
          <h1>Booking Policies</h1>
          <p>
            Please review all policies before booking your appointment.
          </p>
        </section>

        <section className={styles.policiesGrid}>
          {policies.map((policy) => (
            <div className={styles.policyCard} key={policy.title}>
              <h2>{policy.title}</h2>
              <p>{policy.text}</p>
            </div>
          ))}
        </section>
      </div>

      {/* give space for the menu button  */}
      <div style={{ marginTop: "2rem" }}> </div>


      <BottomSheetNav />

    </div>
  )
}