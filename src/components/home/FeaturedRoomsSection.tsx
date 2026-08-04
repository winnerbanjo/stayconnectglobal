'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Users, Maximize, Bed, Bath, ArrowRight, ShieldCheck, Building2, Crown, CheckCircle2 } from 'lucide-react';
import { INITIAL_ROOMS, INITIAL_PROPERTIES } from '@/lib/data/seedData';

export default function FeaturedRoomsSection() {
  const saffronRoom = INITIAL_ROOMS.find((r) => r.slug === 'saffron') || INITIAL_ROOMS[0];

  // Partner Collection Properties
  const partnerCollection = INITIAL_PROPERTIES.filter((p) => p.partnerId);

  return (
    <section className="py-24 bg-[#FAF9F6] dark:bg-[#161514] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        {/* SECTION 1: STAY CONNECT COLLECTION (Directly Operated) */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                <Crown className="w-4 h-4" />
                <span>Stay Connect Collection</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] dark:text-white mt-2 font-normal">
                Directly Operated Flagships
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light max-w-md">
              Flagship luxury sanctuaries owned or directly managed by Stay Connect Global with 24/7 in-house butler service.
            </p>
          </div>

          {/* Hero Spotlight Card: SAFFRON EXECUTIVE SUITE */}
          <div className="bg-[#1A1918] rounded-2xl border border-[#2C2B29] hover:border-[#C6A15B]/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            {/* Image Showcase */}
            <div className="lg:col-span-7 relative min-h-[420px] bg-neutral-900 overflow-hidden">
              <Image
                src={saffronRoom.heroImage}
                alt="Saffron Executive Suite"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="px-3.5 py-1 bg-[#111111]/90 backdrop-blur-md text-[#C6A15B] text-xs uppercase tracking-widest font-semibold rounded-full border border-[#C6A15B]/40">
                  Stay Connect Flagship
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div className="text-xs tracking-widest uppercase font-light text-neutral-300">
                  📍 14B, Providence Street, Lekki Phase 1, Lagos
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#C6A15B]">
                  <Star className="w-4 h-4 fill-[#C6A15B]" />
                  <span>5.0 (Verified Sanctuary)</span>
                </div>
              </div>
            </div>

            {/* Saffron Content Details */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-light mb-2">
                  <span className="uppercase tracking-widest text-[#C6A15B] font-semibold">{saffronRoom.type} Suite</span>
                  <span>Managed Directly</span>
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl text-white font-normal mb-3">
                  {saffronRoom.name}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {saffronRoom.description}
                </p>

                {/* Spec Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#2C2B29] mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Capacity</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{saffronRoom.maxGuests} Guests</span>
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Size</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                      <Maximize className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{saffronRoom.propertySize} m²</span>
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Bedrooms</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                      <Bed className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{saffronRoom.bedrooms} BR</span>
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Bathrooms</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                      <Bath className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{saffronRoom.bathrooms} BA</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-[#2C2B29] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Nightly Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-semibold text-[#C6A15B]">
                      ₦{saffronRoom.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400 font-light">/ night</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/rooms/${saffronRoom.slug}`}
                    className="px-6 py-3 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] text-xs font-semibold uppercase tracking-widest rounded-lg transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Book Your Stay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PARTNER COLLECTION (Verified Third-Party Operator Listings) */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Partner Collection</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] dark:text-white mt-2 font-normal">
                Verified Hospitality Partners
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light max-w-md">
              Carefully selected hotels, apartments, villas, and residences operated by verified partners across Lagos & Abuja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ikoyi Waterfront Residences',
                location: 'Ikoyi, Lagos',
                category: 'Luxury Residence',
                desc: 'Onboarding penthouses and waterfront villas overlooking Five Cowries Creek. Are you a property owner in Ikoyi?',
                img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90',
              },
              {
                title: 'Maitama Diplomatic Suites',
                location: 'Maitama, Abuja',
                category: 'Serviced Apartment',
                desc: 'Onboarding high-security executive shortlet apartments in Abuja’s diplomatic enclave. Submit your property for verification.',
                img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90',
              },
              {
                title: 'Banana Island Luxury Villas',
                location: 'Banana Island, Lagos',
                category: 'Private Villa',
                desc: 'Onboarding private waterfront villas with infinity pools and helipad access for diplomatic stays.',
                img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=90',
              },
            ].map((prop, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1A1918] rounded-2xl border border-[#E8E5DF] dark:border-[#2C2B29] overflow-hidden hover:border-[#C6A15B]/60 transition-all flex flex-col justify-between group shadow-md hover:shadow-xl"
              >
                <div className="relative h-60 bg-neutral-900 overflow-hidden">
                  <img
                    src={prop.img}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Onboarding Queue</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#111111]/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] uppercase tracking-widest font-medium">
                    {prop.category}
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-semibold text-white">
                    📍 {prop.location}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-2xl text-[#111111] dark:text-white font-medium group-hover:text-[#C6A15B] transition-colors">
                      {prop.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light mt-2 leading-relaxed">
                      {prop.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500 font-medium">Partner Portal</div>
                      <div className="text-xs font-semibold text-[#C6A15B]">Open for Verification</div>
                    </div>

                    <Link
                      href="/list-your-property"
                      className="px-4 py-2 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                      <span>List Property</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

