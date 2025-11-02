import PatientAppointmentContext from "@/components/PatientAppointmentContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Appointments",
  description: "View your appointments",
};

export default function Page() {
  return <PatientAppointmentContext />;
}
