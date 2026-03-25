import ForgetPasswordForm from "@/components/authForms/ForgetpasswordForm";
import Logo from "@/components/Logo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mediconnect | Forgot Password",
  description:
    "Reset your MediConnect password. Enter your email address and we'll send you instructions to create a new password.",
};

export default function Page() {
  return (
    <section className="mt-4 flex h-[70dvh] flex-col items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[400px]">
        <Logo />
        <div className="mt-4">
          <h2 className="font-IBM text-xl font-bold">
            Enter your email to reset your password
          </h2>
        </div>
        <ForgetPasswordForm />
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          <p className="flex items-center gap-2 text-sm">
            <span> Remember your password?</span>
            <Link href={"/login"} className="text-primary underline">
              Login
            </Link>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <span> New to Mediconnect?</span>
            <Link href={"/signup"} className="text-primary underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
