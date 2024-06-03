import bcrypt from "bcrypt";
import { sql } from "drizzle-orm";
import { string, z } from "zod";
import { ulid } from "ulid";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { companies } from "~/server/db/schema";
export const companyRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const branchId = ulid();

      const exist = await ctx.db
        .select()
        .from(companies)
        .where(sql`${companies.email} = ${input.email}`);

      if (exist.length > 0) throw new Error("บริษัทนี้มีอยู่แล้วในระบบ");
      const hashedPassword = await bcrypt.hash(input.password, 10);
      await ctx.db.insert(companies).values({
        id: branchId,
        email: input.email,
        password: hashedPassword,
        status: "pending",
      });
      return { email: input.email, password: input.password };
    }),

  get: protectedProcedure
    .input(z.object({ id: string() }))
    .query(async ({ ctx, input }) => {
      const company = await ctx.db
        .select()
        .from(companies)
        .where(sql`${companies.id} = ${input.id}`);
      return company[0];
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
