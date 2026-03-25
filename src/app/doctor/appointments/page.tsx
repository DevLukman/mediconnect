import DoctorAppointmentContent from "@/components/doctor/DoctorAppointmentsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Appointments",
  description: "View patient appointments",
};

export default function Page() {
  return (
    <section className="mt-8">
      <DoctorAppointmentContent />
    </section>
  );
}
