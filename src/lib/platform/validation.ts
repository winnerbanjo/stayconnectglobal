import { z } from "zod";
export const imageUrl = z
  .string()
  .max(2048)
  .refine(
    (v) =>
      /^\/uploads\/[a-zA-Z0-9.-]+$/.test(v) ||
      /^\/images\//.test(v) ||
      /^https:\/\//.test(v),
    "Upload a valid property image",
  );
export const propertyInput = z.object({
  name: z.string().trim().min(2),
  tagline: z.string().trim().default("A welcoming place to stay"),
  category: z
    .enum([
      "Luxury Hotel",
      "Serviced Apartment",
      "Luxury Residence",
      "Villa",
      "Shortlet",
      "Corporate Housing",
      "Resort",
      "Boutique Hotel",
    ])
    .default("Luxury Hotel"),
  address: z.string().trim().min(5),
  city: z.string().trim().min(2),
  area: z.string().trim().default(""),
  description: z.string().trim().min(20),
  numberOfUnits: z.coerce.number().int().min(1).max(100000).default(1),
  pricingStartingFrom: z.coerce.number().positive().default(100000),
  heroImage: imageUrl,
  gallery: z.array(imageUrl).min(1).max(40),
  amenities: z
    .array(
      z.union([
        z.string().trim().min(1).max(80),
        z.object({ name: z.string().trim().min(1).max(80) }),
      ]),
    )
    .max(50)
    .default([]),
  partnerId: z.string().optional(),
  hostName: z.string().optional(),
});
export function amenityObjects(values: any[]) {
  return values.map((v, i) => ({
    id: `amenity-${i}`,
    name: typeof v === "string" ? v : v.name,
    category: "general",
    icon: "CheckCircle2",
  }));
}
export function errorResponse(error: any) {
  const message =
    error instanceof z.ZodError
      ? error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
      : error.message || "Request failed";
  return Response.json(
    { success: false, error: message, message },
    { status: message.includes("sign-in") ? 401 : 400 },
  );
}
