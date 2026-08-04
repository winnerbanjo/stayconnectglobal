'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, MapPin, Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2, Building2, Car, Crown, Compass } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-white border-t border-[#2C2B29] pt-16 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-12 sm:space-y-20">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-20 border-b border-[#2C2B29]">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold">
              The Hospitality Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.15]">
              Discover curated luxury stays, chauffeur mobility, and bespoke experiences.
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-lg leading-relaxed">
              Quiet luxury and extraordinary hospitality delivered directly to your inbox. No noise. Only elevated African hospitality moments.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-5 sm:p-6 rounded-xl bg-[#1A1918] border border-[#C6A15B]/40 flex items-center gap-3 text-xs text-[#C6A15B]">
                <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0" />
                <span>Thank you for subscribing to Stay Connect Global.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-[#1A1918] border border-[#2C2B29] px-5 py-3.5 sm:px-6 sm:py-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C6A15B] transition-colors rounded-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-[11px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <span>Join Registry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-neutral-500 mt-3 font-light tracking-wider">
              By subscribing you agree to our privacy protocol and platform terms.
            </span>
          </div>
        </div>

        {/* Structured Editorial Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-[#2C2B29]">
          {/* Brand & Address */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative h-12 sm:h-16 w-52 sm:w-64">
                <img
                  src="/images/logo.png"
                  alt="Stay Connect Global Logo"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed font-light pr-2 sm:pr-4">
              Stay Connect Global is a luxury hospitality platform and ecosystem connecting guests with carefully curated hotels, serviced apartments, premium residences, chauffeur mobility, and concierge experiences across Nigeria.
            </p>
            <div className="space-y-2.5 text-xs text-neutral-300 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>Headquarters: Providence Street, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>+234 704 100 8351</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>partners@stayconnectglobal.com</span>
              </div>
            </div>
          </div>

          {/* Column 1: Accommodation Categories */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Explore Collection</span>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li>
                <Link href="/rooms?category=Luxury+Hotel" className="hover:text-[#C6A15B] transition-colors">
                  Luxury Hotels & Resorts
                </Link>
              </li>
              <li>
                <Link href="/rooms?category=Serviced+Apartment" className="hover:text-[#C6A15B] transition-colors">
                  Serviced Executive Apartments
                </Link>
              </li>
              <li>
                <Link href="/rooms?category=Luxury+Residence" className="hover:text-[#C6A15B] transition-colors">
                  Private Penthouses & Villas
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#C6A15B] transition-colors font-medium text-[#C6A15B]">
                  Browse All Stays →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Mobility & Concierge */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" />
              <span>Mobility & Services</span>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li>
                <Link href="/car-rentals" className="hover:text-[#C6A15B] transition-colors">
                  Luxury Fleet & SUVs
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="hover:text-[#C6A15B] transition-colors">
                  Airport Transfers & Pickups
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#C6A15B] transition-colors">
                  Yacht Charters & Dining
                </Link>
              </li>
              <li>
                <Link href="/concierge" className="hover:text-[#C6A15B] transition-colors">
                  VIP Concierge & Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Hospitality Partners */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              <span>Hospitality Partners</span>
            </div>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Onboard your hotel, shortlet, or residence to receive direct bookings and management tools.
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/list-your-property"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C6A15B] text-[#111111] rounded-lg text-xs font-semibold hover:bg-[#d8b46e] transition-all"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/for-business"
                className="inline-flex items-center justify-center gap-2 text-xs text-[#C6A15B] hover:underline mt-1"
              >
                <span>Business Solutions & Corporate Travel →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-light text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Stay Connect Global. Luxury Hospitality Platform & Ecosystem. Lagos, Abuja, Port Harcourt.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C6A15B] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
