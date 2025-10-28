"use server";
import { Prisma } from "@/generated/prisma";
import { headers } from "next/headers";
import { auth } from "../auth";
import { db } from "../prisma";
import {
  CombinedDoctorSchema,
  CombinedDoctorType,
  CombinedPatientSchema,
  CombinedPatientType,
  ForgetPasswordSchema,
  LoginSchema,
  TForgetPasswordSchema,
  TLoginSchema,
} from "../types";
import { getUserSession } from "./getSession";

export async function Login(data: TLoginSchema) {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials payload" };
  }

  try {
    await auth.api.signInEmail({
      body: {
        ...validation.data,
      },
    });
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "There was an error with Log in",
    };
  }
}

export async function SignupPatient(data: CombinedPatientType) {
  const validation = CombinedPatientSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials payload" };
  }

  let userId: string | undefined;
  try {
    const { data: validData } = validation;
    const { email, password, name, ...profile } = validData;
    const signupResponse = await auth.api.signUpEmail({
      body: { email, password, name, role: "PATIENT" },
      headers: await headers(),
    });

    userId = signupResponse.user?.id;

    if (!userId) {
      return { success: false, message: "Failed to create user account" };
    }
    await db.patient.create({
      data: {
        userId,
        bloodType: profile.bloodType,
        gender: profile.gender,
        genotype: profile.genotype,
        birthDate: profile.dateOfBirth,
        occupation: profile.occupation,
        phone: profile.phone,
        address: profile.address,
        timezone: profile.timeZone,
        country: profile.country,
      },
    });

    return { success: true, message: "Signup successful" };
  } catch (error) {
    console.error("Signup error:", error);
    if (userId) {
      try {
        await db.user.delete({
          where: { id: userId },
        });
      } catch (cleanupError) {
        console.error(cleanupError);
      }
    }
    return {
      success: false,
      message: "There was an error with Signup",
    };
  }
}
export async function SignupDoctor(data: CombinedDoctorType) {
  const validation = CombinedDoctorSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials payload" };
  }

  let userId: string | undefined;

  try {
    const { data: validData } = validation;
    const { email, password, name, ...profile } = validData;
    const signupResponse = await auth.api.signUpEmail({
      body: { email, password, name, role: "DOCTOR" },
      headers: await headers(),
    });
    userId = signupResponse.user?.id;
    if (!userId) {
      return { success: false, message: "Failed to create user account" };
    }
    await db.doctor.create({
      data: {
        userId,
        specialty: profile.specialty,
        yearsOfExperience: profile.yearsOfExperience,
        startTime: profile.startTime,
        endTime: profile.endTime,
        consultationFee: profile.consultationFee,
        timezone: profile.timeZone,
        country: profile.country,
        bio: profile.bio,
      },
    });
    return { success: true, message: "Signup successful" };
  } catch (error) {
    console.error("Signup error:", error);
    if (userId) {
      try {
        await db.user.delete({
          where: { id: userId },
        });
      } catch (cleanupError) {
        console.error(cleanupError);
      }
    }
    return {
      success: false,
      message: "There was an error with Signup",
    };
  }
}

export async function Logout() {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Log out successful" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "There is an error with log out",
    };
  }
}

export async function ForgetPassword(data: TForgetPasswordSchema) {
  const validation = ForgetPasswordSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid email" };
  }

  try {
    await auth.api.forgetPassword({
      body: {
        ...validation.data,
        redirectTo: "/resetpassword",
      },
    });
    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to send reset email",
    };
  }
}

export async function ResetPassword(newPassword: string, token: string) {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    });
    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Reset password not successful",
    };
  }
}

export async function DeleteUser() {
  const session = await getUserSession();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }
  try {
    await db.user.delete({
      where: { id: session.user.id },
    });
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Account deleted" };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message:
          "You have existing appointments. Cancel or archive them before deleting your account.",
      };
    }
    return {
      success: false,
      message: "There was an error with deleting account",
    };
  }
}
