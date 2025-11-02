/*
  Warnings:

  - Added the required column `appointmentDuration` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentDuration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;

-- DropEnum
DROP TYPE "public"."Gender";
