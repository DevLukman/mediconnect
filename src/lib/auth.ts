import ForgotPasswordEmail from "@/components/ForgetPasswordEmail";
import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY as string);
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const now = new Date();
      const requestedAt = now
        .toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", " at");
      try {
        await resend.emails.send({
          from: "Mediconnect <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset your password",
          react: ForgotPasswordEmail({
            username: user.name,
            resetUrl: url,
            userEmail: user.email,
            companyName: "Mediconnect",
            supportEmail: "support@mediconnect.com",
            companyAddress: "456 Tech Avenue, San Francisco, CA 94105",
            requestedAt,
          }),
        });
      } catch (error) {
        console.error("Failed to send reset email:", error);
        throw new Error("Failed to send reset email");
      }
    },
  },
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60 * 60,
  //   },
  // },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },

  plugins: [nextCookies()],
});
