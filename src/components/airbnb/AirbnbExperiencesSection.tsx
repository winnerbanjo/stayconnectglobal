"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Star, MessageCircle } from "lucide-react";

interface ExperienceItem {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  unit: string;
  rating: string;
  image: string;
  badge?: string;
  href: string;
}

export default function AirbnbExperiencesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const experiences: ExperienceItem[] = [
    {
      id: "exp-yacht",
      title: "Private Luxury Yacht Charter to Ilashe Island Beach",
      category: "Island & Yachting",
      location: "Victoria Island Marina, Lagos",
      price: "₦550,000",
      unit: "charter",
      rating: "4.99",
      badge: "🌊 Ilashe Island",
      image: "/images/experiences/yacht.jpg",
      href: "https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20book%20a%20private%20luxury%20yacht%20charter%20to%20Ilashe%20Island",
    },
    {
      id: "fleet-on-request",
      title: "Executive Chauffeur Fleet & Armoured Escorts",
      category: "Available on Request",
      location: "Lagos & Abuja Wide",
      price: "On Request",
      unit: "via WhatsApp",
      rating: "5.0",
      badge: "📲 On Request via WhatsApp",
      image: "/images/experiences/chauffeur.jpg",
      href: "https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20request%20executive%20chauffeur%20car%20rental%20services",
    },
    {
      id: "exp-chef",
      title: "Bespoke In-Suite Private Chef & Sommelier Dining",
      category: "Private Culinary",
      location: "In-Residence Service",
      price: "₦120,000",
      unit: "dinner",
      rating: "4.95",
      badge: "👨‍🍳 5-Star Private Chef",
      image: "/images/experiences/chef.jpg",
      href: "https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20request%20a%20bespoke%20private%20in-suite%20chef%20service",
    },
    {
      id: "transfers-airport",
      title: "Airport VIP Tarmac Escort & Protocol Transfer",
      category: "Airport Protocol",
      location: "MMIA Lagos & Nnamdi Azikiwe Abuja",
      price: "₦85,000",
      unit: "transfer",
      rating: "4.99",
      badge: "✈️ Tarmac Escort",
      image: "/images/experiences/airport.jpg",
      href: "https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20book%20an%20airport%20VIP%20tarmac%20escort%20and%20transfer",
    },
    {
      id: "security-on-request",
      title: "Diplomatic Protocol Escort & Armed Convoy",
      category: "Security on Request",
      location: "Lagos & Abuja Wide",
      price: "On Request",
      unit: "via WhatsApp",
      rating: "4.98",
      badge: "🛡️ Protocol Security",
      image: "/images/experiences/protocol.jpg",
      href: "https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20request%20diplomatic%20protocol%20and%20armed%20escort%20services",
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const amount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="w-full space-y-4 pt-6">
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#00AEEF] font-bold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
            <span>Stay Connect VIP Experiences</span>
          </div>
          <a
            href="https://wa.me/2349042854834?text=Hello%20Stay%20Connect%2C%20I%20would%20like%20to%20inquire%20about%20your%20VIP%20experiences%20and%20charters"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:text-[#00AEEF] transition-colors"
          >
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
              Curated VIP Experiences & Charters
            </h2>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#00AEEF] transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
          </a>
          <p className="text-[11px] sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light line-clamp-1 sm:line-clamp-none">
            Private yacht charters to Ilashe, bespoke in-suite chefs, and executive fleet available on request via WhatsApp
          </p>
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous experiences"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-90 transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next experiences"
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
        {experiences.map((exp) => {
          const isFav = !!favorites[exp.id];
          return (
            <div
              key={exp.id}
              className="shrink-0 w-[78vw] sm:w-[280px] md:w-[310px] snap-start"
            >
              <a
                href={exp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[1.05/1] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-[#E8E5DF] dark:border-[#2C2B29] group-hover:border-[#00AEEF]/60 transition-all duration-300 shadow-sm group-hover:shadow-xl">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {exp.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111]/90 text-white text-[10px] uppercase tracking-wider font-bold shadow-md backdrop-blur-md border border-[#00AEEF]/40">
                        {exp.badge}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(exp.id, e)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full text-white hover:scale-115 active:scale-90 transition-all duration-200 focus:outline-none"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-6 h-6 transition-all duration-300 drop-shadow-md ${
                        isFav
                          ? "fill-[#00AEEF] text-[#00AEEF] filter drop-shadow-[0_0_8px_rgba(0,174,239,0.8)]"
                          : "fill-black/30 text-white stroke-[2] hover:text-[#00AEEF]"
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-3.5 space-y-1 text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#00AEEF] transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-current text-[#C6A15B]" />
                      <span>{exp.rating}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-neutral-500 dark:text-neutral-400 truncate font-light">
                    {exp.location}
                  </p>
                  <p className="text-[12px] text-neutral-500 dark:text-neutral-400 truncate font-light flex items-center gap-1">
                    <span className="text-[#00AEEF]">★</span>
                    <span>{exp.category} · In-House Protocol Handled</span>
                  </p>
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1 text-[15px]">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        {exp.price}
                      </span>
                      <span className="text-neutral-500 text-xs font-normal">
                        /{exp.unit}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00AEEF] bg-[#00AEEF]/10 group-hover:bg-[#00AEEF] group-hover:text-[#111111] px-2.5 py-1 rounded-full transition-all shrink-0">
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
