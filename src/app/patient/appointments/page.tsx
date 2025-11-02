import PatientAppointmentContent from "@/components/PatientAppointmentContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Appointments",
  description: "View your appointments",
};

export default function Page() {
  return <PatientAppointmentContent />;
}
