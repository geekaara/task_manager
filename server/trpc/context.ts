// server/trpc/context.ts
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { PrismaClient } from "@prisma/client";

interface CreateContextOptions {
  prisma?: PrismaClient;
}

const prisma = new PrismaClient();

export function createTRPCContext(_opts: FetchCreateContextFnOptions) {
  return {
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
