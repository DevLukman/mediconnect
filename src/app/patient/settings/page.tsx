import PatientSettingForm from "@/components/patient/PatientSettingForm";
import { Separator } from "@/components/ui/separator";
import { getPatientProfile } from "@/lib/action/getPatientProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Settings",
  description:
    "Manage your profile settings, preferences, and account information",
};

export default async function Page() {
  let patientData = null;
  try {
    patientData = await getPatientProfile();
  } catch (error) {
    console.error("Failed to load patient profile:", error);
  }
  return (
    <section className="mt-18 px-5 pb-10 md:mt-8 md:px-8 md:pb-3">
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
      <PatientSettingForm patientData={patientData || null} />
    </section>
  );
}
