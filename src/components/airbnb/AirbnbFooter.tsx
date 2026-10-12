"use client";

import React from "react";
import Link from "next/link";
import { Globe, Crown, Phone, ShieldCheck } from "lucide-react";

export default function AirbnbFooter() {
  return (
    <footer className="w-full bg-white dark:bg-[#0E0E0E] border-t border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* BRAND STATEMENT BANNER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-[#E8E5DF] dark:border-[#2C2B29] gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 px-3 py-1.5 rounded-xl bg-[#111111] flex items-center justify-center shadow-sm">
              <img
                src="/images/logo.png"
                alt="Stay Connect Global"
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#00AEEF] font-bold">
              • Premier Hospitality Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-[#00AEEF]" />
            <span>Verified 24/7 Power • Armed Protocol Security • Chauffeur on Request</span>
          </div>
        </div>

        {/* TOP COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#E8E5DF] dark:border-[#2C2B29]">
          {/* Column 1: Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
              Guest Support & 24/7 Concierge
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/2349042854834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#00AEEF] font-semibold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge: +234 904 285 4834</span>
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#00AEEF] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#00AEEF] transition-colors">
                  Cancellation & Refund Terms
                </Link>
              </li>
              <li>
                <Link href="/booking-status" className="hover:text-[#00AEEF] transition-colors">
                  Check Booking / Payment Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Hosting & Partners */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
              Property Owners & Partners
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/list-your-property" className="hover:text-[#00AEEF] transition-colors">
                  List Your Luxury Residence
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-[#00AEEF] transition-colors">
                  Partner Management Workspace
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#00AEEF] transition-colors">
                  Executive Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/for-business" className="hover:text-[#00AEEF] transition-colors">
                  Corporate Accounts & Diplomatic Stays
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Connect Global */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
              Stay Connect Ecosystem
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/2349042854834?text=Hello%2C%20I%20would%20like%20to%20request%20executive%20chauffeur%20car%20rental%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00AEEF] transition-colors"
                >
                  Chauffeur Fleet (On Request via WhatsApp)
                </a>
              </li>
              <li>
                <Link href="/transfers" className="hover:text-[#00AEEF] transition-colors">
                  Airport VIP Tarmac Transfers
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#00AEEF] transition-colors">
                  Ilashe Island Yacht Charters
                </Link>
              </li>
              <li>
                <Link href="/concierge" className="hover:text-[#00AEEF] transition-colors">
                  Private Chef & Protocol Escorts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00AEEF] transition-colors">
                  Contact Operations Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: Copyright & Region */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center md:text-left">
            <span>© 2026 Stay Connect Global, Inc.</span>
            <span>·</span>
            <Link href="/policies" className="hover:underline">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/policies" className="hover:underline">
              Terms
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:underline">
              Sitemap
            </Link>
            <span>·</span>
            <span>Lagos · Abuja · London</span>
          </div>

          <div className="flex items-center gap-4 font-semibold text-neutral-800 dark:text-neutral-200">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#00AEEF]" />
              <span>English (NG)</span>
            </div>
            <span>·</span>
            <div>
              <span className="text-[#00AEEF]">₦ NGN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
