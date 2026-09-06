import { NextResponse } from "next/server";
import { randomUUID, createHash } from "node:crypto";
import { z } from "zod";
import { list, save, transaction } from "@/lib/platform/store";
import { newToken, requireAdmin } from "@/lib/platform/auth";
import {
  propertyInput,
  amenityObjects,
  errorResponse,
} from "@/lib/platform/validation";
export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json({
      success: true,
      data: (await list("partners")).map(({ accessTokenHash, ...p }) => p),
    });
  } catch (e) {
    return errorResponse(e);
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const contact = z
      .object({
        businessName: z.string().trim().min(2),
        contactName: z.string().trim().min(2),
        email: z.string().email(),
        phone: z.string().trim().min(7),
      })
      .parse(body);
    const input = propertyInput.parse({
      ...body,
      name: body.propertyName,
      category:
        body.propertyType === "Hotel" ? "Luxury Hotel" : body.propertyType,
      pricingStartingFrom: body.expectedRate,
      heroImage: body.images?.[0],
      gallery: body.images,
    });
    const partnerId = `PART-${randomUUID().slice(0, 8).toUpperCase()}`;
    const propertyId = `prop-${randomUUID()}`;
    const accessToken = newToken();
    const partner = {
      ...contact,
      id: partnerId,
      partnerId,
      propertyId,
      accessTokenHash: createHash("sha256").update(accessToken).digest("hex"),
      propertyType: body.propertyType,
      propertyName: input.name,
      address: input.address,
      city: input.city,
      numberOfUnits: input.numberOfUnits,
      amenities: input.amenities,
      images: input.gallery,
      expectedRate: input.pricingStartingFrom,
      description: input.description,
      status: "Pending",
      commissionRate: 12,
      createdAt: new Date().toISOString(),
    };
    const property = {
      ...input,
      id: propertyId,
      partnerId,
      hostName: contact.businessName,
      slug: `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${partnerId.slice(-8).toLowerCase()}`,
      amenities: amenityObjects(input.amenities),
      isVerified: false,
      published: false,
      verificationStatus: "Draft",
      coordinates: { lat: 0, lng: 0 },
      policies: {
        checkInTime: "3:00 PM",
        checkOutTime: "12:00 PM",
        cancellation: "Contact the property for cancellation terms.",
        petsAllowed: false,
        smokingAllowed: false,
      },
    };
    await transaction(async () => {
      await save("properties", property);
      await save("partners", partner);
    });
    return NextResponse.json(
      { success: true, data: { partnerId, propertyId, accessToken } },
      { status: 201 },
    );
  } catch (e) {
    return errorResponse(e);
  }
}
