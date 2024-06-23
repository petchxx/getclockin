import { sql } from "drizzle-orm";
import { z } from "zod";
import { ulid } from "ulid";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  clocks,
  companies,
  employees,
  leaves,
  overtimes,
} from "~/server/db/schema";
import { input } from "@nextui-org/react";
import { date } from "drizzle-orm/mysql-core";
export const employeeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
        name: z.string().min(1),
        phone: z.string().min(10),
        role: z.string().min(1),
        salary: z.string(),
        off_days: z.array(z.string()),
        start_time: z.string().min(1),
        stop_time: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const employeeId = ulid();
      //check if employee exist
      const exist = await ctx.db
        .select()
        .from(employees)
        .where(
          sql`${employees.email} = ${input.email} AND ${employees.company_id} = ${ctx.session.user.id}`,
        );
      if (exist.length > 0) throw new Error("พนักงานคนนี้มีอยู่แล้วในระบบ");

      return await ctx.db
        .insert(employees)
        .values({
          id: employeeId,
          company_id: ctx.session?.user.id,
          email: input.email,
          name: input.name,
          phone: input.phone,
          role: input.role,
          salary: parseInt(input.salary),
          off_days: input.off_days,
          start_time: input.start_time,
          stop_time: input.stop_time,
          status: "out",
        })
        .returning();
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(employees)
      .where(sql`${employees.company_id} = ${ctx.session.user.id}`);
    return result;
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .delete(employees)
        .where(
          sql`${employees.id} = ${input.id} AND ${employees.company_id} = ${ctx.session.user.id}`,
        );
      return result;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
        name: z.string().min(1),
        phone: z.string().min(10),
        role: z.string().min(1),
        salary: z.string(),
        off_days: z.array(z.string()),
        start_time: z.string().min(1),
        stop_time: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(employees)
        .set({
          email: input.email,
          name: input.name,
          phone: input.phone,
          role: input.role,
          salary: parseInt(input.salary),
          off_days: input.off_days,
          start_time: input.start_time,
          stop_time: input.stop_time,
        })
        .where(
          sql`${employees.id} = ${input.id} AND ${employees.company_id} = ${ctx.session.user.id}`,
        );
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const [result] = await ctx.db
      .select()
      .from(employees)
      .where(sql`${employees.id} = ${ctx.session.user.id}`);
    return result;
  }),

  clock: protectedProcedure
    .input(
      z.object({
        status: z.string(),
        note: z.string(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const clockId = ulid();
      // Start transaction
      const update = await ctx.db.transaction(async (tx) => {
        // Insert clock entry
        await tx.insert(clocks).values({
          id: clockId,
          employee_id: ctx.session.user.id,
          status: input.status,
          note: input.note,
          location: input.location,
        });

        // Update employee status
        const [updatedEmployee] = await tx
          .update(employees)
          .set({
            status: input.status,
          })
          .where(sql`${employees.id} = ${ctx.session.user.id}`);

        return updatedEmployee;
      });

      return input.status;
    }),

  recentClock: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(clocks)
      .where(sql`${clocks.employee_id} = ${ctx.session.user.id}`)
      .orderBy(sql`${clocks.date_time} DESC`)
      .limit(3);
    return result;
  }),

  getLeaves: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(leaves)
        .where(sql`${leaves.employee_id} = ${ctx.session.user.id}`)
        .orderBy(sql`${leaves.created_at} DESC`)
        .limit(input.limit);
      return result;
    }),

  requestLeave: protectedProcedure
    .input(
      z.object({
        leave_type: z.string(),
        from: z.date(),
        to: z.date(),
        note: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const leaveId = ulid();
      const result = await ctx.db
        .insert(leaves)
        .values({
          id: leaveId,
          employee_id: ctx.session.user.id,
          leave_type: input.leave_type,
          from: input.from,
          to: input.to,
          status: "pending",
          note: input.note ?? "",
        })
        .returning();
      return result;
    }),

  getOvertime: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(overtimes)
        .where(sql`${overtimes.employee_id} = ${ctx.session.user.id}`)
        .orderBy(sql`${overtimes.created_at} DESC`)
        .limit(input.limit);
      return result;
    }),

  requestOvertime: protectedProcedure
    .input(
      z.object({
        note: z.string(),
        from: z.string(),
        to: z.string(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const overtimeId = ulid();
      const result = await ctx.db
        .insert(overtimes)
        .values({
          id: overtimeId,
          employee_id: ctx.session.user.id,
          date: input.date,
          from: input.from,
          to: input.to,
          status: "pending",
          note: input.note ?? "",
        })
        .returning();
      return result;
    }),

  getClocks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(clocks)
      .where(sql`${clocks.employee_id} = ${ctx.session.user.id}`)
      .orderBy(sql`${clocks.date_time} DESC`)
      .limit(60);
  }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //
  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),
  //
  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  // }),
  //
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
