import PatientAppointmentContent from "@/components/patient/PatientAppointmentContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Appointments",
  description: "View your appointments",
};

export default function Page() {
  return (
    <section className="mt-8 px-8 pb-2">
      <PatientAppointmentContent />
    </section>
  );
}
