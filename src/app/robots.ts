import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.STAYCONNECT_LOCAL_PREVIEW === "true" || !base)
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/partner", "/book", "/booking-status"],
    },
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
