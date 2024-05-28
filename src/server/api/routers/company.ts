import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { companies } from "~/server/db/schema";

export const companyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        company_key: z.string(),
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        app_password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(companies).values({
        company_key: input.company_key,
        name: input.name,
        email: input.email,
        password: input.password,
        app_password: input.app_password,
        status: "pending",
      });
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
