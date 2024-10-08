import bcrypt from "bcrypt";
import { sql } from "drizzle-orm";
import { string, z } from "zod";
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
export const companyRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const companyId = ulid();

      const exist = await ctx.db
        .select()
        .from(companies)
        .where(sql`${companies.email} = ${input.email}`);

      if (exist.length > 0) throw new Error("บริษัทนี้มีอยู่แล้วในระบบ");
      const hashedPassword = await bcrypt.hash(input.password, 10);
      await ctx.db.insert(companies).values({
        id: companyId,
        email: input.email,
        password: hashedPassword,
        status: "pending",
      });
      return { email: input.email, password: input.password };
    }),

  register: protectedProcedure
    .input(
      z.object({
        //name is username like instagram username
        name: z
          .string()
          .min(3, { message: "Username must be at least 3 characters long" })
          .regex(/^[a-z0-9]+$/, {
            message: "Username can only contain lowercase letters and numbers",
          }),
        app_password: string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const company = await ctx.db
        .select()
        .from(companies)
        .where(sql`${companies.name} = ${input.name}`);
      if (company.length > 0) throw new Error("บริษัทนี้มีอยู่แล้วในระบบ");
      return await ctx.db
        .update(companies)
        .set({ name: input.name, app_password: input.app_password })
        .where(sql`${companies.id} = ${ctx.session.user.id}`);
    }),

  get: protectedProcedure.query(async ({ ctx, input }) => {
    const company = await ctx.db
      .select()
      .from(companies)
      .where(sql`${companies.id} = ${ctx.session.user.id}`);
    return company[0];
  }),

  getAllLeaves: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(leaves)
      .innerJoin(employees, sql`${leaves.employee_id} = ${employees.id}`)
      .where(sql`${employees.company_id} = ${ctx.session.user.id}`);
    return result.map((leave) => {
      return {
        ...leave.leave,
        employeeName: leave.employee.name,
        employeeEmail: leave.employee.email,
        employeeId: leave.employee.id,
      };
    });
  }),

  updateLeave: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["approved", "rejected"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(leaves)
        .set({ status: input.status })
        .where(sql`${leaves.id} = ${input.id}`);
    }),

  getAllOvertimes: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(overtimes)
      .innerJoin(employees, sql`${overtimes.employee_id} = ${employees.id}`)
      .where(sql`${employees.company_id} = ${ctx.session.user.id}`);
    return result.map((overtime) => {
      return {
        ...overtime.overtime,
        employeeName: overtime.employee.name,
        employeeEmail: overtime.employee.email,
        employeeId: overtime.employee.id,
      };
    });
  }),

  updateOvertime: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["approved", "rejected"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(overtimes)
        .set({ status: input.status })
        .where(sql`${overtimes.id} = ${input.id}`);
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
  //
  update: protectedProcedure
    .input(
      z.object({
        email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
        name: z.string(),
        line_token: z.string(),
        app_password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //set to only one that have values
      return await ctx.db
        .update(companies)
        .set({
          email: input.email,
          name: input.name,
          line_token: input.line_token,
          app_password: input.app_password,
        })
        .where(sql`${companies.id} = ${ctx.session.user.id}`);
    }),

  getHistory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        from: z.string(),
        to: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const clocksData = await ctx.db
        .select()
        .from(clocks)
        .where(
          sql`${clocks.employee_id} = ${input.id} AND ${clocks.date_time} >= ${input.from} AND ${clocks.date_time} <= ${input.to}`,
        );

      console.log(input.id);
      console.log(input.from);
      console.log(input.to);
      console.log("Clock Data");
      console.log(clocksData);
      return clocksData;
    }),

  updatePassword: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const company = await ctx.db
        .select()
        .from(companies)
        .where(sql`${companies.id} = ${ctx.session.user.id}`);
      if (!company[0]) throw new Error("บริษัทไม่มีอยู่ในระบบ");
      const comparePassword = await bcrypt.compare(
        input.oldPassword,
        company[0].password,
      );
      if (!comparePassword) throw new Error("รหัสผ่านเดิมไม่ถูกต้อง");
      const hashedPassword = await bcrypt.hash(input.newPassword, 10);
      return await ctx.db
        .update(companies)
        .set({ password: hashedPassword })
        .where(sql`${companies.id} = ${ctx.session.user.id}`);
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
