'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Home, Hotel, Plane, Car, Compass, ConciergeBell, Briefcase, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    icon: Hotel,
    title: 'Luxury Hotels',
    subtitle: 'Premium hotels operated by Stay Connect & trusted hospitality partners.',
    link: '/rooms?category=Luxury+Hotel',
  },
  {
    icon: Building2,
    title: 'Serviced Apartments',
    subtitle: 'Executive apartments for short and extended stays in prime business districts.',
    link: '/rooms?category=Serviced+Apartment',
  },
  {
    icon: Home,
    title: 'Luxury Residences',
    subtitle: 'Private villas, penthouses, holiday homes, and corporate residences.',
    link: '/rooms?category=Luxury+Residence',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    subtitle: 'Executive pickups, luxury SUVs, chauffeurs, and airport assistance.',
    link: '/transfers',
  },
  {
    icon: Car,
    title: 'Car Rentals',
    subtitle: 'Luxury vehicles, business travel, weekend rentals, self-drive or chauffeur-driven.',
    link: '/car-rentals',
  },
  {
    icon: Compass,
    title: 'Curated Experiences',
    subtitle: 'Private chefs, boat cruises, spa bookings, romantic setups, and city tours.',
    link: '/experiences',
  },
  {
    icon: ConciergeBell,
    title: 'Hospitality Concierge',
    subtitle: 'Restaurant reservations, laundry, airport assistance, VIP security, and event setup.',
    link: '/concierge',
  },
  {
    icon: Briefcase,
    title: 'Business Travel',
    subtitle: 'Corporate accommodation, long stays, conference bookings, and executive travel.',
    link: '/for-business',
  },
];

export default function CategoryOfferings() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
            An Integrated Luxury Hospitality Ecosystem
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
            Discover curated accommodation, executive chauffeur mobility, bespoke experiences, and corporate travel solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={cat.link}
                  className="group bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#C6A15B]/60 rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] dark:bg-[#252422] border border-[#E8E5DF] dark:border-[#3A3935] flex items-center justify-center text-[#C6A15B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#111111] dark:text-white font-medium group-hover:text-[#C6A15B] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mt-2">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex items-center justify-between text-xs text-[#C6A15B] font-semibold">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
