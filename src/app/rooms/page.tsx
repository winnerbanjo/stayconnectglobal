import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import FeaturedRoomsSection from '@/components/home/FeaturedRoomsSection';

export const metadata = {
  title: 'Suites & Accommodations | Stay Connect Hotels Lekki',
  description: 'Explore Saffron Executive Suite, Presidential Penthouse, and Executive Deluxe Suites at 14B Providence Street, Lekki Phase 1, Lagos.',
};

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
            Editorial Collection
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
            Suites & Private Residences
          </h1>
          <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
            Discover our curated portfolio of executive suites in Lekki, Lagos. Every suite features high-speed fiber internet, silent climate control, uninterrupted power, and bespoke concierge care.
          </p>
        </div>

        <FeaturedRoomsSection />
      </main>

      <Footer />
    </div>
  );
}
