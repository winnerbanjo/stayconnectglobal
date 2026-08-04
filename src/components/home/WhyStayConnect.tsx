'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Car, Users, Lock, Headset } from 'lucide-react';

const TRUST_CARDS = [
  {
    title: 'Verified Premium Properties',
    desc: 'Every property undergoes a 40-point physical inspection for security, uninterrupted power, and luxury amenities.',
    icon: ShieldCheck,
  },
  {
    title: 'Curated Luxury Experiences',
    desc: 'Bespoke yacht charters, private dining chefs, and wellness retreats designed exclusively for Stay Connect guests.',
    icon: Compass,
  },
  {
    title: 'Executive Chauffeur Services',
    desc: 'Armoured SUVs, Range Rovers, and Maybach sedans driven by vetted, diplomatic protocol chauffeurs.',
    icon: Car,
  },
  {
    title: 'Trusted Hospitality Partners',
    desc: 'Direct partnerships with leading Nigerian boutique hotels, luxury developers, and serviced residence operators.',
    icon: Users,
  },
  {
    title: 'Secure Reservations',
    desc: 'Encrypted multi-currency card processing, direct bank transfer verification, and zero hidden platform fees.',
    icon: Lock,
  },
  {
    title: 'Dedicated Concierge Support',
    desc: '24/7 personal hospitality manager available via WhatsApp and direct call before, during, and after your stay.',
    icon: Headset,
  },
];

export default function WhyStayConnect() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] dark:bg-[#161514] text-[#111111] dark:text-white border-t border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold">
            Platform Guarantees
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
            Why Book Through Stay Connect?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
            We are not just a listing directory. We are a managed hospitality ecosystem ensuring uncompromising standards across every stay, vehicle, and experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#C6A15B]/60 rounded-2xl p-6 sm:p-8 space-y-4 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] dark:bg-[#252422] border border-[#E8E5DF] dark:border-[#3A3935] flex items-center justify-center text-[#C6A15B]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] dark:text-white font-medium">{card.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
