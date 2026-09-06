import { NextResponse } from "next/server";
// Seed data is loaded only into the isolated local preview. Never drop existing collections.
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Destructive reseeding is disabled. Existing properties and bookings are preserved.",
    },
    { status: 405 },
  );
}
