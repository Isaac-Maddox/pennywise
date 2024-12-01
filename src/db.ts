import { PrismaClient } from "@prisma/client";

const prismaSingleton = () => {
   return new PrismaClient({
      log: process.env.NODE_ENV === "development" && process.env.PRISMA_LOG === "true" ? ["query", "error"] : [],
   });
};

declare const globalThis: {
   prisma: ReturnType<typeof prismaSingleton>;
} & typeof global;

const prisma = globalThis.prisma ?? prismaSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
