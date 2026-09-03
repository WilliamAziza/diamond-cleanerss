import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/db";
import { getStripeClient } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Payment session is required." }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment has not completed." }, { status: 402 });
    }

    const metadata = session.metadata || {};
    const booking = await createBooking({
      name: metadata.name,
      email: metadata.email,
      phone: metadata.phone,
      service: metadata.service,
      date: metadata.date,
      time: metadata.time,
      address: metadata.address,
      notes: metadata.notes || "",
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json({ error: "Payment confirmation failed." }, { status: 500 });
  }
}
