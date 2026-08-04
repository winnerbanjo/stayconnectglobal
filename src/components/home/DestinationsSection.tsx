'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const DESTINATIONS = [
  {
    name: 'Lekki Phase 1',
    city: 'Lagos',
    propertiesCount: '18 Places to Stay',
    image: '/images/saffron/saffron-1.jpg',
    tag: 'Flagship Sanctuary',
    slug: 'Lagos',
  },
  {
    name: 'Ikoyi',
    city: 'Lagos',
    propertiesCount: '12 Luxury Residences',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90',
    tag: 'Waterfront Penthouses',
    slug: 'Lagos',
  },
  {
    name: 'Banana Island',
    city: 'Lagos',
    propertiesCount: '6 Private Villas',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=90',
    tag: 'Ultra-Private Enclave',
    slug: 'Lagos',
  },
  {
    name: 'Victoria Island',
    city: 'Lagos',
    propertiesCount: '15 Executive Suites',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=90',
    tag: 'Financial District',
    slug: 'Lagos',
  },
  {
    name: 'Maitama & Asokoro',
    city: 'Abuja',
    propertiesCount: '10 Diplomatic Residences',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90',
    tag: 'Diplomatic Enclave',
    slug: 'Abuja',
  },
  {
    name: 'GRA & Waterlines',
    city: 'Port Harcourt',
    propertiesCount: '8 Executive Shortlets',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90',
    tag: 'Oil & Gas Hub',
    slug: 'Port Harcourt',
  },
];

export default function DestinationsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Featured Destinations</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
              Explore Places to Stay by Destination
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
              Discover curated luxury accommodation and chauffeur services across West Africa’s premier business and residential enclaves.
            </p>
          </div>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#C6A15B] text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#111111] transition-all shrink-0 self-start md:self-auto"
          >
            <span>View All Locations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/rooms?city=${encodeURIComponent(dest.slug)}`}
                className="group relative block h-80 rounded-2xl overflow-hidden border border-[#2C2B29] hover:border-[#C6A15B]/60 transition-all shadow-xl"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase tracking-wider font-semibold rounded-full">
                  {dest.tag}
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                  <div className="text-xs text-neutral-300 font-light flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{dest.city}, Nigeria</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium group-hover:text-[#C6A15B] transition-colors">
                    {dest.name}
                  </h3>
                  <div className="text-xs text-[#C6A15B] font-semibold pt-1 flex items-center gap-1">
                    <span>{dest.propertiesCount}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
