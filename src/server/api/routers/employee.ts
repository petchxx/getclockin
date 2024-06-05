import { sql } from "drizzle-orm";
import { z } from "zod";
import { ulid } from "ulid";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { companies, employees } from "~/server/db/schema";
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
  get: protectedProcedure.query(async ({ ctx }) => {
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

  signIn: publicProcedure
    .input(
      z.object({
        company_name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [company] = await ctx.db
        .select()
        .from(companies)
        .where(sql`${companies.name} = ${input.company_name}`);
      if (!company) throw new Error("ไม่พบชื่อบริษัท");

      const [employee] = await ctx.db
        .select()
        .from(employees)
        .where(
          sql`${employees.email} = ${input.email} AND ${employees.company_id} = ${company?.id} `,
        );
      if (!employee) throw new Error("ไม่พบผู้ใช้งาน");
      if (company?.app_password !== input.password)
        throw new Error("รหัสผ่านไม่ถูกต้อง");
      return employee;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
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
