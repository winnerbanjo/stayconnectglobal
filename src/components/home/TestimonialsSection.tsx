'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { INITIAL_REVIEWS } from '@/lib/data/seedData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#FAF9F6] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#111111] font-normal">
            Reflections of Quiet Luxury
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Read unvarnished reviews from corporate executives, diplomats, and international travelers who have stayed with us in Lekki.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 lg:p-10 rounded-2xl border border-[#E8E5DF] shadow-md flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#C6A15B]/15" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C6A15B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C6A15B]" />
                  ))}
                  <span className="text-xs font-semibold text-[#111111] ml-2">{rev.rating.toFixed(1)}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#111111] font-medium">{rev.title}</h3>

                <p className="text-neutral-600 text-sm font-light leading-relaxed italic">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8E5DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.guestAvatar ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C6A15B]">
                      <Image src={rev.guestAvatar} alt={rev.guestName} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C6A15B] flex items-center justify-center font-serif text-sm">
                      {rev.guestName.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-semibold text-[#111111] flex items-center gap-1.5">
                      <span>{rev.guestName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                    </div>
                    <div className="text-[11px] text-neutral-500 font-light">{rev.roomType}</div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 font-light">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
