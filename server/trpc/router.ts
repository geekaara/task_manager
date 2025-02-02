// server/trpc/router.ts
import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import type { Task } from "@/types/task";

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const appRouter = router({
  getTasks: publicProcedure.query(async ({ ctx }): Promise<Task[]> => {
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
    .mutation(async ({ ctx, input }): Promise<Task> => {
      return ctx.prisma.task.create({
        data: input,
      });
    }),

  toggleTask: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }): Promise<Task> => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),
});

export type AppRouter = typeof appRouter;
