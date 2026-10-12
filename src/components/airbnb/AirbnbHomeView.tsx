"use client";

import React, { useState, useMemo } from "react";
import { Property } from "@/types";
import AirbnbHeader from "./AirbnbHeader";
import AirbnbFilterChips from "./AirbnbFilterChips";
import AirbnbPropertySection from "./AirbnbPropertySection";
import AirbnbPropertyCard from "./AirbnbPropertyCard";
import AirbnbFloatingFeePill from "./AirbnbFloatingFeePill";
import AirbnbExperiencesSection from "./AirbnbExperiencesSection";
import AirbnbFooter from "./AirbnbFooter";
import {
  Sparkles,
  MapPin,
  Building2,
  Zap,
  ShieldCheck,
  Car,
  Headset,
  ArrowRight,
  Crown,
  Search,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface AirbnbHomeViewProps {
  initialProperties: Property[];
}

export default function AirbnbHomeView({ initialProperties }: AirbnbHomeViewProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [includeFees, setIncludeFees] = useState(true);

  // Group properties by area
  const bananaAndIkoyiProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      const text = `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase();
      return (
        text.includes("banana") ||
        text.includes("ikoyi") ||
        text.includes("burdock") ||
        text.includes("almond") ||
        text.includes("oregano") ||
        text.includes("filbert") ||
        text.includes("marion")
      );
    });
  }, [initialProperties]);

  const lekkiProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      const text = `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase();
      return text.includes("lekki") || text.includes("providence");
    });
  }, [initialProperties]);

  // Handle active filter tag or search filter
  const filteredAllProperties = useMemo(() => {
    let list = [...initialProperties];

    if (showWishlistOnly) {
      try {
        const stored = localStorage.getItem("stayconnect_wishlist");
        const ids: string[] = stored ? JSON.parse(stored) : [];
        list = list.filter((p) => ids.includes(p.id));
      } catch {
        // ignore
      }
    }

    // Location search
    const locFilter = (selectedLocation || searchParams.location).trim().toLowerCase();
    if (locFilter) {
      list = list.filter((p) => {
        const text = `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase();
        return text.includes(locFilter);
      });
    }

    // Tag filter
    if (selectedTag === "lekki") {
      list = list.filter((p) =>
        `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase().includes("lekki")
      );
    } else if (selectedTag === "banana-island") {
      list = list.filter((p) =>
        `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase().includes("banana")
      );
    } else if (selectedTag === "ikoyi") {
      list = list.filter((p) =>
        `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase().includes("ikoyi")
      );
    } else if (selectedTag === "victoria-island") {
      list = list.filter((p) =>
        `${p.name} ${p.address} ${p.area} ${p.city} ${p.description}`.toLowerCase().includes("victoria")
      );
    }

    return list;
  }, [initialProperties, selectedLocation, searchParams.location, selectedTag, showWishlistOnly]);

  const handleSearch = (params: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => {
    setSearchParams(params);
    setSelectedLocation(params.location);
    if (params.location) {
      setSelectedTag("all");
    }
  };

  const isFiltered = Boolean(
    selectedLocation ||
      searchParams.location ||
      showWishlistOnly ||
      (selectedTag !== "all" && !["all"].includes(selectedTag))
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans selection:bg-[#00AEEF] selection:text-[#111111] transition-colors duration-200 pb-16 sm:pb-0">
      {/* 1. STAY CONNECT HEADER */}
      <AirbnbHeader
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (cat === "experiences" || cat === "mobility" || cat === "services") {
            const el = document.getElementById("experiences-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        selectedLocation={selectedLocation}
        onSelectLocation={(loc) => {
          setSelectedLocation(loc);
          setSearchParams((prev) => ({ ...prev, location: loc }));
        }}
        onSearch={handleSearch}
      />

      {/* 2. STAY CONNECT FILTER CHIPS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AirbnbFilterChips
          selectedTag={selectedTag}
          onSelectTag={(tag) => {
            setSelectedTag(tag);
            setShowWishlistOnly(false);
            if (tag === "all") {
              setSelectedLocation("");
              setSearchParams((prev) => ({ ...prev, location: "" }));
            }
          }}
        />
      </div>

      {/* 3. MAIN PROPERTIES CONTENT DIRECTLY (NO HERO IMAGE!) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-10 sm:space-y-16">
        {/* If user searched or clicked a specific area filter */}
        {isFiltered ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-3 sm:pb-4">
              <div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#00AEEF] font-bold">
                  {showWishlistOnly ? "Saved Wishlist" : "Curated Search Results"}
                </div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight mt-0.5 sm:mt-1">
                  {showWishlistOnly
                    ? "Your Saved Stays"
                    : `Stays in ${selectedLocation || selectedTag}`}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 sm:mt-1 font-light">
                  {filteredAllProperties.length}{" "}
                  {filteredAllProperties.length === 1 ? "stay" : "stays"} available with 24/7 power
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation("");
                  setSelectedTag("all");
                  setShowWishlistOnly(false);
                  setSearchParams({ location: "", checkIn: "", checkOut: "", guests: 1 });
                }}
                className="text-xs font-semibold underline text-[#00AEEF] hover:text-[#0088CC]"
              >
                Clear filters
              </button>
            </div>

            {filteredAllProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {filteredAllProperties.map((prop) => (
                  <AirbnbPropertyCard
                    key={prop.id}
                    property={prop}
                    showFeeTotal={includeFees}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20 bg-white dark:bg-[#1A1918] rounded-3xl border border-dashed border-[#E8E5DF] dark:border-[#2C2B29] p-6 sm:p-8">
                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#00AEEF] mx-auto mb-3" />
                <h3 className="text-base sm:text-lg font-semibold">
                  {showWishlistOnly ? "No saved stays yet" : "No direct stays matched"}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-1 mb-5">
                  {showWishlistOnly
                    ? "Tap the heart on any property to save it to your wishlist for quick access."
                    : "Try adjusting your search criteria, or browse our signature residences across Banana Island, Ikoyi, and Lekki."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLocation("");
                    setSelectedTag("all");
                    setShowWishlistOnly(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#00AEEF] text-[#111111] text-xs font-bold shadow hover:bg-[#0088CC] transition"
                >
                  View All Stays
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ROW 1: BANANA ISLAND & IKOYI RESIDENCES */}
            {bananaAndIkoyiProperties.length > 0 && (
              <AirbnbPropertySection
                badge="Billionaire Row & Waterfront"
                title="Banana Island & Ikoyi Residences"
                subtitle="Waterfront suites and executive 3-bed apartments on Banana Island Road with protocol security"
                linkHref="/properties?location=Ikoyi"
                properties={bananaAndIkoyiProperties}
                showFeeTotal={includeFees}
              />
            )}

            {/* ROW 2: LEKKI PHASE 1 LIFESTYLE SUITES */}
            {lekkiProperties.length > 0 && (
              <AirbnbPropertySection
                badge="Lifestyle & Coastal Hub"
                title="Lekki Phase 1 Luxury Suites"
                subtitle="Prime serviced suites near Victoria Island nightlife, cafes, and waterfront beach clubs"
                linkHref="/properties?location=Lekki"
                properties={lekkiProperties}
                showFeeTotal={includeFees}
              />
            )}

            {/* STAY CONNECT BRAND SPIRIT GUARANTEES STRIP */}
            <section className="bg-white dark:bg-[#1A1918] rounded-2xl sm:rounded-3xl border border-[#E8E5DF] dark:border-[#2C2B29] p-5 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white">
                      100% Guaranteed Power
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 font-light leading-relaxed">
                      Dual heavy industrial generators and solar inverter backups for uninterrupted electricity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white">
                      Armed Protocol Security
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 font-light leading-relaxed">
                      Gated island access, vetted estate protocol, and mobile police escorts on-demand.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20request%20an%20executive%20chauffeur%20car%20rental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 sm:gap-3.5 group hover:opacity-90 transition-opacity"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 group-hover:bg-[#00AEEF] group-hover:text-[#111111] transition-colors">
                    <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white group-hover:text-[#00AEEF] transition-colors">
                        Chauffeur on Request
                      </h4>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#00AEEF] bg-[#00AEEF]/10 px-1.5 py-0.5 rounded-full">
                        WhatsApp
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 font-light leading-relaxed">
                      Executive SUV & armoured escort fleet available strictly on request via WhatsApp.
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0">
                    <Headset className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white">
                      Dedicated Concierge
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 font-light leading-relaxed">
                      Real human hosts on ground in Lagos and Abuja via WhatsApp 24 hours every day.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ROW 3: ALL VERIFIED STAYS IN NIGERIA (Full Grid) */}
            <section className="space-y-4 sm:space-y-6 pt-2">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#00AEEF] font-bold mb-0.5 sm:mb-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Stay Connect Collection • Nigeria</span>
                  </div>
                  <Link
                    href="/properties"
                    className="group inline-flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:text-[#00AEEF] transition-colors"
                  >
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
                      All Stays & Serviced Residences
                    </h2>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#00AEEF] transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  </Link>
                  <p className="text-[11px] sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light line-clamp-1 sm:line-clamp-none">
                    Browse all verified apartments, executive suites, and private villas in Lagos & Abuja
                  </p>
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-neutral-500 bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] px-2.5 sm:px-3 py-1 rounded-full shrink-0">
                  {initialProperties.length} Verified
                </div>
              </div>

              {/* Responsive multi-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {initialProperties.map((prop) => (
                  <AirbnbPropertyCard
                    key={prop.id}
                    property={prop}
                    showFeeTotal={includeFees}
                  />
                ))}
              </div>
            </section>

            {/* ROW 4: Curated Experiences & Chauffeur Mobility Section */}
            <div id="experiences-section">
              <AirbnbExperiencesSection />
            </div>
          </>
        )}
      </main>

      {/* 4. STAY CONNECT FLOATING FEE & POWER PILL */}
      <div className="hidden sm:block">
        <AirbnbFloatingFeePill
          includeFees={includeFees}
          onToggle={() => setIncludeFees(!includeFees)}
        />
      </div>

      {/* 5. MOBILE BOTTOM NAVIGATION DOCK (Airbnb mobile app feel) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-lg border-t border-[#E8E5DF] dark:border-[#2C2B29] px-6 py-2 flex items-center justify-around shadow-2xl safe-area-bottom">
        <button
          type="button"
          onClick={() => {
            setSelectedLocation("");
            setSelectedTag("all");
            setShowWishlistOnly(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            !showWishlistOnly ? "text-[#00AEEF]" : "text-neutral-500"
          }`}
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          <span>Explore</span>
        </button>

        <button
          type="button"
          onClick={() => setShowWishlistOnly(!showWishlistOnly)}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            showWishlistOnly ? "text-[#00AEEF]" : "text-neutral-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${showWishlistOnly ? "fill-[#00AEEF]" : ""}`} />
          <span>Wishlist</span>
        </button>

        <a
          href="https://wa.me/2349042854834"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-neutral-500 hover:text-[#00AEEF]"
        >
          <MessageCircle className="w-4 h-4 text-[#00AEEF]" />
          <span>Concierge</span>
        </a>

        <Link
          href="/admin"
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-neutral-500 hover:text-[#00AEEF]"
        >
          <Crown className="w-4 h-4" />
          <span>Admin</span>
        </Link>
      </div>

      {/* 6. FOOTER */}
      <AirbnbFooter />
    </div>
  );
}
