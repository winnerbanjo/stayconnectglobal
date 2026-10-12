"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Star, ChevronLeft, ChevronRight, Zap, ShieldCheck, Crown } from "lucide-react";
import { Property } from "@/types";

interface AirbnbPropertyCardProps {
  property: Property;
  showFeeTotal?: boolean;
}

export default function AirbnbPropertyCard({
  property,
  showFeeTotal = true,
}: AirbnbPropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Gallery array fallback
  const images =
    property.gallery && property.gallery.length > 0
      ? property.gallery
      : [property.heroImage || "/images/saffron/saffron-1.jpg"];

  // Initialize wishlist state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("stayconnect_wishlist");
      if (stored) {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids) && ids.includes(property.id)) {
          setIsFavorite(true);
        }
      }
    } catch {
      // ignore
    }
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isFavorite;
    setIsFavorite(next);
    try {
      const stored = localStorage.getItem("stayconnect_wishlist");
      let ids: string[] = stored ? JSON.parse(stored) : [];
      if (next) {
        if (!ids.includes(property.id)) ids.push(property.id);
      } else {
        ids = ids.filter((id) => id !== property.id);
      }
      localStorage.setItem("stayconnect_wishlist", JSON.stringify(ids));
    } catch {
      // ignore
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Derive location & price
  const locationLabel = property.area || property.address || property.city || "Lagos, Nigeria";
  const price = property.pricingStartingFrom || 120000;
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

  const ratingScore = "4.98";

  return (
    <div className="group relative flex flex-col w-full select-none">
      <Link href={`/properties/${property.slug}`} className="block">
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-[#E8E5DF] dark:border-[#2C2B29] group-hover:border-[#00AEEF]/60 transition-all duration-300 shadow-sm group-hover:shadow-xl">
          <img
            src={images[currentImageIndex]}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* STAY CONNECT BRAND BADGES (Top Left) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start max-w-[70%]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#111111]/90 text-white text-[9px] sm:text-[10px] uppercase tracking-wider font-bold shadow-md backdrop-blur-md border border-[#00AEEF]/40 truncate">
              <Zap className="w-2.5 h-2.5 text-[#00AEEF] shrink-0" />
              <span>24/7 Power</span>
            </span>

            {property.name.toLowerCase().includes("banana") || locationLabel.toLowerCase().includes("banana") ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 dark:bg-[#1A1A1A]/95 text-[#111111] dark:text-white text-[9px] sm:text-[10px] font-semibold shadow-sm backdrop-blur-sm border border-black/5 dark:border-white/10 truncate">
                <Crown className="w-2.5 h-2.5 text-[#C6A15B] shrink-0" />
                <span>Banana Island</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 dark:bg-[#1A1A1A]/95 text-[#111111] dark:text-white text-[9px] sm:text-[10px] font-semibold shadow-sm backdrop-blur-sm border border-black/5 dark:border-white/10 truncate">
                <ShieldCheck className="w-2.5 h-2.5 text-[#00AEEF] shrink-0" />
                <span>Verified Stay</span>
              </span>
            )}
          </div>

          {/* WISHLIST BUTTON (Top Right with Cyan Glow and Mobile Tap Target) */}
          <button
            type="button"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
            className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-115 active:scale-90 transition-all duration-200 focus:outline-none"
          >
            <Heart
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 drop-shadow-md ${
                isFavorite
                  ? "fill-[#00AEEF] text-[#00AEEF] filter drop-shadow-[0_0_8px_rgba(0,174,239,0.8)]"
                  : "fill-black/35 text-white stroke-[2] hover:text-[#00AEEF]"
              }`}
            />
          </button>

          {/* IMAGE CAROUSEL CONTROLS */}
          {images.length > 1 && (
            <>
              {/* Desktop Hover Arrows & Mobile Subtle Arrows */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 dark:bg-black/90 text-neutral-800 dark:text-white flex items-center justify-center shadow-lg opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 hover:text-[#00AEEF] transition-all duration-200"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 dark:bg-black/90 text-neutral-800 dark:text-white flex items-center justify-center shadow-lg opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 hover:text-[#00AEEF] transition-all duration-200"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* DOT INDICATORS */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
                {images.slice(0, 5).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? "w-3.5 sm:w-4 bg-[#00AEEF]"
                        : "w-1.5 bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* METADATA CONTENT (Mobile-responsive typography) */}
        <div className="pt-2.5 sm:pt-3 space-y-0.5 sm:space-y-1 text-left">
          {/* Line 1: Title and Rating */}
          <div className="flex items-baseline justify-between gap-1.5">
            <h3 className="font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#00AEEF] transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-[11px] sm:text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-1.5 sm:px-2 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-current text-[#C6A15B]" />
              <span>{ratingScore}</span>
            </div>
          </div>

          {/* Line 2: Neighbourhood */}
          <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 truncate font-light">
            {locationLabel}
          </p>

          {/* Line 3: Feature Highlights */}
          <p className="text-[11px] sm:text-[12px] text-neutral-500 dark:text-neutral-400 truncate flex items-center gap-1 font-light">
            <span className="text-[#00AEEF] font-bold">★</span>
            <span>{property.bedrooms ? `${property.bedrooms} Bed · ` : ""}24/7 Power · Fibre Wi-Fi</span>
          </p>

          {/* Line 4: Price & Fee Note */}
          <div className="pt-1 flex items-baseline gap-1 text-sm sm:text-[15px]">
            <span className="font-bold text-neutral-900 dark:text-white">
              {formattedPrice}
            </span>
            <span className="text-neutral-500 text-xs font-normal">
              /night
            </span>
            {showFeeTotal && (
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.5 rounded ml-1">
                Incl. fees
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
