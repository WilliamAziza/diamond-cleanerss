import { NextRequest, NextResponse } from "next/server";
import { getServicePrice, getStripeClient } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, address, notes } = body;

    if (!name || !email || !phone || !service || !date || !time || !address) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL;
    if (!origin) {
      return NextResponse.json(
        { error: "The site URL is not configured." },
        { status: 500 }
      );
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: `${service} booking` },
            unit_amount: getServicePrice(service),
          },
          quantity: 1,
        },
      ],
      metadata: {
        name,
        email,
        phone,
        service,
        date,
        time,
        address,
        notes: notes || "",
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Payment could not be started. Please try again." },
      { status: 500 }
    );
  }
}
