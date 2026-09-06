import { createHash } from "node:crypto";
import { list, save, transaction } from "@/lib/platform/store";
import {
  propertyInput,
  amenityObjects,
  errorResponse,
} from "@/lib/platform/validation";
async function owner(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  const hash = createHash("sha256").update(token).digest("hex");
  const partner = (await list("partners")).find(
    (p) => p.accessTokenHash === hash,
  );
  if (!partner)
    throw new Error("Partner sign-in required. Use your private access key.");
  return partner;
}
export async function GET(req: Request) {
  try {
    const partner = await owner(req);
    const properties = (await list("properties")).filter(
      (p) => p.partnerId === partner.partnerId,
    );
    const bookings = (await list("bookings"))
      .filter((b) => properties.some((p) => p.id === b.propertyId))
      .map(({ lookupToken, ...b }) => b);
    return Response.json({
      success: true,
      data: { properties, bookings, businessName: partner.businessName },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
export async function PATCH(req: Request) {
  try {
    const partner = await owner(req);
    const body = await req.json();
    const property = await transaction(async () => {
      const property = (await list("properties")).find(
        (p) => p.id === body.id && p.partnerId === partner.partnerId,
      );
      if (!property) throw new Error("Property not found");
      if (property.verificationStatus === "Pending Verification")
        throw new Error(
          "This property is under review. Please wait for a decision.",
        );
      if (body.action === "submit") {
        propertyInput.parse(property);
        property.verificationStatus = "Pending Verification";
        property.submittedAt = new Date().toISOString();
      } else {
        const input = propertyInput
          .omit({ partnerId: true, hostName: true })
          .parse({ ...property, ...body });
        Object.assign(property, input, {
          amenities: amenityObjects(input.amenities),
          verificationStatus: "Draft",
        });
      }
      property.published = false;
      property.isVerified = false;
      return save("properties", property);
    });
    return Response.json({ success: true, data: property });
  } catch (e) {
    return errorResponse(e);
  }
}
