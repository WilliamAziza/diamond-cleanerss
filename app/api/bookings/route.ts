import { NextRequest, NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, address, notes } = body;

    // Basic validation
    if (!name || !email || !phone || !service || !date || !address) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const booking = await createBooking({
      name,
      email,
      phone,
      service,
      date,
      time: time || "Morning (8am - 12pm)",
      address,
      notes: notes || "",
    });

    return NextResponse.json(
      { message: "Booking created successfully", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Admin only
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await getAllBookings();
  return NextResponse.json({ bookings });
}
