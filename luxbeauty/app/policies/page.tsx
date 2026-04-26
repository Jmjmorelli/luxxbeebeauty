'use client';

import { useFormState } from "react-dom";
// import { createAppointment } from "../actions";

import BottomSheetNav from "../components/BottomSheetNav"
import { db } from "../db"
import { appointmentsTable } from "../db/schema"
import { useActionState } from "react";

export default function Policies() {

  // const [state, formAction] = useActionState(createAppointment, null);


  return (
    <div >
      <div style={{ padding: "1rem" }}>
        Deposit $20
      </div>
      <div style={{ padding: "1rem" }}>
        You can bring a guest, just let me know before your appointment
      </div>
      <div style={{ padding: "1rem" }}>
        If there is any issues with your appt, let me know 48 hours prior. Anything later is subject to a fee depending on the state of my work.
      </div>
      <div style={{ padding: "1rem" }}>
        I will provide a 10 minute grace period, anything later, a possible late fee ($15)
      </div>
      <div style={{ padding: "1rem" }}>
        For FILL APTs, require 40% of lashes remaining on each eye. Anything less will be priced as a full set.
      </div>
      <div style={{ padding: "1rem" }}>
        Foreign Fills will incur $40 fee
      </div>
      <div style={{ padding: "1rem" }}>
        Any appt not listed on my schedule is a squeeze in,  $40 fee
      </div>


      {/* <form action={formAction}>
        <input type="text" name="customer_name" placeholder="Name" />
        <input type="text" name="customer_phone" placeholder="Phone" />
        <input type="email" name="customer_email" placeholder="Email" />

        <button type="submit">Submit</button>

        {state?.message && (
          <p>{state.message}</p>
        )}
      </form> */}






      <BottomSheetNav />

    </div>
  )
}