import { list } from "@/lib/platform/store";
import { errorResponse } from "@/lib/platform/validation";
export async function POST(req: Request) {
  try {
    const { bookingRef, token } = await req.json();
    const booking = (await list("bookings")).find(
      (b) => b.bookingRef === bookingRef && token && b.lookupToken === token,
    );
    if (!booking)
      return Response.json(
        {
          error:
            "Reservation not found. Check your reference and private access key.",
        },
        { status: 404 },
      );
    const { guestEmail, guestPhone, lookupToken, ...safe } = booking;
    return Response.json({ success: true, data: safe });
  } catch (e) {
    return errorResponse(e);
  }
}
