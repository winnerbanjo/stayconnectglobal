'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import Link from 'next/link';
import { Gift, ArrowRight, Car, Plane, Heart, Briefcase, Home } from 'lucide-react';

const BUNDLED_PACKAGES = [
  {
    id: 'stay-drive',
    title: 'Stay & Drive Package',
    tagline: 'Executive Suite + Range Rover Chauffeur',
    desc: 'Combines an executive penthouse stay with dedicated Range Rover Autobiography chauffeur mobility for the entire duration of your visit in Lagos or Abuja.',
    icon: Car,
    tag: 'Popular Bundle',
    price: 'From ₦350,000 / night',
  },
  {
    id: 'stay-fly',
    title: 'Stay & Fly Package',
    tagline: 'Luxury Residence + VIP Tarmac Escort',
    desc: 'Includes Murtala Muhammed Airport VIP tarmac escort, private chauffeur pickup, champagne suite check-in, and priority departure assistance.',
    icon: Plane,
    tag: 'Airport Special',
    price: 'From ₦280,000 / night',
  },
  {
    id: 'romantic-escape',
    title: 'Romantic Getaway Package',
    tagline: 'Oceanfront Villa + Private Chef Dinner',
    desc: 'Custom floral arrangements, fine champagne, couples holistic spa treatment, and a 3-course private chef candlelit dinner setup.',
    icon: Heart,
    tag: 'Couples Retreat',
    price: 'From ₦420,000 / package',
  },
  {
    id: 'business-travel',
    title: 'Executive Business Travel Package',
    tagline: 'Serviced Suite + High-Speed Fiber + Boardroom',
    desc: 'Tailored for corporate travelers with 24/7 power, fiber WiFi, complimentary daily laundry, and boardroom meeting room access.',
    icon: Briefcase,
    tag: 'Corporate Travel',
    price: 'From ₦210,000 / night',
  },
  {
    id: 'relocation-longstay',
    title: 'Executive Relocation Package (14+ Days)',
    tagline: 'Extended Residence + Driver + Housekeeping',
    desc: 'Comprehensive relocation package with daily housekeeping, personal driver, and discounted long-term partner rates.',
    icon: Home,
    tag: 'Extended Stay',
    price: 'Save 25% on 14+ Nights',
  },
  {
    id: 'weekend-escape',
    title: 'Weekend Lifestyle Escape Package',
    tagline: 'Penthouse Suite + Lagoon Yacht Cruise',
    desc: 'Weekend luxury penthouse stay bundled with a 2-hour private Lagos lagoon yacht charter.',
    icon: Gift,
    tag: 'Weekend Special',
    price: 'From ₦550,000 / weekend',
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Hospitality Bundles & Curated Experiences
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Curated Stay & Mobility Packages.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Elevate your stay with integrated packages combining luxury accommodation, Range Rover mobility, private chefs, and airport VIP escorts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BUNDLED_PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <div
                key={i}
                className="bg-[#1A1918] border border-[#2C2B29] hover:border-[#C6A15B]/50 rounded-2xl p-8 flex flex-col justify-between transition-all group hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#252422] border border-[#3A3935] flex items-center justify-center text-[#C6A15B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-[#111111] border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase font-semibold rounded-full">
                      {pkg.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="text-xs text-[#C6A15B] font-medium mt-1">{pkg.tagline}</div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mt-3">{pkg.desc}</p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2C2B29] flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#C6A15B]">{pkg.price}</div>
                  <a
                    href={`https://wa.me/2347041008351?text=Hi%20Stay%20Connect,%20I%20want%20to%20reserve%20the%20${encodeURIComponent(pkg.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C6A15B] text-[#111111] font-semibold text-xs rounded-lg hover:bg-[#d8b46e] transition-colors"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
