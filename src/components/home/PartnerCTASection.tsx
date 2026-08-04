'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, ArrowRight, Shield, TrendingUp, Globe, Users } from 'lucide-react';

const BENEFITS = [
  'Receive direct platform bookings',
  'Real-time property inventory & room pricing',
  'Integrated payment management & instant payouts',
  'Guest communication & concierge request tools',
  'Revenue analytics & occupancy reporting',
  'Online visibility across Nigeria & Africa',
];

export default function PartnerCTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#161514] via-[#111111] to-[#0A0A0A] text-white border-t border-[#2C2B29] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="bg-[#1A1918] border border-[#C6A15B]/40 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Partner Onboarding</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Grow Your Hospitality Business with Stay Connect Global.
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                Whether you operate a boutique hotel, luxury serviced apartments, private villas, or lifestyle concierge services—onboard your property to access high-value guests and enterprise management software.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {BENEFITS.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/list-your-property"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105"
                >
                  <span>List Your Property Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/for-business"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#2C2B29] hover:border-[#C6A15B] text-neutral-300 hover:text-white font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <span>Why Join Us</span>
                </Link>
              </div>
            </div>

            {/* Visual Card Graphic */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111] border border-[#2C2B29] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                  <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-wider">Partner Benefits Overview</div>
                  <TrendingUp className="w-5 h-5 text-[#C6A15B]" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-[#1A1918]">
                    <Globe className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-medium text-white">Global & Regional Reach</div>
                      <div className="text-[11px] text-neutral-400">Expose your listings to elite travelers and corporate clients across West Africa.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-[#1A1918]">
                    <Shield className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-medium text-white">Verified Guest Network</div>
                      <div className="text-[11px] text-neutral-400">All guests undergo platform identity checks and seamless digital payments.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-[#1A1918]">
                    <Users className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-medium text-white">Dedicated Partner Portal</div>
                      <div className="text-[11px] text-neutral-400">Full dashboard control over calendar, rates, reservations, and payouts.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
