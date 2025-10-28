"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { db } from "../prisma";
import {
  combinedDoctorSchema,
  combinedDoctorType,
  combinedPatientSchema,
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error with Log in",
    };
  }
}

export async function SignupPatient(data: CombinedPatientType) {
  const validation = combinedPatientSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials payload" };
  }
  try {
    const { data: validData } = validation;
    const signupResponse = await auth.api.signUpEmail({ body: validData });
    const userId = signupResponse.user.id;
    if (!userId) {
      return { success: false, message: "Failed to create user account" };
    }
    await db.patient.create({
      data: {
        userId,
        bloodType: validData.bloodType,
        gender: validData.gender,
        genotype: validData.genotype,
        birthDate: validData.dateOfBirth,
        occupation: validData.occupation,
        phone: validData.phone,
        address: validData.address,
        timezone: validData.timeZone,
        country: validData.country,
      },
    });
    return { success: true, message: "Signup successful" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error with Signup",
    };
  }
}
export async function SignupDoctor(data: combinedDoctorType) {
  const validation = combinedDoctorSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials payload" };
  }

  try {
    const { data: validData } = validation;
    const signupResponse = await auth.api.signUpEmail({ body: validData });
    const userId = signupResponse.user.id;
    if (!userId) {
      return { success: false, message: "Failed to create user account" };
    }
    await db.doctor.create({
      data: {
        userId,
        specialty: validData.specialty,
        yearsOfExperience: validData.yearsOfExperience,
        startTime: validData.startTime,
        endTime: validData.endTime,
        consultationFee: validData.consultationFee,
        timezone: validData.timeZone,
        country: validData.country,
        bio: validData.bio,
      },
    });
    return { success: true, message: "Signup successful" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error with Signup",
    };
  }
}

export async function Logout() {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Log out successful" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There is an error with log out",
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error with forgot password",
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Reset password not successful",
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error with deleting account",
    };
  }
}
