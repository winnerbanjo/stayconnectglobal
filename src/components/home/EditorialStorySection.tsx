'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Clock, Award, Compass } from 'lucide-react';

export default function EditorialStorySection() {
  return (
    <section className="py-28 bg-[#111111] text-white relative overflow-hidden border-y border-[#2C2B29]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>The Stay Connect Philosophy</span>
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1]">
                Where quiet luxury meets the soul of Lekki.
              </h2>
            </div>

            <blockquote className="font-serif italic text-lg md:text-xl text-neutral-300 border-l-2 border-[#C6A15B] pl-6 py-1">
              “True luxury never raises its voice. It communicates in silent details, tactile marble, custom Italian linens, and uninterrupted peace.”
            </blockquote>

            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Designed as an urban sanctuary at 14B Providence Street, Stay Connect Hotels brings world-class editorial hospitality to Lagos, Nigeria. Every interaction is calculated to offer warmth, privacy, and effortless executive comfort.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#2C2B29]">
              <div className="space-y-1">
                <div className="font-serif text-3xl text-[#C6A15B] font-medium">100%</div>
                <div className="text-xs uppercase tracking-widest text-neutral-400">Power & Fiber Uptime</div>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-3xl text-[#C6A15B] font-medium">24 / 7</div>
                <div className="text-xs uppercase tracking-widest text-neutral-400">Dedicated Butler & Concierge</div>
              </div>
            </div>
          </div>

          {/* Editorial Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[520px] rounded-2xl overflow-hidden border border-[#2C2B29] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=90"
                alt="Luxury Hotel Lobby Architecture"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-8 -left-6 sm:left-6 bg-[#1A1918] border border-[#C6A15B]/40 p-6 rounded-xl shadow-2xl max-w-xs text-white backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#C6A15B] shrink-0" />
                <div>
                  <div className="font-serif text-base text-white">Lekki Hospitality Award</div>
                  <div className="text-[11px] text-neutral-400 font-light mt-0.5">Voted #1 Executive Residence 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
