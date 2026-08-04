'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Users, Tag, Search, ShieldCheck } from 'lucide-react';

export default function BookingSearchWidget() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('2026-08-15');
  const [checkOut, setCheckOut] = useState('2026-08-18');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [promoCode, setPromoCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
      promoCode,
    }).toString();
    router.push(`/book?${query}`);
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto -mt-10 sm:-mt-16 px-4">
      <div className="bg-[#111111]/95 backdrop-blur-xl border border-[#C6A15B]/30 rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8 text-white">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
          {/* Check-In */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Check-In Date</span>
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C6A15B] transition-colors"
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Check-Out Date</span>
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C6A15B] transition-colors"
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Guests</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="bg-[#1A1918] border border-[#2C2B29] rounded-lg px-2.5 py-3 text-xs text-white focus:outline-none focus:border-[#C6A15B] transition-colors"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
              </select>
              <select
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="bg-[#1A1918] border border-[#2C2B29] rounded-lg px-2.5 py-3 text-xs text-white focus:outline-none focus:border-[#C6A15B] transition-colors"
              >
                <option value="0">0 Kids</option>
                <option value="1">1 Kid</option>
                <option value="2">2 Kids</option>
              </select>
            </div>
          </div>

          {/* Promo Code */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-neutral-400" />
              <span>Promo Code</span>
            </label>
            <input
              type="text"
              placeholder="e.g. LEKKI20"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C6A15B] transition-colors uppercase tracking-wider"
            />
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group active:scale-95"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Check Rates</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-[#2C2B29] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 font-light gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#C6A15B]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Guaranteed Best Direct Booking Rates • Complimentary Airport Escort</span>
          </div>
          <div className="text-[10px] sm:text-[11px]">14B Providence Street, Lekki Phase 1, Lagos</div>
        </div>
      </div>
    </div>
  );
}
