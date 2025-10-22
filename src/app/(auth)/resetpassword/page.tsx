import ResetPasswordForm from "@/components/authForms/ResetPasswordForm";
import Logo from "@/components/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | ResetPassword",
  description: "Connecting You to Quality Healthcare",
};

export default function Page() {
  return (
    <section className="mt-4 px-4 sm:px-6 overflow-x-hidden lg:px-8 h-[80dvh] flex items-center justify-center flex-col">
      <div className="mx-auto w-full max-w-[400px]">
        <Logo />
        <div className="mt-4">
          <h2 className="font-IBM font-bold">
            Enter your new password to complete the reset
          </h2>
        </div>
        <ResetPasswordForm />
      </div>
    </section>
  );
}
