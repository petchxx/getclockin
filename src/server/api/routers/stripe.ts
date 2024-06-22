import { sql } from "drizzle-orm/sql";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { companies } from "~/server/db/schema";

export const stripeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
        companyId: z.string(),
        isTrial: z.boolean(),
      }),
    )
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
          trial_period_days: input.isTrial ? 30 : undefined,
          metadata: {
            companyId: ctx.session.user.id,
          },
        },
        success_url: `${baseUrl}/dashboard?success=true`,
        cancel_url: `${baseUrl}/dashboard?canceled=true`,
      });
      return { url: session.url };
    }),

  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const companyId = ctx.session.user?.id;
    const company = await ctx.db
      .select()
      .from(companies)
      .where(sql`${companies.id} = ${companyId}`);

    if (company.length > 0) {
      const subscription = await ctx.stripe.subscriptions.retrieve(
        company[0]?.stripe_subscription_id ?? "",
      );
      return subscription;
    }
    return null;
  }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const companyId = ctx.session.user?.id;
    const company = await ctx.db
      .select()
      .from(companies)
      .where(sql`${companies.id} = ${companyId}`);

    if (company.length > 0) {
      const cancel = await ctx.stripe.subscriptions.update(
        company[0]?.stripe_subscription_id ?? "",
        {
          cancel_at_period_end: true,
        },
      );
      await ctx.db
        .update(companies)
        .set({
          status: "canceled",
        })
        .where(sql`${companies.id} = ${companyId}`);
      revalidatePath("/");
      return cancel;
    }
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
