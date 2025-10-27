import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Dashboard",
  description: "Manage your appointments, view patient information",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function Page() {
  return (
    <>
      <h1>Doctor dashboard</h1>
    </>
  );
}
