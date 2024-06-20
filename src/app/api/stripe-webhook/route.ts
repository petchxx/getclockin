import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "~/server/stripe/client";
import { env } from "~/env";
import { handle } from "~/server/stripe/webhook-handle";
export async function GET() {
  return NextResponse.json({ message: "success" });
}
export async function POST(request: NextRequest) {
  console.log("Webhook received");

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");
    // for test
    // const signature = stripe.webhooks.generateTestHeaderString({
    //   payload: rawBody,
    //   secret: env.STRIPE_SECRET_KEY,
    // });
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        env.STRIPE_WEBHOOK_SECRET,
      );
      await handle(event);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Webhook signature verification failed: ${error.message}`,
        );
        return NextResponse.json(
          { statusCode: 400, message: "Webhook Error" },
          { status: 400 },
        );
      }
    }
    return NextResponse.json({ statusCode: 200, message: "success" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  // ตัวอย่างเก็บ event ลงใน database
  // await prisma.stripeEvent.create({
  //   data: {
  //     id: event.id,
  //     type: event.type,
  //     object: event.object,
  //     api_version: event.api_version,
  //     account: event.account,
  //     created: new Date(event.created * 1000), // convert to milliseconds
  //     data: {
  //       object: event.data.object,
  //       previous_attributes: event.data.previous_attributes,
  //     },
  //     livemode: event.livemode,
  //     pending_webhooks: event.pending_webhooks,
  //     request: {
  //       id: event.request?.id,
  //       idempotency_key: event.request?.idempotency_key,
  //     },
  //   },
  // });
}
