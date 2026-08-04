'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, MapPin, Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    <footer className="bg-[#111111] text-white border-t border-[#2C2B29] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 space-y-20">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#2C2B29]">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold">
              The Guest Journal
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white font-normal leading-[1.15]">
              Receive private invitations, curated Lagos experiences, and preferential rates.
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm font-light max-w-lg leading-relaxed">
              Quiet luxury delivered directly to your inbox. No noise. Only elevated hospitality moments.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-6 rounded-xl bg-[#1A1918] border border-[#C6A15B]/40 flex items-center gap-3 text-xs text-[#C6A15B]">
                <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0" />
                <span>Thank you. You have been registered in our private guest directory.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-[#1A1918] border border-[#2C2B29] px-6 py-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C6A15B] transition-colors rounded-none"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-[11px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Join Registry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-neutral-500 mt-3 font-light tracking-wider">
              By subscribing you agree to our privacy protocol and reservation terms.
            </span>
          </div>
        </div>

        {/* Structured Editorial Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2C2B29]">
          {/* Brand & Address */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-44">
                <img
                  src="/images/logo.png"
                  alt="Stay Connect Hotels Logo"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed font-light pr-4">
              Stay Connect Hotels is Lekki’s premier luxury hospitality destination, offering editorial single executive suites, penthouses, fine dining, and private lagoon concierge in Lagos, Nigeria.
            </p>
            <div className="space-y-2 text-xs text-neutral-300 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>14B, Providence Street, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>+234 704 100 8351</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>concierge@stayconnecthotels.com</span>
              </div>
            </div>
          </div>

          {/* Directory Column 1: Suites */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">
              Accommodations
            </div>
            <ul className="space-y-3 text-xs text-neutral-300 font-light">
              <li>
                <Link href="/rooms/saffron" className="hover:text-[#C6A15B] transition-colors flex items-center gap-2">
                  <span>Saffron Executive Suite (14B Providence)</span>
                  <span className="text-[9px] px-2 py-0.5 bg-[#C6A15B]/20 text-[#C6A15B] rounded font-semibold uppercase">Flagship</span>
                </Link>
              </li>
              <li>
                <Link href="/rooms/presidential-suite" className="hover:text-[#C6A15B] transition-colors">
                  The Royal Lekki Penthouse
                </Link>
              </li>
              <li>
                <Link href="/rooms/deluxe-executive-suite" className="hover:text-[#C6A15B] transition-colors">
                  Azure Deluxe Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#C6A15B] transition-colors">
                  View All Suites & Inventory
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 2: Experiences */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">
              Experiences
            </div>
            <ul className="space-y-3 text-xs text-neutral-300 font-light">
              <li>
                <Link href="/dining" className="hover:text-[#C6A15B] transition-colors">
                  Aura Fine Dining & Lounge
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-[#C6A15B] transition-colors">
                  Infinity Rooftop Pool & Spa
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#C6A15B] transition-colors">
                  Private Yacht Lagoon Charters
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#C6A15B] transition-colors">
                  Weddings & Executive Galas
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C6A15B] transition-colors">
                  Editorial Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 3: Admin Portal */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">
              Management Portal
            </div>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Multi-property hotel management system for Stay Connect Hotel Group.
            </p>
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1918] border border-[#2C2B29] rounded-lg text-xs text-[#C6A15B] hover:border-[#C6A15B] hover:text-white transition-all font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <span>Executive Management Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-light">
          <div>
            © {new Date().getFullYear()} Stay Connect Hotels Group. 14B Providence Street, Lekki Phase 1, Lagos, Nigeria.
          </div>

          <div className="flex items-center gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C6A15B] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link>
            <Link href="/book" className="hover:text-[#C6A15B] transition-colors font-medium">Book Now</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
