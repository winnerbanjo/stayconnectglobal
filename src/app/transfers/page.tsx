'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Plane, ShieldCheck, CheckCircle2, Phone, Calendar, Clock, MapPin } from 'lucide-react';

export default function TransfersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [transferType, setTransferType] = useState<'pickup' | 'dropoff'>('pickup');

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            VIP Airport Concierge & Transfers
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Executive Airport Pickups & Tarmac Escort.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Seamless airport arrival and departure at Murtala Muhammed Airport (Lagos), Nnamdi Azikiwe Airport (Abuja), and Port Harcourt. Range Rover Autobiography & Mercedes S-Class fleet.
          </p>
        </div>

        <div className="bg-[#1A1918] border border-[#2C2B29] rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C6A15B] mx-auto" />
              <h2 className="font-serif text-3xl text-white">Airport Transfer Reserved!</h2>
              <p className="text-sm text-neutral-300">Our concierge protocol officer will contact you shortly to confirm flight details.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-[#2C2B29] pb-4">
                <button
                  type="button"
                  onClick={() => setTransferType('pickup')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    transferType === 'pickup' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#111111] text-neutral-400'
                  }`}
                >
                  Airport Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setTransferType('dropoff')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    transferType === 'dropoff' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#111111] text-neutral-400'
                  }`}
                >
                  Airport Drop-off
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Guest Name *</label>
                  <input required type="text" placeholder="e.g. Dr. Babatunde Alabi" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Phone Number / WhatsApp *</label>
                  <input required type="tel" placeholder="+234 803 123 4567" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Flight Number & Airline *</label>
                  <input required type="text" placeholder="e.g. BA0075 (British Airways)" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C6A15B] font-semibold">Arrival / Pickup Date & Time *</label>
                  <input required type="datetime-local" className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white" style={{ colorScheme: 'dark' }} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl"
              >
                Confirm Airport Transfer Reservation →
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
