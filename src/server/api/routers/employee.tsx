import bcrypt from "bcrypt";
import { sql } from "drizzle-orm";
import { string, z } from "zod";
import { ulid } from "ulid";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { employees } from "~/server/db/schema";
export const employeeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        company_id: z.string(),
        email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
        name: z.string(),
        phone: z.string(),
        role: z.string(),
        salary: z.string(),
        off_days: z.array(z.string()),
        start_time: z.string(),
        stop_time: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const employeeId = ulid();
      await ctx.db.insert(employees).values({
        id: employeeId,
        company_id: input.company_id,
        email: input.email,
        name: input.name,
        phone: input.phone,
        role: input.role,
        salary: input.salary,
        status: "out",
        off_days: input.off_days,
        start_time: input.start_time,
        stop_time: input.stop_time,
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: string() }))
    .query(async ({ ctx, input }) => {
      const employee = await ctx.db
        .select()
        .from(employees)
        .where(sql`${employees.company_id} = ${input.id}`);
      return employee;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
