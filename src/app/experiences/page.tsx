'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Compass, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INITIAL_EXPERIENCES } from '@/lib/data/seedData';

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Stay Connect Curated Experiences
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Curated Experiences & Lifestyle.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Discover bespoke lifestyle experiences offered by verified hospitality partners across Lagos, Abuja, and West Africa.
          </p>
        </div>

        {/* Experiences Grid / Empty State */}
        {INITIAL_EXPERIENCES.length === 0 ? (
          <div className="bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] dark:bg-[#252422] border border-[#E8E5DF] dark:border-[#3A3935] text-[#C6A15B] flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                Lifestyle Platform
              </span>
              <h2 className="font-serif text-3xl text-[#111111] dark:text-white">
                Bespoke Experiences Available on Request
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                From private Lagos lagoon yacht cruises to in-suite Michelin-trained chefs, our concierge arranges customized luxury experiences for Saffron suite guests.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/2347041008351?text=Hello%20Stay%20Connect%20Concierge,%20I%20would%20like%20to%20request%20a%20bespoke%20lifestyle%20experience."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Custom Experience via Concierge</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl overflow-hidden group hover:border-[#C6A15B]/50 transition-all flex flex-col justify-between">
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase tracking-wider font-semibold rounded-full">
                    {exp.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#C6A15B] font-medium mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {exp.duration}
                      </span>
                      <span>{exp.priceTag}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2C2B29]">
                    <a
                      href={`https://wa.me/2347041008351?text=Hi%20Stay%20Connect,%20I%20want%20to%20book%20the%20experience:%20${encodeURIComponent(exp.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      <span>Reserve Experience</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
