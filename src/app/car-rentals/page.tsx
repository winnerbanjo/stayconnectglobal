'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Car, ShieldCheck, Clock, UserCheck, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { INITIAL_MOBILITY } from '@/lib/data/seedData';

export default function CarRentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const categories = ['All', 'SUV', 'Luxury Sedan', 'Executive Bus', 'Yacht'];

  const filteredFleet = selectedCategory === 'All'
    ? INITIAL_MOBILITY
    : INITIAL_MOBILITY.filter((v) => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Stay Connect Luxury Mobility
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Chauffeur Mobility & Fleet Rental Platform.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Executive SUVs, armoured vehicles, Maybach sedans, and private yacht charters with professional diplomatic drivers in Lagos, Abuja, and Port Harcourt.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C6A15B] text-[#111111]'
                  : 'bg-[#1A1918] border border-[#2C2B29] text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fleet Grid / Luxury Empty State */}
        {filteredFleet.length === 0 ? (
          <div className="bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] dark:bg-[#252422] border border-[#E8E5DF] dark:border-[#3A3935] text-[#C6A15B] flex items-center justify-center mx-auto">
              <Car className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                Onboarding Mobility Fleet
              </span>
              <h2 className="font-serif text-3xl text-[#111111] dark:text-white">
                Executive Chauffeur Fleet Coming Soon
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Our Range Rover Autobiography LWB, Mercedes-Maybach, and Private Yacht fleet is currently undergoing verification for Lagos & Abuja.
                Need immediate executive transport? Contact our 24/7 Concierge.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/2347041008351?text=Hello%20Stay%20Connect%20Concierge,%20I%20would%20like%20to%20request%20executive%20chauffeur%20mobility."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Request Chauffeur via WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredFleet.map((veh, idx) => (
              <div key={idx} className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl overflow-hidden group hover:border-[#C6A15B]/50 transition-all flex flex-col justify-between">
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={veh.image}
                    alt={veh.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase tracking-wider font-semibold rounded-full">
                    {veh.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                      {veh.name}
                    </h3>
                    <div className="text-xs text-neutral-400 mt-1">Cities: {veh.availableCities.join(', ')}</div>

                    <div className="mt-4 space-y-2 text-xs text-neutral-300">
                      {veh.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase text-neutral-400">Daily Rate</div>
                      <div className="text-xl font-semibold text-[#C6A15B]">
                        ₦{veh.dailyRate.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">/ day</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/2347041008351?text=Hi%20Stay%20Connect,%20I%20want%20to%20reserve%20the%20${encodeURIComponent(veh.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Reserve</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
