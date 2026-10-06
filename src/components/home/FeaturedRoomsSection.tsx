"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Room, Property } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Crown,
  MapPin,
} from "lucide-react";

function cleanDescription(desc: string = ""): string {
  if (!desc) return "";
  if (desc.includes("•")) {
    const parts = desc.split("•");
    const last = parts[parts.length - 1]?.trim();
    if (last && last.length > 30) {
      // Remove any trailing single amenity word before the sentence
      const sentenceMatch = last.match(/(?:(?:Hairdryer|Iron|Fridge|Toaster|Oven)\s+)?([A-Z].*)/);
      if (sentenceMatch && sentenceMatch[1]) {
        return sentenceMatch[1];
      }
      return last;
    }
  }
  return desc;
}

export default function FeaturedRoomsSection() {
  const [liveRooms, setLiveRooms] = useState<Room[]>([]);
  const [liveProperties, setLiveProperties] = useState<Property[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/rooms").then((r) => r.json()),
      fetch("/api/properties").then((r) => r.json()),
    ])
      .then(([rooms, properties]) => {
        if (rooms.success && Array.isArray(rooms.data)) setLiveRooms(rooms.data);
        if (properties.success && Array.isArray(properties.data)) setLiveProperties(properties.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Locations for tabs
  const locationTabs = useMemo(() => {
    const locations = new Set<string>();
    liveProperties.forEach((p) => {
      if (p.area) locations.add(p.area);
      else if (p.city) locations.add(p.city);
    });
    return Array.from(locations).filter(Boolean);
  }, [liveProperties]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    if (selectedLocation === "all") return liveProperties;
    return liveProperties.filter(
      (p) => (p.area || p.city).toLowerCase() === selectedLocation.toLowerCase()
    );
  }, [liveProperties, selectedLocation]);

  if (!loading && liveProperties.length === 0 && liveRooms.length === 0) {
    return (
      <section className="py-20 text-center bg-[#FAF9F6] dark:bg-[#111111]">
        <Link href="/rooms" className="text-[#00AEEF] underline">
          Explore all stays →
        </Link>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#161514] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-16 sm:space-y-24">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#00AEEF] font-semibold">
              <Crown className="w-4 h-4" />
              <span>Stay Connect Collection • Nigeria</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] dark:text-white font-normal leading-tight">
              Explore All Stays & Residences
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light max-w-2xl leading-relaxed">
              Curated luxury apartments, executive suites, and private residences across Nigeria. Verified for 24/7 power, protocol security, and in-house hospitality.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/rooms"
              className="px-6 py-3.5 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Browse All Stays</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ALL STAYS & RESIDENCES GRID */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] dark:text-white">
                All Available Stays & Apartments
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1">
                Select your preferred stay to check availability and reserve directly.
              </p>
            </div>

            {/* Location Filter Tabs */}
            {locationTabs.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedLocation("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedLocation === "all"
                      ? "bg-[#00AEEF] text-[#111111] font-semibold shadow-sm"
                      : "bg-white dark:bg-[#1E1D1B] border border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-600 dark:text-neutral-300 hover:border-[#00AEEF]"
                  }`}
                >
                  All Stays ({liveProperties.length})
                </button>
                {locationTabs.map((loc) => {
                  const count = liveProperties.filter(
                    (p) => (p.area || p.city).toLowerCase() === loc.toLowerCase()
                  ).length;
                  return (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedLocation.toLowerCase() === loc.toLowerCase()
                          ? "bg-[#00AEEF] text-[#111111] font-semibold shadow-sm"
                          : "bg-white dark:bg-[#1E1D1B] border border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-600 dark:text-neutral-300 hover:border-[#00AEEF]"
                      }`}
                    >
                      {loc} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Properties Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((prop) => (
              <motion.article
                key={prop.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#1A1918] rounded-2xl border border-[#E8E5DF] dark:border-[#2C2B29] overflow-hidden hover:border-[#00AEEF]/60 transition-all flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <Link href={`/properties/${prop.slug}`} className="block">
                  {/* Card Image */}
                  <div className="relative h-64 bg-neutral-900 overflow-hidden">
                    <img
                      src={prop.heroImage || prop.gallery?.[0] || "/images/saffron/saffron-1.jpg"}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-[#00AEEF]/40 text-[#00AEEF] text-[10px] uppercase tracking-widest font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Stay Connect Verified</span>
                    </div>

                    {!prop.partnerId && (
                      <div className="absolute top-4 right-4 bg-[#00AEEF] text-[#111111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                        Direct
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 text-xs font-medium text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                      <span className="line-clamp-1">{prop.address}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#00AEEF] font-semibold mb-1">
                        {prop.area || prop.city} {prop.bedrooms ? `· ${prop.bedrooms} Bed · ${prop.bathrooms || 1} Bath` : prop.numberOfUnits ? `· ${prop.numberOfUnits} ${Number(prop.numberOfUnits) === 1 ? "Unit" : "Units"}` : ""}
                      </div>
                      <h4 className="font-serif text-2xl text-[#111111] dark:text-white font-medium group-hover:text-[#00AEEF] transition-colors">
                        {prop.name}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light mt-2 leading-relaxed line-clamp-2">
                        {cleanDescription(prop.description)}
                      </p>
                    </div>

                    {/* Amenities Pill Row */}
                    {prop.amenities && prop.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {prop.amenities.slice(0, 3).map((a: any, i: number) => (
                          <span
                            key={i}
                            className="bg-[#FAF9F6] dark:bg-[#252422] text-neutral-600 dark:text-neutral-300 text-[10px] px-2.5 py-1 rounded-md border border-[#E8E5DF] dark:border-[#333]"
                          >
                            {a.name || a}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pricing & Link */}
                    <div className="pt-4 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase text-neutral-500 font-medium">
                          From
                        </div>
                        <div className="text-lg font-serif font-bold text-[#111111] dark:text-white">
                          {prop.pricingStartingFrom ? (
                            <>
                              <span className="text-[#00AEEF]">₦{prop.pricingStartingFrom.toLocaleString()}</span>
                              <span className="text-xs text-neutral-400 font-light"> / night</span>
                            </>
                          ) : (
                            <span className="text-xs text-[#00AEEF]">View Pricing</span>
                          )}
                        </div>
                      </div>

                      <span className="px-4 py-2 bg-[#00AEEF] group-hover:bg-[#0088CC] text-[#111111] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                        <span>{prop.propertyType === "Apartment" ? "Book Apartment" : "View Stay"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Bottom Explore Banner */}
          <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-serif text-2xl text-[#111111] dark:text-white font-medium">
                Looking for a specific neighbourhood or dates?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light">
                Browse our complete collection of verified apartments, luxury suites, and private villas across Nigeria.
              </p>
            </div>
            <Link
              href="/rooms"
              className="px-8 py-4 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Explore All Stays</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
