import DoctorAppointmentContent from "@/components/doctor/DoctorAppointmentsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Appointments",
  description: "View patient appointments",
};

export default function Page() {
  return (
    <section className="mt-18 px-5 pb-2 md:mt-8 md:px-8">
      <DoctorAppointmentContent />
    </section>
  );
}
