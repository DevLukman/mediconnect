import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Dashboard",
  description: "View your Dashboard",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};
export default function Page() {
  return (
    <>
      <h1>Patient dashboard</h1>
    </>
  );
}
