'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Users,
  Maximize,
  Bed,
  Bath,
  MapPin,
  CheckCircle2,
  Calendar as CalendarIcon,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Shield,
  Clock,
  ArrowRight,
  Send,
  Building,
  Award,
  MessageSquare
} from 'lucide-react';
import { Room } from '@/types';

interface RoomDetailClientProps {
  room: Room;
}

export default function RoomDetailClient({ room }: RoomDetailClientProps) {
  const [selectedImg, setSelectedImg] = useState(room.heroImage);
  const [checkIn, setCheckIn] = useState('2026-08-15');
  const [checkOut, setCheckOut] = useState('2026-08-18');
  const [guests, setGuests] = useState('2');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const subtotal = room.pricePerNight * nights;
  const vat = subtotal * 0.075;
  const consumptionTax = subtotal * 0.05;
  const total = subtotal + vat + consumptionTax;

  const whatsappMessage = encodeURIComponent(
    `Hello Stay Connect Concierge, I would like to book the ${room.name} (${room.type} Suite) at 14B Providence Street, Lekki from ${checkIn} to ${checkOut} (${nights} nights) for ${guests} guest(s). Total estimated: ₦${total.toLocaleString()}.`
  );
  const whatsappUrl = `https://wa.me/2347041008351?text=${whatsappMessage}`;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12">
      {/* Top Breadcrumbs & Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-medium">
          <Link href="/" className="hover:text-[#C6A15B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-[#C6A15B] transition-colors">Suites</Link>
          <span>/</span>
          <span className="text-[#C6A15B] font-semibold">{room.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 border-b border-[#E8E5DF] pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 bg-[#111111] text-[#C6A15B] text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-full">
                {room.badge || 'TLC ⭐⭐⭐⭐⭐'}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 font-medium">
                {room.city} ({room.tagline})
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#111111] font-normal leading-tight">
              {room.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-neutral-600 font-light">
              <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>📍 {room.address}</span>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4 pt-2 lg:pt-0">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Nightly Rate</span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                ₦{room.pricePerNight.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#C6A15B]">
                Weekend: ₦{room.weekendPricePerNight?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative h-[280px] sm:h-[420px] lg:h-[540px] rounded-2xl overflow-hidden bg-neutral-900 shadow-xl border border-[#E8E5DF]">
          <Image
            src={selectedImg}
            alt={room.name}
            fill
            className="object-cover transition-all duration-700"
            priority
          />
          <div className="absolute top-4 left-4 bg-[#111111]/80 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] sm:text-xs text-[#C6A15B] uppercase tracking-widest font-medium border border-[#C6A15B]/30">
            Editorial Photo Gallery
          </div>
        </div>

        {/* Thumbnail Stack */}
        <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-1 gap-2.5 sm:gap-4 lg:h-[540px] overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0">
          {room.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImg(img)}
              className={`relative h-20 sm:h-24 lg:h-32 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                selectedImg === img ? 'border-[#C6A15B] shadow-lg scale-[0.98]' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Grid Specs & Sticky Booking Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
        {/* Left Column: Details, Ratings, Amenities */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-12">
          {/* Key Metric Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E5DF] shadow-sm">
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Maximum Capacity</span>
              <div className="flex items-center gap-1.5 font-serif text-base sm:text-lg text-[#111111] font-medium">
                <Users className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>👥 {room.maxGuests} GUESTS</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Property Size</span>
              <div className="flex items-center gap-1.5 font-serif text-base sm:text-lg text-[#111111] font-medium">
                <Maximize className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>📐 {room.propertySize} m²</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Bedrooms</span>
              <div className="flex items-center gap-1.5 font-serif text-base sm:text-lg text-[#111111] font-medium">
                <Bed className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>🛏️ {room.bedrooms} BR</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Bathrooms</span>
              <div className="flex items-center gap-1.5 font-serif text-base sm:text-lg text-[#111111] font-medium">
                <Bath className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>🚿 {room.bathrooms} BA</span>
              </div>
            </div>
          </div>

          {/* Room Description */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal border-b border-[#E8E5DF] pb-3">
              Suite Overview & Architecture
            </h3>
            <p className="text-neutral-700 text-xs sm:text-base font-light leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Property Amenities */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal border-b border-[#E8E5DF] pb-3">
              Property Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {room.amenities.map((am, i) => (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 bg-white rounded-xl border border-[#E8E5DF] flex items-center gap-2.5 text-xs font-medium text-[#111111]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Breakdown & Reviews Section */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E5DF] shadow-md space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DF] pb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">Guest Ratings & Reviews</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-[#C6A15B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C6A15B]" />
                    ))}
                  </div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#111111]">
                    {room.rating.toFixed(1)} out of 5 stars
                  </span>
                  <span className="text-xs text-neutral-500 font-light">({room.reviewCount} review)</span>
                </div>
              </div>

              <button
                onClick={() => setReviewModalOpen(true)}
                className="px-5 py-2.5 bg-[#111111] hover:bg-[#C6A15B] text-white hover:text-[#111111] text-xs font-medium uppercase tracking-widest rounded-lg transition-colors self-start sm:self-center"
              >
                Submit a Review
              </button>
            </div>

            {/* Rating Breakdown Graph */}
            <div className="space-y-3 max-w-md">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500">Rating Breakdown</div>
              <div className="space-y-2 text-xs font-light text-neutral-700">
                <div className="flex items-center gap-3">
                  <span className="w-8 font-medium">5★</span>
                  <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C6A15B] h-full w-full" />
                  </div>
                  <span className="w-6 text-right font-semibold">1</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-8 font-medium">4★</span>
                  <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C6A15B] h-full w-0" />
                  </div>
                  <span className="w-6 text-right">0</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-8 font-medium">3★</span>
                  <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C6A15B] h-full w-0" />
                  </div>
                  <span className="w-6 text-right">0</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-8 font-medium">2★</span>
                  <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C6A15B] h-full w-0" />
                  </div>
                  <span className="w-6 text-right">0</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-8 font-medium">1★</span>
                  <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C6A15B] h-full w-0" />
                  </div>
                  <span className="w-6 text-right">0</span>
                </div>
              </div>
            </div>

            {/* Verified Featured Review */}
            <div className="pt-6 border-t border-[#E8E5DF] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#111111] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-xs">
                    DA
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#111111] flex items-center gap-1.5">
                      <span>Dr. Babatunde Alabi</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-500 font-light">Verified Executive Stay</div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-400">July 24, 2026</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-light italic leading-relaxed">
                “Saffron exceeded all my expectations. The subtle luxury, immaculate cleanliness, 150m² of thoughtful spatial design, and flawless customer care made my business trip to Lagos unforgettable. 14B Providence Street is unmatched.”
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card with Dual Booking Triggers */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">Reserve Suite</span>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  ₦{room.pricePerNight.toLocaleString()}
                  <span className="text-xs text-neutral-400 font-light"> / night</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#C6A15B] font-semibold bg-[#1A1918] px-3 py-1 rounded-full border border-[#2C2B29]">
                <Star className="w-3.5 h-3.5 fill-[#C6A15B]" />
                <span>{room.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-[#C6A15B]" />
                    <span>Check-In</span>
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-[#C6A15B]" />
                    <span>Check-Out</span>
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests (Max)</option>
                </select>
              </div>
            </div>

            {/* Price Breakdown Table */}
            <div className="space-y-2.5 pt-4 border-t border-[#2C2B29] text-xs font-light text-neutral-300">
              <div className="flex justify-between">
                <span>₦{room.pricePerNight.toLocaleString()} × {nights} nights</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>7.5% VAT</span>
                <span>₦{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>5% Lagos Consumption Tax</span>
                <span>₦{consumptionTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-serif text-base sm:text-lg text-white font-semibold pt-3 border-t border-[#2C2B29]">
                <span>Total Estimated</span>
                <span className="text-[#C6A15B]">₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Dual Booking CTAs: Book Online vs Book via WhatsApp */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/book?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`}
                className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl group active:scale-95"
              >
                <span>Book Online</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#1A1918] hover:bg-[#252422] text-white border border-[#2C2B29] hover:border-[#C6A15B] font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                <span>Book on WhatsApp</span>
              </a>
            </div>

            <div className="text-[10px] sm:text-[11px] text-center text-neutral-400 font-light pt-1">
              🔒 Instant Confirmation • Guaranteed Best Rate at 14B Providence St.
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/30 max-w-lg w-full space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl text-white">Submit Guest Review for {room.name}</h3>

            {reviewSuccess ? (
              <div className="p-5 rounded-lg bg-[#1A1918] border border-[#C6A15B] text-center text-xs sm:text-sm text-[#C6A15B]">
                Thank you! Your review has been submitted for moderation.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-300 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Oluwaseun Davies"
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-4 py-2.5 text-xs text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-300 font-medium">Rating (1 to 5 Stars)</label>
                  <select className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-4 py-2.5 text-xs text-white mt-1">
                    <option value="5">⭐⭐⭐⭐⭐ (5.0 - Exceptional)</option>
                    <option value="4">⭐⭐⭐⭐ (4.0 - Very Good)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-300 font-medium">Review Comment</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your stay at 14B Providence Street..."
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-4 py-2.5 text-xs text-white mt-1"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
