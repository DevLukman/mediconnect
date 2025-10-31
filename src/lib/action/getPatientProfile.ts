"use server";
import { revalidatePath } from "next/cache";
import { db } from "../prisma";
import { PatientProfileFormData, PatientProfileSchema } from "../types";
import { getUserSession } from "./getSession";

export async function getPatientProfile(): Promise<
  PatientProfileFormData | undefined
> {
  try {
    const session = await getUserSession();

    if (!session?.user?.id) {
      throw new Error("Unauthorized: No valid session found");
    }
    const patient = await db.patient.findUnique({
      where: { userId: session.user.id },
      select: {
        birthDate: true,
        occupation: true,
        address: true,
        country: true,
        timezone: true,
        gender: true,
        genotype: true,
        phone: true,
        bloodType: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    if (!patient) {
      return undefined;
    }
    return {
      name: patient.user.name,
      image: patient.user.image || "",
      email: patient.user.email,
      dateOfBirth: patient.birthDate,
      address: patient.address,
      occupation: patient.occupation,
      phone: patient.phone,
      country: patient.country,
      timeZone: patient.timezone,
      bloodType: patient.bloodType,
      genotype: patient.genotype,
      gender: patient.gender || "",
    };
  } catch (error) {
    console.error("Error fetching patient profile:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      throw error;
    }

    throw new Error("Failed to retrieve doctor profile");
  }
}

export async function UpdatePatientProfile(data: PatientProfileFormData) {
  const session = await getUserSession();
  if (!session) {
    return { success: false, message: "Unauthorised" };
  }
  const validation = PatientProfileSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data" };
  }

  try {
    const { data: validData } = validation;
    await db.patient.update({
      where: { userId: session.user.id },
      data: {
        gender: validData.gender,
        genotype: validData.genotype,
        bloodType: validData.bloodType,
        occupation: validData.occupation,
        country: validData.country,
        timezone: validData.timeZone,
        phone: validData.phone,
        address: validData.address,
        birthDate: validData.dateOfBirth,
        user: {
          update: {
            image: validData.image,
          },
        },
      },
    });
    revalidatePath("/patient/settings");
    revalidatePath("/patient/dashboard");
    revalidatePath("/patient", "layout");
    return { success: true, message: "Profile successfuly updated" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "There is an error with updating profile",
    };
  }
}
