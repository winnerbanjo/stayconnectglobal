'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, CheckCircle2, Car, Plane, Sparkles, Heart, Briefcase, Home } from 'lucide-react';

const PACKAGES = [
  {
    id: 'stay-drive',
    title: 'Stay & Drive Package',
    tagline: 'Luxury Suite + Range Rover Chauffeur',
    desc: 'Combines an executive penthouse stay with dedicated Range Rover Autobiography chauffeur mobility for the entire duration.',
    icon: Car,
    tag: 'Popular Bundle',
    price: 'From ₦350,000 / night',
  },
  {
    id: 'stay-fly',
    title: 'Stay & Fly Package',
    tagline: 'Luxury Residence + VIP Tarmac Escort',
    desc: 'Includes Murtala Muhammed Airport VIP tarmac escort, private airport transfer, and champagne suite check-in.',
    icon: Plane,
    tag: 'Airport Special',
    price: 'From ₦280,000 / night',
  },
  {
    id: 'romantic-escape',
    title: 'Romantic Getaway',
    tagline: 'Oceanfront Villa + Private Chef Dinner',
    desc: 'Custom floral arrangements, fine champagne, couples holistic spa, and 3-course private chef candlelit dinner.',
    icon: Heart,
    tag: 'Couples Retreat',
    price: 'From ₦420,000 / package',
  },
  {
    id: 'business-travel',
    title: 'Executive Business Travel',
    tagline: 'Serviced Suite + High-Speed Fiber + Boardroom',
    desc: 'Tailored for corporate travelers with 24/7 power, fiber WiFi, laundry credit, and boardroom meeting room access.',
    icon: Briefcase,
    tag: 'Corporate Travel',
    price: 'From ₦210,000 / night',
  },
  {
    id: 'relocation-longstay',
    title: 'Executive Relocation (14+ Days)',
    tagline: 'Extended Residence + Driver + Housekeeping',
    desc: 'Comprehensive relocation package with daily housekeeping, private driver, and discounted long-term partner rates.',
    icon: Home,
    tag: 'Extended Stay',
    price: 'Save 25% on 14+ Nights',
  },
  {
    id: 'weekend-escape',
    title: 'Weekend Lifestyle Escape',
    tagline: 'Suite + Lagoon Yacht Cruise',
    desc: 'Weekend luxury penthouse stay bundled with a 2-hour private Lagos lagoon yacht charter.',
    icon: Gift,
    tag: 'Weekend Special',
    price: 'From ₦550,000 / weekend',
  },
];

export default function HospitalityPackagesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#161514] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>Bundled Hospitality Experiences</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
              Curated Stay & Mobility Packages
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
              Elevate your stay with integrated packages combining luxury accommodation, Range Rover mobility, private chefs, and airport VIP escorts.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#C6A15B] text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#111111] transition-all shrink-0 self-start md:self-auto"
          >
            <span>Browse All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#C6A15B]/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] dark:bg-[#252422] border border-[#E8E5DF] dark:border-[#3A3935] flex items-center justify-center text-[#C6A15B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-[#FAF9F6] dark:bg-[#111111] border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase font-semibold rounded-full">
                      {pkg.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#111111] dark:text-white group-hover:text-[#C6A15B] transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="text-xs text-[#C6A15B] font-medium mt-1">{pkg.tagline}</div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mt-3">{pkg.desc}</p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#C6A15B]">{pkg.price}</div>
                  <Link
                    href={`/packages#${pkg.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] dark:text-white group-hover:text-[#C6A15B] transition-colors"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
