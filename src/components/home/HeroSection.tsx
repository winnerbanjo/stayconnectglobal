'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Compass, MapPin } from 'lucide-react';

export default function HeroSection() {
  const locations = [
    'Lekki Phase 1',
    'Banana Island',
    'Ikoyi',
    'Victoria Island',
    'Eko Atlantic'
  ];

  const [locationIndex, setLocationIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocationIndex((prev) => (prev + 1) % locations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [locations.length]);

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] flex items-center justify-center overflow-hidden bg-[#111111]">
      {/* Background Image / Slow Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center animate-slow-zoom"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=95')`,
          }}
        />
        {/* Editorial Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-[#111111]/70" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 sm:space-y-8 pt-20 sm:pt-24">
        {/* Rotating Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-[#111111]/85 border border-[#C6A15B]/40 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white shadow-2xl"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
          <span className="truncate">Flagship Destination • </span>
          <div className="relative inline-block overflow-hidden h-4 w-32 sm:w-36 text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={locations[locationIndex]}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute text-[#C6A15B] font-semibold truncate"
              >
                {locations[locationIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-white"
        >
          Stay Connected <br className="inline" />
          <span className="italic font-light text-[#FAF9F6]">to Luxury.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs sm:text-base md:text-xl text-neutral-300 font-light max-w-2xl mx-auto tracking-wide leading-relaxed px-2"
        >
          Experience premium hospitality in the heart of Lekki. Editorial suites, private tranquility, and bespoke Nigerian elegance.
        </motion.p>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 rounded-lg bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 text-center"
          >
            Book Your Stay
          </Link>

          <Link
            href="/rooms/saffron"
            className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 rounded-lg border border-white/40 hover:border-[#C6A15B] text-white hover:text-[#C6A15B] backdrop-blur-sm font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#C6A15B]" />
            <span>Explore Saffron Suite</span>
          </Link>
        </motion.div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A15B]/70" />
      </div>
    </section>
  );
}
