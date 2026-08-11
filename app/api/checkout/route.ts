import { NextRequest, NextResponse } from "next/server";
import { stripe, getServicePrice } from "@/lib/stripe";
import { createBooking, deleteBooking } from "@/lib/db";

export async function POST(request: NextRequest) {
  let bookingId: number | null = null;
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, address, notes } = body;

    // Validation
    if (!name || !email || !phone || !service || !date || !address) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const timeLabel =
      time === "morning"
        ? "Morning (8am - 12pm)"
        : time === "afternoon"
        ? "Afternoon (12pm - 5pm)"
        : "Evening (5pm - 8pm)";

    const amount = getServicePrice(service);
    const baseUrl = process.env.NEXTAUTH_URL || request.nextUrl.origin;

    // Save the booking first (pending payment)
    const booking = createBooking({
      name,
      email,
      phone,
      service,
      date,
      time: timeLabel,
      address,
      notes: notes || "",
    });
    bookingId = booking.id;

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: service,
              description: `${service} booking on ${date} at ${timeLabel}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        bookingId: String(booking.id),
        name,
        phone,
        service,
        date,
        time: timeLabel,
        address,
        notes: notes || "",
      },
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    if (bookingId) {
      deleteBooking(bookingId);
    }
    return NextResponse.json(
      { error: "Payment could not be processed. Please try again." },
      { status: 500 }
    );
  }
}
