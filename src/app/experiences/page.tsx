import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Compass, Anchor, Shield, Phone } from 'lucide-react';
import { INITIAL_EXPERIENCES } from '@/lib/data/seedData';

export const metadata = {
  title: 'Curated Lagos Experiences | Stay Connect Hotels',
  description: 'Private Lagos lagoon yacht charters, airport VIP escort chauffeur service, and Lekki art excursions.',
};

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Curated Excursions
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Private Lekki & Lagos Experiences
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              Customized journeys designed for Stay Connect guests. From lagoon yacht cruises to private airport transfers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative h-64 bg-neutral-900 overflow-hidden">
                  <Image src={exp.image} alt={exp.title} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#111111]/90 text-[#C6A15B] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                    {exp.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl text-[#111111] font-normal">{exp.title}</h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">{exp.description}</p>

                  <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-light">Duration: {exp.duration}</span>
                    <span className="text-[#C6A15B] font-semibold">{exp.priceTag}</span>
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
