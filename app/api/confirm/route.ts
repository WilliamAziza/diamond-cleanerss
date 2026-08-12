import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error:
        "Payment confirmation is disabled. Bookings are confirmed from the admin dashboard.",
    },
    { status: 410 }
  );
}
