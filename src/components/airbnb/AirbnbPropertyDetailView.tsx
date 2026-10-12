"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Zap,
  ShieldCheck,
  Crown,
  Users,
  Bed,
  Bath,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  Sparkles,
  Calendar,
  MessageCircle,
  ArrowRight,
  Shield,
  Clock,
  Wifi,
  Tv,
  Coffee,
  Waves,
  UtensilsCrossed,
  Car,
  Home,
  SlidersHorizontal,
} from "lucide-react";
import { Property, Room } from "@/types";
import AirbnbHeader from "./AirbnbHeader";
import AirbnbFooter from "./AirbnbFooter";

interface AirbnbPropertyDetailViewProps {
  property: Property;
  rooms?: Room[];
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export default function AirbnbPropertyDetailView({
  property,
  rooms = [],
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}: AirbnbPropertyDetailViewProps) {
  // Dates & Guests state
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  const dayAfterTomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  }, []);

  const [checkIn, setCheckIn] = useState(initialCheckIn || tomorrow);
  const [checkOut, setCheckOut] = useState(initialCheckOut || dayAfterTomorrow);
  const [guests, setGuests] = useState(initialGuests);

  // Gallery state
  const images = useMemo(() => {
    const list = [property.heroImage, ...(property.gallery || [])].filter(Boolean);
    // If fewer than 5 images, pad with default high-quality images from the property or gallery
    if (list.length === 0) return ["/images/experiences/chauffeur.jpg"];
    if (list.length < 5) {
      while (list.length < 5) {
        list.push(list[list.length % list.length]);
      }
    }
    return list;
  }, [property.heroImage, property.gallery]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobilePhotoIndex, setMobilePhotoIndex] = useState(0);

  // Wishlist state
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareToast, setShareToast] = useState(false);

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

  const toggleFavorite = () => {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.name,
          text: `Check out ${property.name} on Stay Connect Global`,
          url: window.location.href,
        });
        return;
      } catch {
        // fallback
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    } catch {
      // ignore
    }
  };

  // Pricing calculations
  const price = property.pricingStartingFrom || rooms[0]?.pricePerNight || 350000;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(0, d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const subtotal = price * nights;
  const grandTotal = subtotal;

  const maxCapacity = property.maxGuests || rooms[0]?.maxGuests || 4;
  const bedroomCount = property.bedrooms || rooms[0]?.bedrooms || 2;
  const bathroomCount = property.bathrooms || rooms[0]?.bathrooms || 2;
  const isBananaIsland =
    property.name.toLowerCase().includes("banana") ||
    property.address.toLowerCase().includes("banana") ||
    (property.area || "").toLowerCase().includes("banana");

  // Booking room slug fallback
  const bookingRoomSlug = rooms[0]?.slug || property.slug;
  const bookUrl = `/book?room=${encodeURIComponent(bookingRoomSlug)}&propertyId=${encodeURIComponent(
    property.id
  )}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(
    checkOut
  )}&guests=${encodeURIComponent(guests)}`;

  // WhatsApp concierge booking message
  const whatsappMsg = encodeURIComponent(
    `Hello Stay Connect Concierge, I would like to reserve ${property.name} (${property.address}) from ${checkIn} to ${checkOut} (${nights} night${
      nights > 1 ? "s" : ""
    }) for ${guests} guest(s). Estimated total: ₦${grandTotal.toLocaleString()}.`
  );
  const whatsappUrl = `https://wa.me/2349042854834?text=${whatsappMsg}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans selection:bg-[#00AEEF] selection:text-[#111111] transition-colors duration-200 pb-20 sm:pb-0">
      {/* 1. AIRBNB HEADER */}
      <AirbnbHeader
        activeCategory="all"
        onSelectCategory={() => {}}
        selectedLocation={property.area || property.city || ""}
        onSelectLocation={() => {}}
        onSearch={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        {/* SHARE TOAST */}
        {shareToast && (
          <div className="fixed top-24 right-6 z-50 bg-[#111111] text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 animate-fade-in">
            <Check className="w-4 h-4 text-[#00AEEF]" />
            <span>Listing link copied to clipboard!</span>
          </div>
        )}

        {/* TOP BREADCRUMB & HEADER BAR */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Link href="/" className="hover:text-[#00AEEF] transition-colors">
              Stays
            </Link>
            <span>›</span>
            <span>{property.city}</span>
            <span>›</span>
            <span className="text-neutral-900 dark:text-white font-semibold truncate">
              {property.area || property.name}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {isBananaIsland && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[10px] font-bold tracking-wider uppercase border border-amber-500/40">
                    <Crown className="w-3 h-3 text-[#C6A15B]" />
                    <span>Banana Island Row</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-bold tracking-wider uppercase border border-[#00AEEF]/30">
                  <Zap className="w-3 h-3 text-[#00AEEF]" />
                  <span>24/7 Power Guaranteed</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Verified Residence</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                <span className="flex items-center gap-1 font-bold text-neutral-900 dark:text-white">
                  <Star className="w-4 h-4 fill-current text-[#C6A15B]" />
                  <span>4.98</span>
                  <span className="text-neutral-400 underline font-normal">(28 reviews)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span className="underline">{property.address}</span>
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS (Share & Save) */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-[#00AEEF] text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <Share2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="underline">Share</span>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-[#00AEEF] text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFavorite
                      ? "fill-[#00AEEF] text-[#00AEEF]"
                      : "text-neutral-700 dark:text-neutral-300"
                  }`}
                />
                <span className="underline">{isFavorite ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. THE SIGNATURE AIRBNB 5-PHOTO COLLAGE GRID */}
        {/* DESKTOP PHOTO GRID (>= 768px) */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 sm:gap-2.5 h-[420px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden relative group">
          {/* Main Hero Photo (Left Half) */}
          <div
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden bg-neutral-900"
          >
            <img
              src={images[0]}
              alt={`${property.name} main view`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* 4 Supporting Photos (Right Half 2x2 Grid) */}
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setLightboxIndex(idx + 1);
                setLightboxOpen(true);
              }}
              className="relative cursor-pointer overflow-hidden bg-neutral-900"
            >
              <img
                src={img}
                alt={`${property.name} gallery image ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}

          {/* Floating "Show all photos" Button */}
          <button
            type="button"
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-xl bg-white/95 dark:bg-[#111111]/95 text-neutral-900 dark:text-white border border-black/10 dark:border-white/10 text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition active:scale-95 backdrop-blur-md"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Show all {images.length} photos</span>
          </button>
        </div>

        {/* MOBILE PHOTO CAROUSEL (< 768px) */}
        <div className="md:hidden relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-md">
          <img
            src={images[mobilePhotoIndex]}
            alt={`${property.name} view ${mobilePhotoIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Photo Counter Badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-semibold backdrop-blur-md">
            {mobilePhotoIndex + 1} / {images.length}
          </div>
          {/* Nav buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setMobilePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                }
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md active:scale-90"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setMobilePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md active:scale-90"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* 3. MAIN CONTENT: 2-COLUMN AIRBNB LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4 items-start">
          {/* LEFT COLUMN: LISTING DETAILS (65% width) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 divide-y divide-[#E8E5DF] dark:divide-[#2C2B29]">
            {/* SECTION 1: HOST & CAPACITY SUMMARY */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Entire serviced residence hosted by Stay Connect Global
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-light">
                    {maxCapacity} guests · {bedroomCount} bedrooms · {bedroomCount} beds · {bathroomCount} bathrooms
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#111111] to-[#00AEEF] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0 ring-2 ring-[#00AEEF]/50">
                  SC
                </div>
              </div>
            </div>

            {/* SECTION 2: STAY CONNECT 4 PILLAR GUARANTEES */}
            <div className="pt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    100% Guaranteed 24/7 Energy & Backup
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light leading-relaxed">
                    Heavy industrial generators and automatic solar inverter arrays ensure uninterrupted electricity and zero blackouts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    Armed Protocol Security & Vetted Access
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light leading-relaxed">
                    Gated perimeter control, 24/7 security watchmen, and armed convoy escorts available strictly on request.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 mt-0.5">
                  <Crown className="w-4 h-4 text-[#C6A15B]" />
                  </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    Dedicated On-Ground Concierge Host
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light leading-relaxed">
                    Personal on-site check-in, key transfer, and 24/7 WhatsApp concierge assistance throughout your reservation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    Complimentary Housekeeping & Fresh Linens
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-light leading-relaxed">
                    Hospitality-grade sanitization, fresh Egyptian cotton bedsheets, premium towels, and luxury toiletries provided.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: ABOUT THIS SPACE */}
            <div className="pt-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                About this luxury space
              </h2>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed space-y-3">
                <p>
                  {property.description ||
                    `Welcome to ${property.name}, an exclusive serviced residence located in ${property.address}. Impeccably finished with modern architectural elegance, high-speed fibre Wi-Fi, chef-ready kitchen, and uninterrupted power.`}
                </p>
                <p>
                  Whether traveling for executive diplomatic business or leisure retreats in Lagos and Abuja, this residence offers the ideal blend of privacy, prestige, and convenience.
                </p>
              </div>
            </div>

            {/* SECTION 4: WHERE YOU WILL SLEEP (BEDROOMS) */}
            <div className="pt-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Where you will sleep
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: bedroomCount }).map((_, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-[#E8E5DF] dark:border-[#2C2B29] bg-white dark:bg-[#1A1918] space-y-3 shadow-sm"
                  >
                    <Bed className="w-6 h-6 text-[#00AEEF]" />
                    <div>
                      <div className="font-bold text-sm text-neutral-900 dark:text-white">
                        Bedroom {i + 1}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-0.5">
                        {i === 0 ? "1 King bed · En-suite bath" : "1 Queen bed · En-suite bath"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: WHAT THIS PLACE OFFERS (AMENITIES) */}
            <div className="pt-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                What this place offers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-light">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>24/7 Industrial Generator & Solar Power</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>High-Speed Fibre Wi-Fi (100+ Mbps)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Waves className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>Private Swimming Pool & Sun Deck</span>
                </div>
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>Chef-Ready Fully Equipped Kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tv className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>Smart 4K HDTV with Netflix & DSTV</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>Free Secure Gated Parking on Premises</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>24/7 Armed Security & Monitored CCTV</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  <span>Coffee Maker & Complimentary Tea Station</span>
                </div>
              </div>
            </div>

            {/* SECTION 6: GUEST POLICIES & RULES */}
            <div className="pt-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                House rules & policies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] space-y-1">
                  <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00AEEF]" />
                    <span>Check-in & Checkout</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Check-in after 2:00 PM · Checkout before 12:00 PM
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] space-y-1">
                  <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#00AEEF]" />
                    <span>Cancellation Policy</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Free cancellation up to 48 hours prior to check-in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY AIRBNB RESERVATION CARD (35% width) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="rounded-3xl border border-[#E8E5DF] dark:border-[#2C2B29] bg-white dark:bg-[#1A1918] p-6 shadow-2xl space-y-5">
              {/* PRICE HEADER */}
              <div className="flex items-baseline justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                    ₦{price.toLocaleString()}
                  </span>
                  <span className="text-neutral-500 text-xs font-normal"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <Star className="w-3.5 h-3.5 fill-current text-[#C6A15B]" />
                  <span>4.98</span>
                  <span className="text-neutral-400 font-normal underline">· 28 reviews</span>
                </div>
              </div>

              {/* BOXED DATE & GUEST PICKER (Signature Airbnb Widget) */}
              <div className="rounded-2xl border border-neutral-300 dark:border-neutral-700 overflow-hidden divide-y divide-neutral-300 dark:divide-neutral-700 bg-white dark:bg-[#111111]">
                <div className="grid grid-cols-2 divide-x divide-neutral-300 dark:divide-neutral-700">
                  <div className="p-3 text-left">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none pt-0.5 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 text-left">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                      Checkout
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="p-3 text-left">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none pt-0.5 cursor-pointer"
                  >
                    {Array.from({ length: maxCapacity }).map((_, i) => (
                      <option key={i + 1} value={i + 1} className="dark:bg-[#111111]">
                        {i + 1} guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PRIMARY CTA: RESERVE BUTTON */}
              <Link
                href={bookUrl}
                className="w-full py-4 rounded-2xl bg-[#00AEEF] hover:bg-[#0090C8] text-[#111111] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl hover:shadow-cyan-500/20 active:scale-95 transition-all duration-200"
              >
                <span>Reserve Residence</span>
                <ArrowRight className="w-4 h-4 stroke-[2.8]" />
              </Link>

              {/* SECONDARY CTA: WHATSAPP CONCIERGE BUTTON */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 hover:border-[#00AEEF] text-neutral-800 dark:text-neutral-200 hover:text-[#00AEEF] text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>Inquire on WhatsApp</span>
              </a>

              <p className="text-center text-[11px] text-neutral-500 font-light">
                You won't be charged yet • Bank transfer & voucher verified
              </p>

              {/* ITEMIZED TRANSPARENT PRICE BREAKDOWN */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between items-center">
                  <span className="underline">
                    ₦{price.toLocaleString()} x {nights} night{nights > 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="underline">Stay Connect Service Fee</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">₦0 (Included)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="underline">Guaranteed 24/7 Power Fee</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">₦0 (Complimentary)</span>
                </div>
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-baseline text-sm font-bold text-neutral-900 dark:text-white">
                  <span>Total before taxes</span>
                  <span className="text-base text-[#00AEEF]">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. MOBILE STICKY BOTTOM RESERVATION BAR (< 768px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-lg border-t border-[#E8E5DF] dark:border-[#2C2B29] px-4 py-3 flex items-center justify-between shadow-2xl safe-area-bottom">
        <div>
          <div className="flex items-baseline gap-1 text-sm font-bold text-neutral-900 dark:text-white">
            <span>₦{price.toLocaleString()}</span>
            <span className="text-neutral-500 text-xs font-normal">/ night</span>
          </div>
          <div className="text-[11px] text-neutral-500 underline">
            {checkIn} – {checkOut}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-white flex items-center justify-center hover:border-[#00AEEF]"
            aria-label="WhatsApp Concierge"
          >
            <MessageCircle className="w-4 h-4 text-[#00AEEF]" />
          </a>
          <Link
            href={bookUrl}
            className="px-5 py-3 rounded-xl bg-[#00AEEF] hover:bg-[#0090C8] text-[#111111] font-bold text-xs tracking-wide shadow-md active:scale-95 transition"
          >
            Reserve
          </Link>
        </div>
      </div>

      {/* 5. FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div className="text-sm font-bold text-[#00AEEF]">
              {property.name} • Photo {lightboxIndex + 1} of {images.length}
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={images[lightboxIndex]}
              alt={`${property.name} full photo`}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition active:scale-90"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition active:scale-90"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Footer Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                  lightboxIndex === i ? "border-[#00AEEF] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. AIRBNB FOOTER */}
      <AirbnbFooter />
    </div>
  );
}
