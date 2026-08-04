'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const photos = [
    { title: 'Saffron Executive Suite Bedroom', category: 'Suites', src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=90' },
    { title: 'Saffron Suite Executive Lounge', category: 'Suites', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=90' },
    { title: 'Royal Penthouse Skyline View', category: 'Suites', src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=90' },
    { title: 'Aura Fine Dining & Wine Bar', category: 'Dining', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90' },
    { title: 'Rooftop Infinity Pool', category: 'Wellness', src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=90' },
    { title: 'Lekki Architecture at Night', category: 'Exterior', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=90' },
  ];

  const categories = ['All', 'Suites', 'Dining', 'Wellness', 'Exterior'];

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Editorial Visuals
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Photography Gallery
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              Visual storytelling capturing architecture, craftsmanship, and serenity at Stay Connect Hotels Lekki.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all font-medium ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-[#C6A15B]'
                    : 'bg-white border border-[#E8E5DF] text-neutral-600 hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((photo, i) => (
              <div
                key={i}
                className="relative h-80 rounded-2xl overflow-hidden group bg-neutral-900 border border-[#E8E5DF] shadow-md"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">{photo.category}</span>
                  <div className="font-serif text-xl font-normal">{photo.title}</div>
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
