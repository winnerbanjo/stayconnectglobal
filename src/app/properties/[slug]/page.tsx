import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Shield,
  Anchor,
  Wind,
  Wifi,
} from "lucide-react";
import { publicProperties, publicRooms } from "@/lib/platform/store";
import { notFound } from "next/navigation";
import PropertyImageGallery from "@/components/properties/PropertyImageGallery";
export const dynamic = "force-dynamic";

function cleanDescription(desc: string = ""): string {
  if (!desc) return "";
  if (desc.includes("•")) {
    const parts = desc.split("•");
    const last = parts[parts.length - 1]?.trim();
    if (last && last.length > 30) {
      const sentenceMatch = last.match(/(?:(?:Hairdryer|Iron|Fridge|Toaster|Oven)\s+)?([A-Z].*)/);
      if (sentenceMatch && sentenceMatch[1]) {
        return sentenceMatch[1];
      }
      return last;
    }
  }
  return desc;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prop = (await publicProperties()).find((p) => p.slug === slug);
  if (!prop) return { title: "Property not found | Stay Connect" };
  return {
    title: `${prop.name} | Stay Connect Hotels`,
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
  const stayQuery = new URLSearchParams();
  for (const key of ["checkIn", "checkOut", "guests"])
    if (requested[key]) stayQuery.set(key, requested[key]!);
  const propertyRooms = (await publicRooms()).filter(
    (r) => r.propertyId === prop.id,
  );
  const isHotel = prop.propertyType === "Hotel" || (prop.category === "Luxury Hotel" && propertyRooms.length > 1);
  const isApartment = !isHotel;
  const bookingRoomSlug = propertyRooms[0]?.slug || prop.slug;
  const bookUrl = `/book?room=${encodeURIComponent(bookingRoomSlug)}&propertyId=${encodeURIComponent(prop.id)}${stayQuery.toString() ? `&${stayQuery}` : ""}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.35em] text-[#00AEEF] font-semibold">
              Hotel Destination • {prop.city}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              {prop.name}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 font-light">
              <MapPin className="w-4 h-4 text-[#00AEEF]" />
              <span>📍 {prop.address}</span>
            </div>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              {cleanDescription(prop.description)}
            </p>
          </div>

          {/* Hero Gallery */}
          <div className="relative h-[440px] md:h-[560px] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-[#E8E5DF]">
            <Image
              src={prop.heroImage}
              alt={prop.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="font-serif text-3xl">{prop.name}</div>
                <div className="text-xs text-[#00AEEF] uppercase tracking-widest mt-1">
                  {prop.tagline}
                </div>
              </div>
              {isApartment ? (
                <Link
                  href={bookUrl}
                  className="px-8 py-3.5 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl inline-flex items-center gap-2 self-start md:self-auto transition-transform active:scale-95"
                >
                  <span>Book Apartment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="#rooms"
                  className="px-8 py-3.5 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl inline-flex items-center gap-2 self-start md:self-auto"
                >
                  <span>Choose a Room</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Scrollable Photo Gallery */}
          <PropertyImageGallery
            propertyName={prop.name}
            images={prop.gallery}
            heroImage={prop.heroImage}
          />
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
          {/* Amenities & Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-[#111111]">
                Property Amenities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {prop.amenities.map((am: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-xs text-neutral-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0" />
                    <span>{am.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-[#111111]">
                Guest Policies & Hours
              </h3>
              <div className="space-y-3 text-xs text-neutral-700 font-light">
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span>Check-In Time</span>
                  <span className="font-medium text-[#111111]">
                    {prop.policies.checkInTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span>Check-Out Time</span>
                  <span className="font-medium text-[#111111]">
                    {prop.policies.checkOutTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span>Cancellation Policy</span>
                  <span className="font-medium text-[#111111]">
                    {prop.policies.cancellation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Apartment Reservation or Hotel Room Types */}
          {isApartment ? (
            <div id="booking" className="space-y-6 scroll-mt-28">
              <div className="bg-white rounded-2xl border border-[#E8E5DF] shadow-xl p-6 sm:p-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E5DF] pb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#00AEEF] font-bold">
                      Direct Booking • Entire Apartment Access
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mt-1">
                      Reserve {prop.name}
                    </h2>
                    <p className="text-xs text-neutral-500 font-light mt-1 max-w-xl">
                      Direct apartment reservation with guaranteed 24/7 power, protocol security, high-speed WiFi, and dedicated concierge support.
                    </p>
                  </div>

                  <div className="text-left md:text-right shrink-0">
                    <div className="text-[10px] uppercase text-neutral-400 font-medium">Nightly Rate</div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#00AEEF]">
                      ₦{(prop.pricingStartingFrom || propertyRooms[0]?.pricePerNight || 100000).toLocaleString()}
                      <span className="text-xs text-neutral-400 font-normal"> / night</span>
                    </div>
                  </div>
                </div>

                {/* Apartment Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 bg-[#FAF9F6] rounded-xl p-4 border border-[#E8E5DF]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Capacity</span>
                    <div className="text-xs font-semibold text-[#111111] mt-0.5">
                      {prop.maxGuests || propertyRooms[0]?.maxGuests || 2} Guests
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Bedrooms</span>
                    <div className="text-xs font-semibold text-[#111111] mt-0.5">
                      {prop.bedrooms || propertyRooms[0]?.bedrooms || 1} Bedrooms
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Bathrooms</span>
                    <div className="text-xs font-semibold text-[#111111] mt-0.5">
                      {prop.bathrooms || propertyRooms[0]?.bathrooms || 1} Bathrooms
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Location</span>
                    <div className="text-xs font-semibold text-[#111111] mt-0.5">
                      {prop.area || prop.city}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <a
                    href={`https://wa.me/2349042854834?text=${encodeURIComponent(
                      `Hello Stay Connect Concierge, I would like to inquire about reserving ${prop.name} at ${prop.address}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <Link
                    href={bookUrl}
                    className="w-full sm:w-auto px-10 py-4 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl inline-flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Book Apartment Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div id="rooms" className="space-y-8 scroll-mt-28">
              <h2 className="font-serif text-3xl text-[#111111]">
                Room types at {prop.name}
              </h2>
              {!propertyRooms.length && (
                <p className="text-neutral-600">
                  Room types are being prepared. Please contact Stay Connect for
                  availability.
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {propertyRooms.map((rm: any) => (
                  <div
                    key={rm.id}
                    className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden shadow-md space-y-4 p-6"
                  >
                    <div className="relative h-48 rounded-lg overflow-hidden bg-neutral-900">
                      <Image
                        src={rm.heroImage}
                        alt={rm.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-serif text-2xl text-[#111111]">
                      {rm.name}
                    </h3>
                    <div className="text-xs text-neutral-500 font-light">
                      {rm.maxGuests} Guests • {rm.propertySize} m²
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DF]">
                      <div className="font-serif text-xl font-bold text-[#111111]">
                        ₦{rm.pricePerNight.toLocaleString()} / night
                      </div>
                      <Link
                        href={`/rooms/${rm.slug}?${stayQuery}`}
                        className="text-xs text-[#00AEEF] font-semibold uppercase tracking-widest"
                      >
                        View Suite →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
