import type Stripe from "stripe";
import { db } from "~/server/db";
import { sql } from "drizzle-orm/sql";
import { companies } from "../db/schema";

export async function handle(event: Stripe.Event) {
  console.log(event.type);
  switch (event.type) {
    case "invoice.paid":
      console.log(event.data.object);
      // Used to provision services after the trial has ended.
      // The status of the invoice will show up as paid. Store the status in your database to reference when a user accesses your service to avoid hitting rate limits.
      break;
    case "customer.subscription.created":
      console.log(event.data.object);
      await db
        .update(companies)
        .set({
          is_trial: false,
          status: "active",
          stripe_customer_id: event.data.object.customer as string,
          stripe_subscription_id: event.data.object.id,
        })
        .where(sql`${companies.id} = ${event.data.object.metadata.companyId}`);

      // Used to provision services as they are added to a subscription.
      break;
    case "customer.subscription.updated":
      console.log(event.data.object);
      // Used to provision services as they are updated.
      break;
    case "invoice.payment_failed":
      console.log(event.data.object);
      // If the payment fails or the customer does not have a valid payment method,
      //  an invoice.payment_failed event is sent, the subscription becomes past_due.
      // Use this webhook to notify your user that their payment has
      // failed and to retrieve new card details.
      // Can also have Stripe send an email to the customer notifying them of the failure. See settings: https://dashboard.stripe.com/settings/billing/automatic
      break;
    case "customer.subscription.deleted":
      console.log(event.data.object);
      // handle subscription cancelled automatically based
      // upon your subscription settings.
      break;
    default:
    // Unexpected event type
  }
}
