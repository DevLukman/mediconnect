import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};
const db =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export { db };

// import { PrismaClient } from "@/generated/prisma";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof createPrismaClient>;
// };

// function createPrismaClient() {
//   return new PrismaClient().$extends(withAccelerate());
// }

// const db = globalForPrisma.prisma || createPrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = db;
// }

// export { db };
