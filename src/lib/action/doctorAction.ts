"use server";

import { db } from "../prisma";
import { getUserSession } from "./getSession";
type DoctorFilters = {
  name?: string;
  specialty?: string;
  minExperience?: number;
  maxExperience?: number;
  startTime?: string;
  endTime?: string;
};

export async function DoctorLists(filters: DoctorFilters = {}) {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("No session found");

    const {
      name,
      specialty,
      minExperience,
      maxExperience,
      startTime,
      endTime,
    } = filters;

    const data = await db.doctor.findMany({
      where: {
        status: "APPROVED",
        ...(specialty && specialty !== "All" && { specialty }),
        ...(minExperience !== undefined || maxExperience !== undefined
          ? {
              yearsOfExperience: {
                ...(minExperience !== undefined && { gte: minExperience }),
                ...(maxExperience !== undefined && { lte: maxExperience }),
              },
            }
          : {}),
        user: {
          role: "DOCTOR",
          ...(name?.trim() && {
            name: { contains: name, mode: "insensitive" },
          }),
        },
      },
      select: {
        id: true,
        bio: true,
        specialty: true,
        yearsOfExperience: true,
        consultationFee: true,
        startTime: true,
        endTime: true,
        user: {
          select: { name: true, image: true },
        },
      },
    });

    return data.filter((doctor) => {
      if (startTime && doctor.startTime < startTime) return false;
      if (endTime && doctor.endTime > endTime) return false;

      return true;
    });
  } catch (error) {
    console.error("Failed to fetch doctor details:", error);
    throw error;
  }
}

export async function DoctorDetails(id: string) {
  try {
    const session = await getUserSession();
    if (!session) {
      throw new Error("No session found");
    }

    const data = await db.doctor.findUnique({
      where: { id: id },
      select: {
        bio: true,
        specialty: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw error;
  }
}
