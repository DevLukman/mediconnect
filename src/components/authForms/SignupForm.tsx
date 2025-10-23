"use client";
import {
  DoctorStepTwoFormData,
  PatientStepTwoFormData,
  StepOneFormData,
} from "@/lib/types";

import { Signup } from "@/lib/action/authAction";
import { ArrowBigRight, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DoctorStepTwo from "./DoctorStepTwo";
import PatientStepTwo from "./PatientStepTwo";
import StepOneForm from "./SignupStepOne";

export default function SignupForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function handleStepOneComplete(data: StepOneFormData) {
    setStepOneData(data);
    setCurrentStep(2);
  }

  function handlePatientComplete(patientData: PatientStepTwoFormData) {
    const data = {
      ...stepOneData,
      ...patientData,
    };

    const payload = {
      name: data.name!,
      email: data.email!,
      password: data.password!,
      role: data.role!,
    };

    startTransition(async () => {
      const result = await Signup(payload);
      if (result.success) {
        toast.success(result.message);
        router.push("/");
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDoctorComplete(doctorData: DoctorStepTwoFormData) {
    const data = {
      ...stepOneData,
      ...doctorData,
    };
    const payload = {
      name: data.name!,
      email: data.email!,
      password: data.password!,
      role: data.role!,
    };

    startTransition(async () => {
      const result = await Signup(payload);
      if (result.success) {
        toast.success(result.message);
        router.push("/");
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleBack() {
    setCurrentStep(1);
    setStepOneData(null);
  }
  return (
    <>
      <div className="flex items-center justify-center gap-5 mt-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleBack}
        >
          {stepOneData !== null ? (
            <span
              className={`text-sm border rounded-full bg-green-600 px-1.5 py-1.5 items-center`}
            >
              <Check size={14} className="text-secondary" />
            </span>
          ) : (
            <span
              className={`text-sm border rounded-full px-2.5 py-0.5 items-center`}
            >
              1
            </span>
          )}
          <span className="text-sm">Personal info</span>
        </div>
        <span>
          <ArrowBigRight size={16} />
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm border rounded-full  px-2.5 py-0.5 items-center`}
          >
            2
          </span>
          <span className="text-sm">Additional info</span>
        </div>
      </div>
      {currentStep === 1 && <StepOneForm onComplete={handleStepOneComplete} />}
      {currentStep === 2 && stepOneData?.role === "PATIENT" && (
        <PatientStepTwo
          onComplete={handlePatientComplete}
          isSubmitting={isPending}
        />
      )}
      {currentStep === 2 && stepOneData?.role === "DOCTOR" && (
        <DoctorStepTwo
          onComplete={handleDoctorComplete}
          isSubmitting={isPending}
        />
      )}

      <div className="py-4 ">
        <p className="flex items-center justify-center gap-2 text-sm mt-3">
          <span> Already have an account?</span>
          <Link href={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
