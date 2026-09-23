import { NextResponse } from "next/server";
import { Room } from "@/types";
import { list, save, transaction, publicRooms, lockRoomInventory, roomMatches } from "@/lib/platform/store";
import { requireAdmin } from "@/lib/platform/auth";
import { errorResponse, imageUrl } from "@/lib/platform/validation";
import { z } from "zod";
import { randomUUID } from "node:crypto";


export async function GET(request: Request) {
  try {
    const manage = new URL(request.url).searchParams.get("manage") === "true";
    if (manage) await requireAdmin();
    return NextResponse.json({
      success: true,
      data: manage ? await list("rooms") : await publicRooms(),
    });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    z.object({
      name: z.string().trim().min(2),
      propertyId: z.string().min(1),
      pricePerNight: z.coerce.number().positive(),
      numberOfUnits: z.coerce.number().int().min(1).max(100000).optional(),
      heroImage: imageUrl,
      gallery: z.array(imageUrl).min(1).max(40),
    }).parse(body);
    const property = (await list("properties")).find(
      (p) => p.id === body.propertyId,
    );
    if (!property) throw new Error("Select a valid property");
    const slug =
      body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newRoomData: Room = {
      id: `room-${randomUUID()}`,
      slug,
      name: body.name,
      tagline: body.tagline || body.name,
      propertyId: property.id,
      type: body.type || "Executive",
      address: body.address || property.address,
      city: property.city,
      numberOfUnits: Number(body.numberOfUnits) || 1,
      badge: "",
      maxGuests: Number(body.maxGuests) || 2,
      propertySize: Number(body.propertySize) || 0,
      bedrooms: Number(body.bedrooms) || 1,
      bathrooms: Number(body.bathrooms) || 1,
      pricePerNight: Number(body.pricePerNight),
      weekendPricePerNight: Number(body.weekendPricePerNight) || Number(body.pricePerNight),
      holidayPricePerNight: Number(body.holidayPricePerNight) || Number(body.pricePerNight),
      rating: 0,
      reviewCount: 0,
      ratingBreakdown: {
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      },
      description: body.description?.trim() || `${body.name} at ${property.name}.`,
      heroImage: body.heroImage || "/images/saffron/saffron-1.jpg",
      gallery: body.gallery || [
        body.heroImage || "/images/saffron/saffron-1.jpg",
      ],
      amenities: body.amenities || [],
      features: {
        bedType: "", view: "", floor: "", balcony: false, workspace: false,
        miniBar: false, coffeeMachine: false, smartTV: false, netflix: false,
        wifi: false, safe: false, closet: false, hairDryer: false,
        refrigerator: false, cable: false, roomService: false, housekeeping: false,
      },
      published: true,
      featured: true,
    };

    return NextResponse.json({
      success: true,
      data: await transaction(() => save("rooms", newRoomData)),
    });
  } catch (error: any) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = await transaction(async () => {
      const room = (await list("rooms")).find((r) => r.id === body.id);
      if (!room) throw new Error("Room not found");
      if (body.action === "archive") {
        if ((await list("bookings")).some(b => roomMatches(room, b.roomId) &&
          !["Cancelled", "Refunded", "Checked Out"].includes(b.status) && b.checkOut >= new Date().toISOString().slice(0, 10)))
          throw new Error("Resolve upcoming reservations before archiving this room");
        await lockRoomInventory(room);
        return save("rooms", { ...room, published: false, archivedAt: new Date().toISOString() });
      }
      if (body.action === "clear-reviews") {
        return save("rooms", { ...room, rating: 0, reviewCount: 0,
          ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 } });
      }
      const update = z
        .object({
          numberOfUnits: z.coerce.number().int().min(1).max(100000),
          pricePerNight: z.coerce.number().positive(),
          gallery: z.array(imageUrl).min(1).max(40),
          heroImage: imageUrl,
          amenities: z.array(z.string().trim().min(1).max(80)).max(50),
        })
        .partial()
        .parse(body);
      await lockRoomInventory(room);
      return save("rooms", { ...room, ...update });
    });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return errorResponse(e);
  }
}
