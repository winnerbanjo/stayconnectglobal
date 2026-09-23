'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DestinationsSection() {
  const [properties, setProperties] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/properties').then(r => r.json()).then(j => {
      if (j.success) setProperties(j.data);
    }).catch(() => {});
  }, []);
  const destinations = [...new Set(properties.map(p => p.area || p.city))].filter(Boolean).map(name => {
    const listings = properties.filter(p => (p.area || p.city) === name);
    return { name, city: listings[0].city, propertiesCount: `${listings.length} ${listings.length === 1 ? 'property' : 'properties'}`, image: listings[0].heroImage, tag: 'Explore stays', slug: name };
  });
  if (!destinations.length) return null;
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#00AEEF] font-semibold flex items-center gap-2">
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#00AEEF] text-xs font-semibold uppercase tracking-wider text-[#00AEEF] hover:bg-[#00AEEF] hover:text-[#111111] transition-all shrink-0 self-start md:self-auto"
          >
            <span>View All Locations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/rooms?city=${encodeURIComponent(dest.slug)}`}
                className="group relative block h-80 rounded-2xl overflow-hidden border border-[#2C2B29] hover:border-[#00AEEF]/60 transition-all shadow-xl"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#00AEEF]/40 text-[#00AEEF] text-[10px] uppercase tracking-wider font-semibold rounded-full">
                  {dest.tag}
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                  <div className="text-xs text-neutral-300 font-light flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />
                    <span>{dest.city}, Nigeria</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium group-hover:text-[#00AEEF] transition-colors">
                    {dest.name}
                  </h3>
                  <div className="text-xs text-[#00AEEF] font-semibold pt-1 flex items-center gap-1">
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
