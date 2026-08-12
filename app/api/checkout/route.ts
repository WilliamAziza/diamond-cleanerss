import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Booking requests are handled directly through the booking form. Payment checkout is disabled.",
    },
    { status: 410 }
  );
}
