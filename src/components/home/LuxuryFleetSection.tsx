'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, ShieldCheck, UserCheck, Clock, ArrowRight } from 'lucide-react';
import { INITIAL_MOBILITY } from '@/lib/data/seedData';

export default function LuxuryFleetSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#161514] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold flex items-center gap-2">
              <Car className="w-4 h-4" />
              <span>Stay Connect Mobility Platform</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
              Luxury Mobility & Airport Transfers
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
              From executive airport pick-ups to full-day chauffeur service, Range Rovers, and private yachts in Lagos and Abuja.
            </p>
          </div>

          <Link
            href="/car-rentals"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#C6A15B] text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#111111] transition-all shrink-0 self-start md:self-auto"
          >
            <span>Browse Full Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_MOBILITY.map((vehicle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl overflow-hidden group hover:border-[#C6A15B]/50 transition-all flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase tracking-wider font-semibold rounded-full">
                  {vehicle.category}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                    {vehicle.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-1">Available in: {vehicle.availableCities.join(', ')}</div>

                  <ul className="mt-4 space-y-1.5 text-xs text-neutral-300 font-light">
                    {vehicle.features.slice(0, 3).map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-neutral-400">Daily Rate</div>
                    <div className="text-lg font-semibold text-[#C6A15B]">
                      ₦{vehicle.dailyRate.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">/ day</span>
                    </div>
                  </div>

                  <Link
                    href={`/car-rentals?vehicle=${vehicle.vehicleId}`}
                    className="px-4 py-2 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs rounded-lg transition-colors"
                  >
                    Reserve Vehicle
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
