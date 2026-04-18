import { PrismaClient } from "@/generated/prisma";
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const NUM_DOCTORS = 100;

const SPECIALIZATIONS = [
  "cardiology",
  "dermatology",
  "endocrinology",
  "gastroenterology",
  "therapist",
  "neurology",
  "oncology",
  "pediatrics",
  "psychiatry",
  "radiology",
  "surgery",
  "urology",
  "orthopedics",
  "ophthalmology",
  "gynecology",
  "anesthesiology",
];
async function seedDoctors() {
  for (let i = 0; i < NUM_DOCTORS; i++) {
    const firstName = faker.person.firstName().toLowerCase();
    const lastName = faker.person.lastName().toLowerCase();
    const email = faker.internet
      .email({ firstName, lastName, provider: "gmail.com" })
      .toLowerCase();

    const startHour = faker.number.int({ min: 8, max: 11 });
    const endHour = faker.number.int({ min: 17, max: 21 });
    const startTime = `${String(startHour).padStart(2, "0")}:00`;
    const endTime = `${String(endHour).padStart(2, "0")}:00`;

    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        role: "DOCTOR",
        email,
        image: faker.image.avatar(),
        emailVerified: false,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),

        doctor: {
          create: {
            specialty: faker.helpers.arrayElement(SPECIALIZATIONS),
            yearsOfExperience: faker.number.int({ min: 5, max: 40 }),
            startTime,
            endTime,
            timezone: faker.location.timeZone().toLowerCase(),
            bio: faker.person.bio(),
            consultationFee: faker.number.int({ min: 5000, max: 50000 }),
            country: faker.location.country().toLowerCase(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            status: "APPROVED",
          },
        },
      },
    });
  }
}

async function main() {
  await seedDoctors();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
