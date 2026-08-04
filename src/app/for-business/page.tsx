'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import Link from 'next/link';
import { Building2, Briefcase, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, Zap, Users, Globe } from 'lucide-react';

const BUSINESS_SOLUTIONS = [
  {
    title: 'Direct Bookings & Distribution',
    description: 'Bypass legacy OTAs with high-margin direct guest bookings from verified global & African corporate travelers.',
    icon: Globe,
  },
  {
    title: 'Hospitality Operating System',
    description: 'Cloud dashboard for property management, room inventory, dynamic seasonal pricing, and housekeeping.',
    icon: Zap,
  },
  {
    title: 'Integrated Payment Gateway',
    description: 'Seamless multi-currency card payments, Paystack, bank transfers, and automated weekly partner payouts.',
    icon: TrendingUp,
  },
  {
    title: 'Corporate Travel Accounts',
    description: 'Dedicated portal for multinational companies, embassies, and firms booking long-stay suites.',
    icon: Briefcase,
  },
];

export default function ForBusinessPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Stay Connect Business & Hospitality Network
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Transforming Hospitality Operations Across Africa.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-3xl mx-auto leading-relaxed">
            Stay Connect Global empowers luxury hotels, serviced apartments, and corporate accommodation providers with modern digital infrastructure, direct bookings, and executive guest management.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/list-your-property"
              className="px-8 py-4 bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#d8b46e] transition-all shadow-xl hover:scale-105"
            >
              List Your Property
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-[#2C2B29] hover:border-[#C6A15B] text-white font-medium text-xs uppercase tracking-[0.2em] rounded-xl transition-all"
            >
              Request Corporate Account
            </Link>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 border-t border-[#2C2B29]">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">Why Hospitality Partners Join</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Platform Features & Operations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BUSINESS_SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div key={idx} className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-8 space-y-4 hover:border-[#C6A15B]/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#252422] border border-[#3A3935] flex items-center justify-center text-[#C6A15B]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">{sol.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">{sol.description}</p>
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
