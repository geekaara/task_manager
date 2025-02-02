// server/trpc/context.ts
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { prisma } from "@/server/db";

export function createTRPCContext(_opts: FetchCreateContextFnOptions) {
  return { prisma };
}
