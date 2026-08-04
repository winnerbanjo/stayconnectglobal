'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Clock, MapPin, ArrowRight } from 'lucide-react';
import { INITIAL_EXPERIENCES } from '@/lib/data/seedData';

export default function CuratedExperiencesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Lifestyle & Experiences</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
              Curated Experiences & Lifestyle
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
              Every property partner can publish bespoke experiences: private dinners, boat cruises, spa sessions, and private photography.
            </p>
          </div>

          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#C6A15B] text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#111111] transition-all shrink-0 self-start md:self-auto"
          >
            <span>Explore All Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl overflow-hidden group hover:border-[#C6A15B]/50 transition-all flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden">
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
                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mt-2">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2C2B29]">
                  <Link
                    href={`/experiences#${exp.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#C6A15B] text-xs font-semibold text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#111111] transition-all"
                  >
                    <span>Book Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
