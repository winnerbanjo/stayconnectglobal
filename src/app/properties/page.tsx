import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { MapPin, ArrowRight, Building, Award, Waves, ShieldCheck } from 'lucide-react';
import { INITIAL_PROPERTIES } from '@/lib/data/seedData';

export const metadata = {
  title: 'Our Hotels & Residences | Stay Connect Hotel Group',
  description: 'Explore Stay Connect luxury properties across Lekki Phase 1 and Ikoyi Waterfront in Lagos, Nigeria.',
};

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Multi-Property Hotel Portfolio
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Hotels & Private Residences
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              Our collection of luxury destinations in Lagos. Operating under one unified hospitality group.
            </p>
          </div>

          <div className="space-y-12">
            {INITIAL_PROPERTIES.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group"
              >
                <div className="lg:col-span-7 relative h-[380px] lg:h-auto bg-neutral-900 overflow-hidden">
                  <Image
                    src={prop.heroImage}
                    alt={prop.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#111111]/90 text-[#C6A15B] text-xs uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full border border-[#C6A15B]/30">
                    {prop.city}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">{prop.tagline}</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-[#111111] font-normal">{prop.name}</h2>
                    <div className="flex items-center gap-2 text-xs text-neutral-600 font-light">
                      <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                      <span>{prop.address}</span>
                    </div>

                    <p className="text-neutral-600 text-xs md:text-sm font-light leading-relaxed">
                      {prop.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold block mb-2">Featured Amenities</span>
                      <div className="flex flex-wrap gap-2">
                        {prop.amenities.map((am, i) => (
                          <span key={i} className="px-3 py-1 bg-[#FAF9F6] border border-[#E8E5DF] text-[11px] text-neutral-700 rounded-full font-light">
                            {am.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between">
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="px-6 py-3 bg-[#111111] hover:bg-[#C6A15B] text-white hover:text-[#111111] text-xs font-medium uppercase tracking-widest rounded transition-colors flex items-center gap-2"
                    >
                      <span>Explore Property</span>
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
