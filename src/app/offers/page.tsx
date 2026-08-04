import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Tag, ArrowRight, Clock } from 'lucide-react';
import { INITIAL_OFFERS } from '@/lib/data/seedData';

export const metadata = {
  title: 'Exclusive Offers & Packages | Stay Connect Hotels Lekki',
  description: 'Seasonal stay packages, 20% Lekki weekend escapes, and long-stay corporate discounts at Stay Connect Hotels.',
};

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Privileged Rates
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Offers & Seasonal Packages
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              Curated packages featuring preferential rates for Saffron suite stays, fine dining inclusions, and long-term retreats in Lekki.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIAL_OFFERS.map((off) => (
              <div
                key={off.id}
                className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-64 bg-neutral-900 overflow-hidden">
                  <Image src={off.image} alt={off.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-[#C6A15B] text-[#111111] text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full">
                    {off.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#111111]/90 text-white text-xs px-3 py-1 rounded font-mono border border-[#C6A15B]/30">
                    CODE: {off.code}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-widest">
                      {off.discountPercentage}% Special Discount
                    </span>
                    <h3 className="font-serif text-3xl text-[#111111] font-normal">{off.title}</h3>
                    <p className="text-neutral-600 text-xs md:text-sm font-light leading-relaxed">
                      {off.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-light">Valid until {off.validUntil}</span>
                    <Link
                      href={`/book?promoCode=${off.code}`}
                      className="px-6 py-3 bg-[#111111] hover:bg-[#C6A15B] text-white hover:text-[#111111] text-xs font-medium uppercase tracking-widest rounded transition-colors flex items-center gap-2"
                    >
                      <span>Apply Offer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
