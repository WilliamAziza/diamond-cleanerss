import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateBookingStatus, getBookingById } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/mailer";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
      return NextResponse.json(
        { error: "No booking associated with this payment" },
        { status: 400 }
      );
    }

    // Confirm the booking
    const confirmed = updateBookingStatus(Number(bookingId), "confirmed");
    if (!confirmed) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Send confirmation email
    const booking = getBookingById(Number(bookingId));
    let emailSent = false;
    if (booking) {
      emailSent = await sendConfirmationEmail({
        name: booking.name,
        email: booking.email,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        address: booking.address,
        id: booking.id,
      });
    }

    return NextResponse.json({
      message: "Booking confirmed",
      bookingId: Number(bookingId),
      emailSent,
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: "Could not verify payment" },
      { status: 500 }
    );
  }
}
