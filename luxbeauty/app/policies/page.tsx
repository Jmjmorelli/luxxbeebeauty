import BottomSheetNav from "../components/BottomSheetNav"
import { db } from "../db"
import { appointmentsTable } from "../db/schema"

export default function Policies() {

  async function createAppointment() {
  'use server'

  await db.insert(appointmentsTable).values({
    id: crypto.randomUUID(), // ⚠️ also fix this
    customer_name: "test",
    customer_phone: "1234567890",
    customer_email: "test@gmail.com",
    service_names: "test service",
    start_at: Date.now(),
    end_at: Date.now() + 3600000,
  });
}

  return (
    <div >
      <div style={{padding: "1rem"}}>
        Deposit $20
      </div>
      <div style={{padding: "1rem"}}>
        You can bring a guest, just let me know before your appointment
      </div>
      <div style={{padding: "1rem"}}>
        If there is any issues with your appt, let me know 48 hours prior. Anything later is subject to a fee depending on the state of my work.
      </div>
      <div style={{padding: "1rem"}}>
        I will provide a 10 minute grace period, anything later, a possible late fee ($15)
      </div>
      <div style={{padding: "1rem"}}>
        For FILL APTs, require 40% of lashes remaining on each eye. Anything less will be priced as a full set.
      </div>
      <div style={{padding: "1rem"}}>
        Foreign Fills will incur $40 fee
      </div>
      <div style={{padding: "1rem"}}>
        Any appt not listed on my schedule is a squeeze in,  $40 fee
      </div>

      <form>
        <button formAction={createAppointment}>submit</button>
      </form>







      <BottomSheetNav />

    </div>
  )
}