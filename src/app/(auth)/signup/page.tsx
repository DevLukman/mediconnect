import SignupForm from "@/components/authForms/SignupForm";
import Logo from "@/components/Logo";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mediconnect | Sign up",
  description:
    "Create your MediConnect account to start booking appointments with verified doctors. Join thousands of patients managing their healthcare online.",
};

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
