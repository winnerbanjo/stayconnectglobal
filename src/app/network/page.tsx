'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import Link from 'next/link';
import { Crown, Building2, Car, ConciergeBell, Compass, Briefcase, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

const ECOSYSTEM_PILLARS = [
  {
    title: 'Stay Connect Collection',
    desc: 'Flagship luxury sanctuaries owned and operated directly by Stay Connect Global with 24/7 in-house butler service and signature amenities.',
    link: '/rooms',
    icon: Crown,
    badge: 'Direct Flagships',
  },
  {
    title: 'Hospitality Partners',
    desc: 'Carefully vetted boutique hotels, serviced apartments, and luxury villas operated by verified hospitality partners across West Africa.',
    link: '/list-your-property',
    icon: Building2,
    badge: 'Partner Network',
  },
  {
    title: 'Executive Mobility Fleet',
    desc: 'Armoured SUVs, Range Rovers, Mercedes-Maybach sedans, and luxury yacht charters with diplomatic protocol chauffeurs.',
    link: '/car-rentals',
    icon: Car,
    badge: 'Chauffeur Fleet',
  },
  {
    title: 'Lifestyle Concierge',
    desc: 'VIP airport tarmac escorts, private Michelin chefs, restaurant reservations, proposal setups, and security detail.',
    link: '/concierge',
    icon: ConciergeBell,
    badge: 'Lifestyle Desk',
  },
  {
    title: 'Curated Experiences',
    desc: 'Lagoon yacht cruises, wellness spa retreats, contemporary art tours, and exclusive dining masterclasses.',
    link: '/experiences',
    icon: Compass,
    badge: 'Experiences',
  },
  {
    title: 'Corporate Travel Solutions',
    desc: 'Tailored accounts for corporate firms, embassies, and multinationals requiring long-stay executive accommodation.',
    link: '/for-business',
    icon: Briefcase,
    badge: 'Corporate Accounts',
  },
];

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Header Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Stay Connect Global Network
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            An Integrated African Hospitality Ecosystem.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-3xl mx-auto leading-relaxed">
            Stay Connect Global is more than a single destination. We unite premier accommodation, chauffeur transportation, lifestyle concierge, and corporate travel under one trusted platform.
          </p>
        </section>

        {/* Ecosystem Pillars Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ECOSYSTEM_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
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
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed mt-3">{pillar.desc}</p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#2C2B29]">
                    <Link
                      href={pillar.link}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#C6A15B] hover:text-white transition-colors"
                    >
                      <span>Explore {pillar.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
