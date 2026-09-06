import { NextResponse } from "next/server";
import { Room } from "@/types";
import { list, save, transaction, publicRooms, lockRoomInventory } from "@/lib/platform/store";
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
      tagline: body.tagline || "Luxury Executive Suite",
      propertyId: body.propertyId || "prop-lekki-1",
      type: body.type || "Executive",
      address: body.address || "14B, Providence Street, Lekki, Lagos",
      city: property.city,
      numberOfUnits: Number(body.numberOfUnits) || 1,
      badge: "TLC ⭐⭐⭐⭐⭐",
      maxGuests: Number(body.maxGuests) || 2,
      propertySize: Number(body.propertySize) || 150,
      bedrooms: Number(body.bedrooms) || 1,
      bathrooms: Number(body.bathrooms) || 1,
      pricePerNight: Number(body.pricePerNight) || 100000,
      weekendPricePerNight: Number(body.weekendPricePerNight) || 120000,
      holidayPricePerNight: Number(body.holidayPricePerNight) || 150000,
      rating: 5.0,
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
      amenities: body.amenities || [
        "WiFi",
        "Air Conditioning",
        "Smart TV",
        "Coffee Machine",
      ],
      features: {
        bedType: "King Size Pillow-top",
        view: "Lekki Skyline View",
        floor: "Executive Level",
        balcony: true,
        workspace: true,
        miniBar: true,
        coffeeMachine: true,
        smartTV: true,
        netflix: true,
        wifi: true,
        safe: true,
        closet: true,
        hairDryer: true,
        refrigerator: true,
        cable: true,
        roomService: true,
        housekeeping: true,
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
