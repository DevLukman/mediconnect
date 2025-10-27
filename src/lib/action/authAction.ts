"use server";
import { Prisma } from "@/generated/prisma";
import { headers } from "next/headers";
import { auth } from "../auth";
import { db } from "../prisma";
import {
  ForgetPasswordSchema,
  LoginSchema,
  SignupSchema,
  TForgetPasswordSchema,
  TLoginSchema,
  TSignUpSchema,
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
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Please check your information",
    };
  }
}

export async function Signup(data: TSignUpSchema) {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials payload" };
  }
  try {
    await auth.api.signUpEmail({
      body: {
        ...validation.data,
      },
    });
    return { success: true, message: "Signup successful" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "There was an error with Signup",
    };
  }
}

export async function Logout() {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Log out successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to Log out" };
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
    const e = error as Error;
    return { success: false, message: e.message || "There was an error" };
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
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Password reset not successful",
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
    const e = error as Error;
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      return {
        success: false,
        message: "Account not found or already deleted",
      };
    }
    return { success: false, message: "Error deleting account" };
  }
}
