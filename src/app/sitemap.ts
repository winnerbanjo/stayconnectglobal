import type { MetadataRoute } from "next";
import {
  publicProperties,
  publicRooms,
  localPreview,
} from "@/lib/platform/store";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (localPreview || !process.env.NEXT_PUBLIC_SITE_URL) return [];
  const base = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const properties = await publicProperties();
  const rooms = await publicRooms();
  return [
    "",
    "/properties",
    "/flights",
    "/about",
    "/contact",
    ...properties.map((p) => `/properties/${p.slug}`),
    ...rooms.map((r) => `/rooms/${r.slug}`),
  ].map((route) => ({ url: `${base}${route}` }));
}
