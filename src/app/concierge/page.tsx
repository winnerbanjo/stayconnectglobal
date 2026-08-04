'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { ConciergeBell, CheckCircle2, ShieldCheck, Utensils, Crown, Shield, Heart, User, Clock } from 'lucide-react';

const CONCIERGE_SERVICES = [
  { name: 'Private Chef Service', desc: 'Michelin-trained chefs for in-suite private dining.', icon: Utensils },
  { name: 'VIP Security & Escort', desc: 'Armed security officers & convoy escorts across Lagos & Abuja.', icon: Shield },
  { name: 'Proposal & Romantic Setup', desc: 'Custom floral arrangements, champagne, and violinist setups.', icon: Heart },
  { name: 'Restaurant Reservations', desc: 'Priority access to high-end lounges & fine dining venues.', icon: Crown },
  { name: 'Personal Chauffeur', desc: 'Dedicated driver on hourly or daily availability.', icon: User },
  { name: 'Express Laundry & Dry Cleaning', desc: 'Same-day luxury garment care and pressing.', icon: Clock },
];

export default function ConciergePage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Private Chef Service');

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Stay Connect Lifestyle Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Hospitality Concierge Services.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Elevate your stay with bespoke lifestyle management. From private chefs and VIP armed security to romantic proposal setups and fine dining access.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CONCIERGE_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-6 space-y-3 hover:border-[#C6A15B]/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#252422] border border-[#3A3935] flex items-center justify-center text-[#C6A15B]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-white">{srv.name}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Concierge Booking Request Form */}
        <div className="bg-[#1A1918] border border-[#2C2B29] rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C6A15B] mx-auto" />
              <h2 className="font-serif text-3xl text-white">Concierge Request Dispatched!</h2>
              <p className="text-sm text-neutral-300">Your dedicated lifestyle manager is processing your request and will contact you within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <h3 className="font-serif text-2xl text-white border-b border-[#2C2B29] pb-4">Request Concierge Assistance</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Service Required *</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white"
                  >
                    {CONCIERGE_SERVICES.map((s, i) => (
                      <option key={i} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Guest Name *</label>
                  <input required type="text" placeholder="e.g. Chief Davies" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Phone / WhatsApp Number *</label>
                  <input required type="tel" placeholder="+234 803 123 4567" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Preferred Date & Time *</label>
                  <input required type="datetime-local" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" style={{ colorScheme: 'dark' }} />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Special Instructions or Notes</label>
                  <textarea rows={3} placeholder="Describe dietary preferences, security detail requests, or specific arrangements..." className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl"
              >
                Submit Concierge Request →
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
