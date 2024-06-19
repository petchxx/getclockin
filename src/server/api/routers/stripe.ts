import { z } from "zod";
import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createCheckoutSession: protectedProcedure
    .input(z.object({ priceId: z.string(), companyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input.priceId);

      const host = ctx.headers.get("host");

      const baseUrl =
        env.NODE_ENV === "development"
          ? `http://${host ?? "localhost:3000"}`
          : `https://${host ?? env.NEXTAUTH_URL}`;

      const session = await ctx.stripe.checkout.sessions.create({
        metadata: {
          companyId: ctx.session.user?.id,
        },
        customer_email: ctx.session.user?.email ?? "",
        payment_method_types: ["card"],
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        subscription_data: {
          // trial_period_days: input.isTrial ? 30 : undefined,
          metadata: {
            companyId: ctx.session.user.id,
          },
        },
        success_url: `${baseUrl}/dashboard?success=true`,
        cancel_url: `${baseUrl}/dashboard?canceled=true`,
      });
      return { url: session.url };
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
