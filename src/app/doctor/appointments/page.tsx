import DoctorAppointmentContent from "@/components/DoctorAppointmentsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Appointments",
  description: "View patient appointments",
};

export default function Page() {
  return (
    <section>
      <DoctorAppointmentContent />
    </section>
  );
}
