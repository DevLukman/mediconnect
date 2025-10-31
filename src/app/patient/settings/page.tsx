import PatientSettingForm from "@/components/PatientSettingForm";
import { Separator } from "@/components/ui/separator";
import { getPatientProfile } from "@/lib/action/getPatientProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediconnect | Settings",
  description:
    "Manage your profile settings, preferences, and account information",
};

export default async function Page() {
  const patientData = await getPatientProfile();
  return (
    <section>
      <div className="w-full">
        <h1 className="font-bold text-2xl">Settings</h1>
        <p className="text-sm font-normal text-muted-foreground mt-2">
          Manage your account settings.
        </p>
        <Separator className="mt-4" />
      </div>
      <div className="w-full mt-8">
        <h1 className="font-bold text-xl">Personal info</h1>
        <p className="text-sm font-normal text-muted-foreground mt-2">
          Update your photo and personal details here.
        </p>
        <Separator className="mt-4" />
      </div>
      <PatientSettingForm patientData={patientData || null} />
    </section>
  );
}
