import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Settings",
  description: "Make changes to your profile",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function Page() {
  return <h1>Settings</h1>;
}
