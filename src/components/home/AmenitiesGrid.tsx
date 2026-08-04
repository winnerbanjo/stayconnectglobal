'use client';

import React from 'react';
import Link from 'next/link';
import { Waves, Utensils, Dumbbell, ShieldCheck, Zap, Wifi, Wine, Coffee, Car, HeartPulse } from 'lucide-react';

export default function AmenitiesGrid() {
  const amenitiesList = [
    {
      icon: Waves,
      title: 'Infinity Swimming Pool',
      desc: 'Heated rooftop pool with private sun cabanas and cocktail service overlooking Lekki.'
    },
    {
      icon: Utensils,
      title: 'Aura Fine Dining Restaurant',
      desc: 'Michelin-inspired Pan-African & Mediterranean cuisine open for breakfast, lunch, and dinner.'
    },
    {
      icon: Dumbbell,
      title: 'Technogym Fitness Studio',
      desc: 'State-of-the-art cardiovascular and strength training equipment open 24 hours.'
    },
    {
      icon: HeartPulse,
      title: 'Holistic Wellness Spa',
      desc: 'Therapeutic aromatherapy, deep tissue massages, and custom facial treatments.'
    },
    {
      icon: Wine,
      title: 'Sommelier Wine Bar & Lounge',
      desc: 'Curated vintage wines, rare scotches, and artisanal Lagos mixology.'
    },
    {
      icon: Car,
      title: 'Private Chauffeur & Airport Transport',
      desc: 'Mercedes S-Class & Range Rover airport transfers with VIP tarmac escort.'
    },
    {
      icon: ShieldCheck,
      title: '24/7 Guards & CCTV Patrol',
      desc: 'Highest tier private security protocol and controlled perimeter entry.'
    },
    {
      icon: Zap,
      title: 'Dual Redundant Power Generators',
      desc: 'Guaranteed 100% uninterrupted electricity and high-capacity air conditioning.'
    }
  ];

  return (
    <section className="py-24 bg-[#FAF9F6] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
            Uncompromising Excellence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#111111] font-normal">
            Hotel Amenities & Services
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Designed to meet the rigorous demands of international diplomats, business leaders, and discerning travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenitiesList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-[#E8E5DF] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-[#111111] text-[#C6A15B] flex items-center justify-center mb-6 group-hover:bg-[#C6A15B] group-hover:text-[#111111] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] font-medium mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/amenities"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] hover:bg-[#C6A15B] text-white hover:text-[#111111] text-xs font-medium uppercase tracking-[0.2em] rounded transition-all shadow-md"
          >
            <span>Explore All 24+ Amenities</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
