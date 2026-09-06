import { randomUUID } from "node:crypto";
import { z } from "zod";
import { sendBookingConfirmationEmail } from "@/lib/mailtrap";
import {
  list,
  save,
  transaction,
  publicRooms,
  localPreview,
  lockRoomInventory,
  roomMatches,
} from "@/lib/platform/store";
import { requireAdmin, newToken } from "@/lib/platform/auth";
import { errorResponse } from "@/lib/platform/validation";
const input = z.object({
  roomId: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1),
  guestName: z.string().trim().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().trim().min(7),
  specialRequests: z.string().max(2000).default(""),
  paymentMethod: z.enum(["Bank Transfer", "Pay at Hotel"]),
  selectedAddOns: z
    .array(z.enum(["chauffeur-rr", "tarmac-escort", "private-chef"]))
    .default([]),
  agentCode: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{2,40}$/)
    .optional(),
  visitorId: z.string().max(100).optional(),
});
const addOns = {
  "chauffeur-rr": 150000,
  "tarmac-escort": 75000,
  "private-chef": 90000,
};
export async function GET() {
  try {
    await requireAdmin();
    return Response.json({
      success: true,
      data: (await list("bookings")).map(({ lookupToken, ...b }) => b),
    });
  } catch (e) {
    return errorResponse(e);
  }
}
export async function POST(req: Request) {
  try {
    const body = input.parse(await req.json());
    const result = await transaction(async () => {
      const room = (await publicRooms()).find(
        (r) => roomMatches(r, body.roomId),
      );
      if (!room) throw new Error("This room is not available for reservation");
      const checkIn = new Date(body.checkIn),
        checkOut = new Date(body.checkOut);
      const nights = (checkOut.getTime() - checkIn.getTime()) / 86400000;
      if (
        Number.isNaN(checkIn.getTime()) ||
        Number.isNaN(checkOut.getTime()) ||
        checkIn.toISOString().slice(0, 10) !== body.checkIn ||
        checkOut.toISOString().slice(0, 10) !== body.checkOut ||
        !Number.isInteger(nights) ||
        nights < 1 ||
        nights > 365 ||
        body.checkIn < new Date().toISOString().slice(0, 10)
      )
        throw new Error(
          "Choose a future check-in and a check-out at least one night later (maximum 365 nights)",
        );
      if (body.adults > room.maxGuests)
        throw new Error(
          `This room accommodates up to ${room.maxGuests} guests`,
        );
      // A reservation is a request until payment is confirmed; it does not silently consume inventory.
      const subtotal =
        room.pricePerNight * nights +
        [...new Set(body.selectedAddOns)].reduce(
          (sum, id) => sum + addOns[id],
          0,
        );
      const taxesAndFees =
        Math.round(subtotal * 0.075) + Math.round(subtotal * 0.05);
      const booking = {
        ...body,
        id: `book-${randomUUID()}`,
        bookingRef: `SC-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        propertyId: room.propertyId,
        roomId: room.id,
        roomName: room.name,
        nights,
        children: 0,
        country: "Nigeria",
        subtotal,
        taxesAndFees,
        discountAmount: 0,
        totalPrice: subtotal + taxesAndFees,
        status: "Pending",
        paymentStatus: "Unpaid",
        createdAt: new Date().toISOString(),
        lookupToken: newToken(),
      };
      return save("bookings", booking);
    });
    let emailSent = false;
    if (!localPreview) {
      try {
        emailSent = (await sendBookingConfirmationEmail(result)).success;
      } catch {}
    }
    return Response.json(
      { success: true, data: result, emailSent },
      { status: 201 },
    );
  } catch (e) {
    return errorResponse(e);
  }
}
export async function PATCH(req: Request) {
  try {
    await requireAdmin();
    const { id, action } = await req.json();
    if (action !== "confirm-payment")
      throw new Error("Unsupported booking action");
    const data = await transaction(async () => {
      const bookings = await list("bookings");
      const booking = bookings.find((b) => b.id === id);
      if (!booking) throw new Error("Booking not found");
      if (booking.paymentStatus === "Paid") return booking;
      if (["Cancelled", "Refunded", "Checked Out"].includes(booking.status))
        throw new Error("Payment cannot be confirmed for this booking status");
      const room = (await publicRooms()).find((r) => roomMatches(r, booking.roomId));
      if (!room)
        throw new Error(
          "The room is no longer published. Review the property before confirming.",
        );
      await lockRoomInventory(room);
      // Check occupied units separately for every night, allowing back-to-back stays.
      for (
        let day = new Date(booking.checkIn);
        day < new Date(booking.checkOut);
        day.setUTCDate(day.getUTCDate() + 1)
      ) {
        const date = day.toISOString().slice(0, 10);
        const occupied = bookings.filter(
          (b) =>
            b.id !== booking.id &&
            roomMatches(room, b.roomId) &&
            ["Confirmed", "Checked In"].includes(b.status) &&
            b.checkIn <= date &&
            b.checkOut > date,
        ).length;
        if (occupied >= (room.numberOfUnits || 1))
          throw new Error(
            `No units available on ${date}. Resolve the inventory conflict before confirming payment.`,
          );
      }
      return save("bookings", {
        ...booking,
        status: "Confirmed",
        paymentStatus: "Paid",
        paymentConfirmedAt: new Date().toISOString(),
        paymentConfirmedBy: "Administrator",
      });
    });
    const { lookupToken, ...booking } = data;
    return Response.json({ success: true, data: booking });
  } catch (e) {
    return errorResponse(e);
  }
}
