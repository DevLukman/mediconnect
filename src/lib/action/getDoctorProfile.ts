"use server";
import { revalidatePath } from "next/cache";
import { db } from "../prisma";
import { DoctorProfileFormData, DoctorProfileSchema } from "../types";
import { getUserSession } from "./getSession";

export async function getDoctorProfile(): Promise<DoctorProfileFormData | null> {
  try {
    const session = await getUserSession();

    if (!session?.user?.id) {
      throw new Error("Unauthorized: No valid session found");
    }

    const doctor = await db.doctor.findUnique({
      where: { userId: session.user.id },
      select: {
        specialty: true,
        consultationFee: true,
        startTime: true,
        endTime: true,
        country: true,
        timezone: true,
        bio: true,
        user: {
          select: {
            image: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!doctor) {
      return null;
    }
    return {
      image: doctor.user.image || "",
      name: doctor.user.name,
      email: doctor.user.email,
      specialty: doctor.specialty,
      consultationFee: doctor.consultationFee,
      startTime: doctor.startTime,
      endTime: doctor.endTime,
      country: doctor.country || "",
      timeZone: doctor.timezone,
      bio: doctor.bio,
    };
  } catch (error) {
    console.error("Error fetching doctor profile:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      throw error;
    }

    throw new Error("Failed to retrieve doctor profile");
  }
}

export async function UpdateDoctorProfile(data: DoctorProfileFormData) {
  const session = await getUserSession();
  if (!session) {
    return { success: false, message: "Unauthorised" };
  }
  const validation = DoctorProfileSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data" };
  }
  try {
    const { data: validData } = validation;
    await db.doctor.update({
      where: { userId: session.user.id },
      data: {
        status: "PENDING",
        specialty: validData.specialty,
        startTime: validData.startTime,
        endTime: validData.endTime,
        bio: validData.bio,
        country: validData.country,
        timezone: validData.timeZone,
        consultationFee: validData.consultationFee,
        user: {
          update: {
            image: validData.image,
          },
        },
      },
    });

    revalidatePath("/doctor/settings");
    revalidatePath("/doctor/dashboard");
    revalidatePath("/doctor", "layout");
    return { success: true, message: "Profile successfuly updated" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "There is an error with updating profile",
    };
  }
}
