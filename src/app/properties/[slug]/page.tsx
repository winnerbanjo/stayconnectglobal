import React from "react";
import { notFound } from "next/navigation";
import { publicProperties, publicRooms } from "@/lib/platform/store";
import AirbnbPropertyDetailView from "@/components/airbnb/AirbnbPropertyDetailView";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prop = (await publicProperties()).find((p) => p.slug === slug);
  if (!prop) return { title: "Property not found | Stay Connect Global" };
  return {
    title: `${prop.name} | Stay Connect Global`,
    description: prop.description,
  };
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { slug } = await params;
  const prop = (await publicProperties()).find((p) => p.slug === slug);
  if (!prop) notFound();

  const requested = await searchParams;
  const propertyRooms = (await publicRooms()).filter(
    (r) => r.propertyId === prop.id
  );

  return (
    <>
      {/* Schema.org LodgingBusiness metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: prop.name,
            description: prop.description,
            image: prop.gallery,
            address: {
              "@type": "PostalAddress",
              streetAddress: prop.address,
              addressLocality: prop.city,
              addressCountry: "NG",
            },
            amenityFeature: prop.amenities.map((a: any) => ({
              "@type": "LocationFeatureSpecification",
              name: a.name,
              value: true,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <AirbnbPropertyDetailView
        property={prop}
        rooms={propertyRooms}
        initialCheckIn={requested.checkIn}
        initialCheckOut={requested.checkOut}
        initialGuests={Number(requested.guests) || 2}
      />
    </>
  );
}
