import { NextResponse } from "next/server";
import {
  list,
  save,
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
      published: false,
      isVerified: false,
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
    return NextResponse.json({
      success: true,
      data: await transaction(() => save("properties", property)),
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
      if (body.action === "approve" || body.action === "changes") {
        if (property.verificationStatus !== "Pending Verification")
          throw new Error("Only submitted properties can be reviewed");
        if (body.action === "changes" && !body.reviewNote?.trim())
          throw new Error("Add a reason so the partner knows what to change");
        property.verificationStatus =
          body.action === "approve" ? "Approved" : "Changes Required";
        property.published = body.action === "approve";
        property.isVerified = property.published;
        property.reviewNote = String(body.reviewNote || "").slice(0, 2000);
        property.reviewedAt = new Date().toISOString();
        property.reviewedBy = "Administrator";
        const partner = (await list("partners")).find(
          (p) => p.partnerId === property.partnerId,
        );
        if (partner)
          await save("partners", {
            ...partner,
            status: property.published ? "Approved" : "Rejected",
          });
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
      return save("properties", property);
    });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return errorResponse(e);
  }
}
