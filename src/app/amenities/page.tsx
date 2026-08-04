import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import AmenitiesGrid from '@/components/home/AmenitiesGrid';
import { ShieldCheck, Zap, Wifi } from 'lucide-react';

export const metadata = {
  title: 'Amenities & Facilities | Stay Connect Hotels Lekki',
  description: 'Infinity rooftop pool, Technogym fitness center, 24/7 security, dual redundant generators, high-speed fiber internet, and holistic spa in Lekki Phase 1.',
};

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Bespoke Services & Infrastructure
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Property Amenities & Wellness
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              Every detail engineered for uninterrupted luxury, security, and peace of mind in Lekki Phase 1.
            </p>
          </div>

          <AmenitiesGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
