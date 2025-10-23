import ForgetPasswordForm from "@/components/authForms/ForgetpasswordForm";
import Logo from "@/components/Logo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mediconnect | ForgetPassword",
  description: "Connecting You to Quality Healthcare",
  keywords: ["healthcare", "medic", "specialists", "healthTech"],
  openGraph: {
    title: "Mediconnect | ForgetPassword",
    description: "Connecting You to Quality Healthcare",
    siteName: "Mediconnect",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return (
    <section className="mt-4 px-4 sm:px-6 overflow-x-hidden lg:px-8 h-[70dvh] flex items-center justify-center flex-col">
      <div className="mx-auto w-full max-w-[400px]">
        <Logo />
        <div className="mt-4">
          <h2 className="font-IBM font-bold text-xl">
            Enter your email to reset your password
          </h2>
        </div>
        <ForgetPasswordForm />
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          <p className="flex items-center gap-2 text-sm ">
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
