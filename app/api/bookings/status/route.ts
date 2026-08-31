import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus, getBookingById } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { sendConfirmationEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    if (status !== "pending" && status !== "confirmed") {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const booking = await getBookingById(Number(id));
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const updated = await updateBookingStatus(Number(id), status);
    if (!updated) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Send confirmation email when a booking is confirmed
    let emailSent = false;
    if (status === "confirmed") {
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
      message: "Booking status updated",
      emailSent,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
