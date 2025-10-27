import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Patients",
  description: "view patient information",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function Page() {
  return <h1>Patient</h1>;
}
