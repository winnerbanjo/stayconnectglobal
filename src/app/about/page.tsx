import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Award, Compass, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'About Stay Connect Hotels | World-Class Luxury Hospitality in Lekki',
  description: 'Learn about Stay Connect Hotels brand philosophy, editorial design, and our commitment to quiet luxury in Lekki Phase 1, Lagos.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Our Legacy & Vision
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Redefining Hospitality in Lagos
            </h1>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              Stay Connect Hotels was founded with a singular ambition: to create an editorial hospitality sanctuary comparable to Aman Resorts, Soho House, and EDITION Hotels in the heart of Lekki Phase 1, Lagos.
            </p>
          </div>

          <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-[#E8E5DF]">
            <Image
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90"
              alt="Stay Connect Hotels Architecture"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-4">
              <Compass className="w-8 h-8 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl text-[#111111]">Quiet Luxury</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                We believe true luxury is calm, unhurried, and deeply intentional. Every space is designed with tactile marble, solid wood accents, and generous spatial proportions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-4">
              <ShieldCheck className="w-8 h-8 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl text-[#111111]">Uncompromised Security</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Guarded access, 24/7 dual redundant industrial power generators, and private airport VIP chauffeur services guarantee peace of mind.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-4">
              <Award className="w-8 h-8 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl text-[#111111]">Tailored Concierge</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Our team provides bespoke Nigerian warmth combined with international executive hospitality standards for discerning business leaders and international travelers.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
