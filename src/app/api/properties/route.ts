import { NextResponse } from "next/server";
import {
  list,
  save,
  remove,
  transaction,
  publicProperties,
} from "@/lib/platform/store";
import { requireAdmin } from "@/lib/platform/auth";
import {
  propertyInput,
  amenityObjects,
  errorResponse,
} from "@/lib/platform/validation";
import { randomUUID } from "node:crypto";
export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams;
    const manage = query.get("manage") === "true";
    if (manage) await requireAdmin();
    let properties = manage
      ? await list("properties")
      : await publicProperties();
    const location = (query.get("location") || query.get("city") || "")
      .trim()
      .toLowerCase();
    if (location)
      properties = properties.filter((p) =>
        [p.city, p.area, p.address, p.name]
          .join(" ")
          .toLowerCase()
          .includes(location),
      );
    if (query.get("category"))
      properties = properties.filter(
        (p) => p.category === query.get("category"),
      );
    return NextResponse.json({ success: true, data: properties });
  } catch (e) {
    return errorResponse(e);
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin();
    const input = propertyInput.parse(await request.json());
    const property = {
      ...input,
      id: `prop-${randomUUID()}`,
      slug: `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${randomUUID().slice(0, 6)}`,
      amenities: amenityObjects(input.amenities),
      published: true,
      isVerified: true,
      verificationStatus: "Approved",
      coordinates: { lat: 0, lng: 0 },
      policies: {
        checkInTime: "3:00 PM",
        checkOutTime: "12:00 PM",
        cancellation: "Contact the property for cancellation terms.",
        petsAllowed: false,
        smokingAllowed: false,
      },
    };
    return NextResponse.json({
      success: true,
      data: await transaction(async () => {
        const saved = await save("properties", property);
        if (property.propertyType !== "Hotel") {
          const directRoom = {
            id: `room-${saved.id}`,
            slug: saved.slug,
            name: saved.name,
            tagline: saved.tagline || saved.name,
            propertyId: saved.id,
            type: "Executive" as const,
            address: saved.address,
            city: saved.city,
            numberOfUnits: saved.numberOfUnits || 1,
            badge: "Direct Apartment",
            maxGuests: saved.maxGuests || 2,
            propertySize: saved.propertySize || 0,
            bedrooms: saved.bedrooms || 1,
            bathrooms: saved.bathrooms || 1,
            pricePerNight: saved.pricingStartingFrom || 100000,
            weekendPricePerNight: saved.pricingStartingFrom || 100000,
            holidayPricePerNight: saved.pricingStartingFrom || 100000,
            rating: 5,
            reviewCount: 0,
            ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
            description: saved.description,
            heroImage: saved.heroImage,
            gallery: saved.gallery,
            amenities: (saved.amenities || []).map((a: any) => typeof a === "string" ? a : a.name),
            features: {
              bedType: "", view: "", floor: "", balcony: false, workspace: false,
              miniBar: false, coffeeMachine: false, smartTV: false, netflix: false,
              wifi: false, safe: false, closet: false, hairDryer: false,
              refrigerator: false, cable: false, roomService: false, housekeeping: false,
            },
            published: true,
            featured: true,
          };
          await save("rooms", directRoom);
        }
        return saved;
      }),
    });
  } catch (e) {
    return errorResponse(e);
  }
}
export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = await transaction(async () => {
      const property = (await list("properties")).find((p) => p.id === body.id);
      if (!property) throw new Error("Property not found");
      if (body.action === "delete") {
        const aliases = [property.id, String(property._id || ""), property.slug];
        if ((await list("bookings")).some(b => aliases.includes(b.propertyId) && !["Cancelled", "Refunded", "Checked Out"].includes(b.status) && b.checkOut >= new Date().toISOString().slice(0, 10)))
          throw new Error("Resolve upcoming reservations before deleting this property");
        await remove("properties", property.id);
        const rooms = (await list("rooms")).filter(r => aliases.includes(String(r.propertyId)));
        for (const rm of rooms) {
          await remove("rooms", rm.id);
        }
        return { deleted: true, id: property.id };
      } else if (body.action === "archive") {
        const aliases = [property.id, String(property._id || ""), property.slug];
        if ((await list("bookings")).some(b => aliases.includes(b.propertyId) && !["Cancelled", "Refunded", "Checked Out"].includes(b.status) && b.checkOut >= new Date().toISOString().slice(0, 10)))
          throw new Error("Resolve upcoming reservations before archiving this property");
        property.archivedAt = new Date().toISOString();
        property.published = false;
        property.isVerified = false;
      } else if (body.action === "approve" || body.action === "publish") {
        property.verificationStatus = "Approved";
        property.published = true;
        property.isVerified = true;
        property.reviewedAt = new Date().toISOString();
        property.reviewedBy = "Administrator";
        if (body.reviewNote) property.reviewNote = String(body.reviewNote).slice(0, 2000);
        if (property.partnerId) {
          const partner = (await list("partners")).find(
            (p) => p.partnerId === property.partnerId,
          );
          if (partner)
            await save("partners", {
              ...partner,
              status: "Approved",
            });
        }
      } else if (body.action === "unpublish") {
        property.published = false;
        property.verificationStatus = "Unpublished";
      } else if (body.action === "changes") {
        if (!body.reviewNote?.trim())
          throw new Error("Add a reason so the partner knows what to change");
        property.verificationStatus = "Changes Required";
        property.published = false;
        property.isVerified = false;
        property.reviewNote = String(body.reviewNote || "").slice(0, 2000);
        property.reviewedAt = new Date().toISOString();
        property.reviewedBy = "Administrator";
        if (property.partnerId) {
          const partner = (await list("partners")).find(
            (p) => p.partnerId === property.partnerId,
          );
          if (partner)
            await save("partners", {
              ...partner,
              status: "Rejected",
            });
        }
      } else if (body.action === "submit") {
        propertyInput.parse(property);
        property.verificationStatus = "Pending Verification";
        property.published = false;
        property.isVerified = false;
        property.submittedAt = new Date().toISOString();
      } else {
        const update = propertyInput.parse({ ...property, ...body });
        Object.assign(property, update, {
          amenities: amenityObjects(update.amenities),
        });
      }
      const saved = await save("properties", property);
      if (property.propertyType !== "Hotel") {
        const directRoom = {
          id: `room-${property.id}`,
          slug: property.slug,
          name: property.name,
          tagline: property.tagline || property.name,
          propertyId: property.id,
          type: "Executive" as const,
          address: property.address,
          city: property.city,
          numberOfUnits: property.numberOfUnits || 1,
          badge: "Direct Apartment",
          maxGuests: property.maxGuests || 2,
          propertySize: property.propertySize || 0,
          bedrooms: property.bedrooms || 1,
          bathrooms: property.bathrooms || 1,
          pricePerNight: property.pricingStartingFrom || 100000,
          weekendPricePerNight: property.pricingStartingFrom || 100000,
          holidayPricePerNight: property.pricingStartingFrom || 100000,
          rating: 5,
          reviewCount: 0,
          ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
          description: property.description,
          heroImage: property.heroImage,
          gallery: property.gallery,
          amenities: (property.amenities || []).map((a: any) => typeof a === "string" ? a : a.name),
          features: {
            bedType: "", view: "", floor: "", balcony: false, workspace: false,
            miniBar: false, coffeeMachine: false, smartTV: false, netflix: false,
            wifi: false, safe: false, closet: false, hairDryer: false,
            refrigerator: false, cable: false, roomService: false, housekeeping: false,
          },
          published: property.published ?? true,
          featured: true,
        };
        await save("rooms", directRoom);
      }
      return saved;
    });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const url = new URL(request.url);
    let id = url.searchParams.get("id");
    if (!id && request.headers.get("content-type")?.includes("application/json")) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }
    if (!id) throw new Error("Property ID is required");

    const data = await transaction(async () => {
      const property = (await list("properties")).find(
        (p) => p.id === id || p.slug === id || String(p._id) === id,
      );
      if (!property) throw new Error("Property not found");
      const aliases = [property.id, String(property._id || ""), property.slug];
      if (
        (await list("bookings")).some(
          (b) =>
            aliases.includes(b.propertyId) &&
            !["Cancelled", "Refunded", "Checked Out"].includes(b.status) &&
            b.checkOut >= new Date().toISOString().slice(0, 10),
        )
      ) {
        throw new Error(
          "Resolve upcoming reservations before deleting this property",
        );
      }
      await remove("properties", property.id);
      const rooms = (await list("rooms")).filter((r) =>
        aliases.includes(String(r.propertyId)),
      );
      for (const rm of rooms) {
        await remove("rooms", rm.id);
      }
      return { deleted: true, id: property.id };
    });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return errorResponse(e);
  }
}
