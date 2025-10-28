/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOCTOR', 'PATIENT');

-- CreateEnum
CREATE TYPE "DoctorStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PATIENT';

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "gender" "Gender",
    "genotype" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Lagos',
    "country" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "consultationFee" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Lagos',
    "country" TEXT DEFAULT 'Nigeria',
    "status" "DoctorStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "reasonForVisit" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentDate" DATE NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripePaymentId" TEXT,
    "stripeSessionId" TEXT,
    "paymentMethod" TEXT,
    "paidAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "refundReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentId" TEXT NOT NULL,
    "appointmentStartTime" TEXT NOT NULL,
    "appointmentEndTime" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "doctorResponse" TEXT,
    "respondedAt" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "flagReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE INDEX "Doctor_userId_idx" ON "Doctor"("userId");

-- CreateIndex
CREATE INDEX "Doctor_specialty_idx" ON "Doctor"("specialty");

-- CreateIndex
CREATE INDEX "Doctor_status_idx" ON "Doctor"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE INDEX "Appointment_patientId_idx" ON "Appointment"("patientId");

-- CreateIndex
CREATE INDEX "Appointment_doctorId_idx" ON "Appointment"("doctorId");

-- CreateIndex
CREATE INDEX "Appointment_appointmentDate_idx" ON "Appointment"("appointmentDate");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- CreateIndex
CREATE INDEX "Appointment_doctorId_appointmentDate_startTime_idx" ON "Appointment"("doctorId", "appointmentDate", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_appointmentId_key" ON "Payment"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentId_key" ON "Payment"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeSessionId_key" ON "Payment"("stripeSessionId");

-- CreateIndex
CREATE INDEX "Payment_appointmentId_idx" ON "Payment"("appointmentId");

-- CreateIndex
CREATE INDEX "Payment_stripePaymentId_idx" ON "Payment"("stripePaymentId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Review_appointmentId_key" ON "Review"("appointmentId");

-- CreateIndex
CREATE INDEX "Review_doctorId_idx" ON "Review"("doctorId");

-- CreateIndex
CREATE INDEX "Review_patientId_idx" ON "Review"("patientId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "Review_createdAt_idx" ON "Review"("createdAt");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "session_token_idx" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_expiresAt_idx" ON "session"("expiresAt");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
