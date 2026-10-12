"use client";

import React, { useRef } from "react";
import {
  Sparkles,
  MapPin,
  Waves,
  Zap,
  Shield,
  UtensilsCrossed,
  Car,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Crown,
  Anchor,
  Flame,
} from "lucide-react";

interface AirbnbFilterChipsProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  onOpenFiltersModal?: () => void;
}

export default function AirbnbFilterChips({
  selectedTag,
  onSelectTag,
  onOpenFiltersModal,
}: AirbnbFilterChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const chips = [
    { id: "all", label: "All Curated Stays", icon: Sparkles },
    { id: "banana-island", label: "Banana Island", icon: Crown },
    { id: "ikoyi", label: "Ikoyi", icon: MapPin },
    { id: "lekki", label: "Lekki Phase 1", icon: MapPin },
    { id: "victoria-island", label: "Victoria Island", icon: MapPin },
    { id: "power", label: "24/7 Power", icon: Zap },
    { id: "waterfront", label: "Waterfront", icon: Anchor },
    { id: "pool", label: "Private Pool", icon: Waves },
    { id: "security", label: "Protocol Security", icon: Shield },
    { id: "chef", label: "Private Chef Ready", icon: UtensilsCrossed },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -220 : 220,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex items-center gap-3 py-4 border-b border-[#E8E5DF] dark:border-[#2C2B29]">
      {/* LEFT SCROLL BUTTON */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll filter chips left"
        className="hidden md:flex w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 items-center justify-center shrink-0 hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-95 shadow-sm text-neutral-600 dark:text-neutral-300 transition"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* CHIPS SCROLLER */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth no-scrollbar flex-1 py-1 -mx-3 px-3 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {chips.map((chip) => {
          const Icon = chip.icon;
          const isActive = selectedTag === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onSelectTag(chip.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isActive
                  ? "bg-[#111111] text-white dark:bg-white dark:text-[#111111] border-[#00AEEF] shadow-sm ring-1 ring-[#00AEEF]/50"
                  : "bg-white dark:bg-[#1A1918] text-neutral-700 dark:text-neutral-300 border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#00AEEF] hover:text-[#00AEEF]"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive
                    ? "text-[#00AEEF]"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* RIGHT SCROLL BUTTON */}
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll filter chips right"
        className="hidden md:flex w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 items-center justify-center shrink-0 hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-95 shadow-sm text-neutral-600 dark:text-neutral-300 transition"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* LUXURY BADGE: 24/7 POWER GUARANTEE */}
      <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-[#00AEEF] text-[11px] font-bold uppercase tracking-wider shrink-0 border border-[#00AEEF]/40 shadow-sm">
        <Zap className="w-3 h-3 text-[#00AEEF]" />
        <span>100% Power Uptime</span>
      </div>
    </div>
  );
}
