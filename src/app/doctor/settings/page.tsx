import DoctorSettingForm from "@/components/doctor/doctorSettingForm";
import { Separator } from "@/components/ui/separator";
import { getDoctorProfile } from "@/lib/action/getDoctorProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Settings",
  description:
    "Manage your profile settings, preferences, and account information",
};

export default async function Page() {
  let doctorData = null;
  try {
    doctorData = await getDoctorProfile();
  } catch (error) {
    console.error("Failed to load doctor profile:", error);
  }
  return (
    <section className="mt-8">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2 text-sm font-normal">
          Manage your account settings.
        </p>
        <Separator className="mt-4" />
      </div>
      <div className="mt-8 w-full">
        <h1 className="text-xl font-bold">Personal info</h1>
        <p className="text-muted-foreground mt-2 text-sm font-normal">
          Update your photo and personal details here.
        </p>
        <Separator className="mt-4" />
      </div>
      <DoctorSettingForm doctorData={doctorData || null} />
    </section>
  );
}
