import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Utensils, Clock, Wine, CheckCircle2, Calendar } from 'lucide-react';
import { INITIAL_DINING } from '@/lib/data/seedData';

export const metadata = {
  title: 'Aura Fine Dining & Lounge | Stay Connect Hotels Lekki',
  description: 'Pan-African & Mediterranean gastronomy, chef’s tasting menus, sommelier wine pairings, and artisanal high tea at Stay Connect Hotels Lekki.',
};

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Culinary Artistry
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Aura Fine Dining & Tea Lounge
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              Pan-African contemporary gastronomy fused with Mediterranean finesse. Prepared by Michelin-trained chefs at 14B Providence Street, Lekki.
            </p>
          </div>

          {/* Dining Venues Grid */}
          <div className="space-y-16">
            {INITIAL_DINING.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                <div className="lg:col-span-6 relative h-[380px] lg:h-auto bg-neutral-900">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#111111]/80 text-[#C6A15B] text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#C6A15B]/30">
                    {venue.cuisine}
                  </div>
                </div>

                <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">{venue.tagline}</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-[#111111] font-normal">{venue.name}</h2>
                    <p className="text-neutral-600 text-xs md:text-sm font-light leading-relaxed">
                      {venue.description}
                    </p>

                    {/* Operating Hours */}
                    <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E8E5DF] space-y-2 text-xs text-neutral-700">
                      <div className="font-semibold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>Dining Hours</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                        <div><span className="text-neutral-400">Breakfast:</span> <br/>{venue.hours.breakfast}</div>
                        <div><span className="text-neutral-400">Lunch:</span> <br/>{venue.hours.lunch}</div>
                        <div><span className="text-neutral-400">Dinner:</span> <br/>{venue.hours.dinner}</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">Highlights</span>
                      <div className="flex flex-wrap gap-2">
                        {venue.highlights.map((h, i) => (
                          <span key={i} className="px-3 py-1 bg-[#111111] text-white text-[11px] rounded-full font-light">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between">
                    <a
                      href="tel:+2348031234567"
                      className="px-6 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-widest rounded shadow-md inline-flex items-center gap-2"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Reserve Dining Table</span>
                    </a>
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
