import LoginForm from "@/components/authForms/LoginForm";
import Logo from "@/components/Logo";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Mediconnect | Log in",
  description:
    "Log in to your MediConnect account to book appointments, view your medical records, and manage your healthcare.",
};

export default function Page() {
  return (
    <section className="mt-4 px-4 sm:px-6 overflow-x-hidden lg:px-8 h-[90dvh] flex items-center justify-center flex-col">
      <div className="mx-auto  w-full max-w-[400px]">
        <Logo />
        <div className="mt-4">
          <h1 className="font-IBM font-bold text-2xl">
            Log in to your account
          </h1>
          <p className="flex items-center gap-2 text-sm mt-3">
            <span> Don&apos;t have an account?</span>
            <Link href={"/signup"} className="text-primary">
              Create a new account
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
