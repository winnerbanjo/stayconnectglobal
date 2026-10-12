"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Property } from "@/types";
import AirbnbPropertyCard from "./AirbnbPropertyCard";

interface AirbnbPropertySectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  linkHref?: string;
  properties: Property[];
  showFeeTotal?: boolean;
}

export default function AirbnbPropertySection({
  title,
  subtitle,
  badge,
  linkHref = "/properties",
  properties,
  showFeeTotal = true,
}: AirbnbPropertySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [properties]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const amount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  if (!properties || properties.length === 0) return null;

  return (
    <section className="w-full space-y-3 sm:space-y-4">
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between gap-3">
        <div className="max-w-[80%]">
          {badge && (
            <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#00AEEF] font-bold mb-0.5 sm:mb-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] shrink-0" />
              <span className="truncate">{badge}</span>
            </div>
          )}
          <Link
            href={linkHref}
            className="group inline-flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:text-[#00AEEF] transition-colors"
          >
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
              {title}
            </h2>
            <ArrowRight className="w-4 h-4 text-[#00AEEF] transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
          </Link>
          {subtitle && (
            <p className="text-[11px] sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light line-clamp-1 sm:line-clamp-none">
              {subtitle}
            </p>
          )}
        </div>

        {/* CAROUSEL CONTROLS (< >) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous stays"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-90 transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next stays"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-90 transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3.5 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="shrink-0 w-[78vw] sm:w-[280px] md:w-[310px] snap-start"
          >
            <AirbnbPropertyCard property={prop} showFeeTotal={showFeeTotal} />
          </div>
        ))}
      </div>
    </section>
  );
}
