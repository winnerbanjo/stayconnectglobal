'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Users, Maximize, Bed, Bath, Wifi, Wind, Tv, ArrowRight, ShieldCheck } from 'lucide-react';
import { INITIAL_ROOMS } from '@/lib/data/seedData';

export default function FeaturedRoomsSection() {
  const saffronRoom = INITIAL_ROOMS.find((r) => r.slug === 'saffron') || INITIAL_ROOMS[0];
  const otherRooms = INITIAL_ROOMS.filter((r) => r.slug !== 'saffron');

  return (
    <section className="py-24 bg-[#FAF9F6] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E5DF] pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Curated Accommodations
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-2 font-normal">
              Flagship Suites & Residences
            </h2>
          </div>
          <p className="text-neutral-600 text-sm font-light max-w-md">
            Every suite is an editorial sanctuary featuring generous layout proportions, natural light, and quiet Lagos sophistication.
          </p>
        </div>

        {/* Hero Spotlight Card: SAFFRON EXECUTIVE SUITE */}
        <div className="bg-white rounded-2xl border border-[#E8E5DF] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
          {/* Image Gallery Showcase */}
          <div className="lg:col-span-7 relative min-h-[420px] bg-neutral-900 overflow-hidden">
            <Image
              src={saffronRoom.heroImage}
              alt="Saffron Executive Single Room"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="px-3.5 py-1 bg-[#111111]/90 backdrop-blur-md text-[#C6A15B] text-xs uppercase tracking-widest font-medium rounded-full border border-[#C6A15B]/40">
                {saffronRoom.badge || 'TLC ⭐⭐⭐⭐⭐'}
              </span>
              <span className="px-3.5 py-1 bg-[#C6A15B] text-[#111111] text-xs uppercase tracking-widest font-semibold rounded-full shadow-md">
                Flagship Suite
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
              <div className="text-xs tracking-widest uppercase font-light">
                📍 14B, Providence Street, Lekki, Lagos
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#C6A15B]">
                <Star className="w-4 h-4 fill-[#C6A15B]" />
                <span>5.0 (1 Review)</span>
              </div>
            </div>
          </div>

          {/* Saffron Content Details */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 font-light mb-2">
                <span className="uppercase tracking-widest text-[#C6A15B] font-semibold">{saffronRoom.type} Single Room</span>
                <span>ID: {saffronRoom.slug}</span>
              </div>
              <h3 className="font-serif text-3xl lg:text-4xl text-[#111111] font-normal mb-3">
                {saffronRoom.name}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                {saffronRoom.description}
              </p>

              {/* Spec Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#E8E5DF] mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Capacity</span>
                  <span className="text-xs font-semibold text-[#111111] flex items-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{saffronRoom.maxGuests} Guests</span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Property Size</span>
                  <span className="text-xs font-semibold text-[#111111] flex items-center gap-1 mt-0.5">
                    <Maximize className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{saffronRoom.propertySize} m²</span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Bedrooms</span>
                  <span className="text-xs font-semibold text-[#111111] flex items-center gap-1 mt-0.5">
                    <Bed className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{saffronRoom.bedrooms} BR</span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Bathrooms</span>
                  <span className="text-xs font-semibold text-[#111111] flex items-center gap-1 mt-0.5">
                    <Bath className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{saffronRoom.bathrooms} BA</span>
                  </span>
                </div>
              </div>

              {/* Key Amenities */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">Included Amenities</span>
                <div className="flex flex-wrap gap-2">
                  {saffronRoom.amenities.map((am, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5DF] text-[11px] text-neutral-700 rounded-full font-light">
                      {am}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-4 border-t border-[#E8E5DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Nightly Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-semibold text-[#111111]">
                    ₦{saffronRoom.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500 font-light">/ night</span>
                </div>
                <span className="text-[10px] text-[#C6A15B] font-medium">Weekend: ₦{saffronRoom.weekendPricePerNight?.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/rooms/${saffronRoom.slug}`}
                  className="px-5 py-3 border border-[#111111] text-xs font-medium uppercase tracking-widest rounded text-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                >
                  View Details
                </Link>
                <Link
                  href={`/book?room=${saffronRoom.slug}`}
                  className="px-6 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] text-xs font-medium uppercase tracking-widest rounded transition-all shadow-md flex items-center gap-2"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Suite Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {otherRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div className="relative h-64 bg-neutral-900 overflow-hidden">
                <Image
                  src={room.heroImage}
                  alt={room.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#111111]/80 backdrop-blur-md px-3 py-1 rounded text-[#C6A15B] text-[10px] uppercase tracking-widest">
                  {room.type}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-serif">
                  ₦{room.pricePerNight.toLocaleString()} / night
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-2xl text-[#111111] font-normal">{room.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-[#C6A15B] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#C6A15B]" />
                    <span>{room.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 font-light line-clamp-2">{room.description}</p>

                <div className="flex items-center justify-between text-xs text-neutral-500 font-light pt-2 border-t border-[#E8E5DF]">
                  <span>{room.maxGuests} Guests • {room.propertySize} m²</span>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="text-[#C6A15B] hover:text-[#111111] font-medium uppercase tracking-widest text-[11px] flex items-center gap-1"
                  >
                    <span>View Suite</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
