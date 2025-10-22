import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mediconnect | Sign up",
  description: "Connecting You to Quality Healthcare",
};

import SignupForm from "@/components/authForms/SignupForm";
import Logo from "@/components/Logo";

export default function Page() {
  return (
    <section className="mt-4 px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex  flex-col">
      <div className="mx-auto  w-full max-w-[400px]">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
