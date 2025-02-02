// server/trpc/router.ts
import { router, publicProcedure } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getTasks: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  createTask: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: input,
      });
    }),

  toggleTask: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),
});

export type AppRouter = typeof appRouter;
