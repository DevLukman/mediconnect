import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Doctors",
  description: " view patient doctor information",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};
export default function Page() {
  return <h1>Doctors</h1>;
}
