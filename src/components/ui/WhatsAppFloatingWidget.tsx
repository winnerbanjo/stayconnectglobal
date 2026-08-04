'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloatingWidget() {
  const whatsappNumber = '2347041008351';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Stay%20Connect%20Hotels%2C%20I%20would%20like%20to%20inquire%20about%20reserving%20a%20suite%20at%2014B%20Providence%20Street%2C%20Lekki.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Stay Connect Concierge on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 sm:gap-3 bg-[#111111]/95 backdrop-blur-md hover:bg-[#C6A15B] text-white hover:text-[#111111] px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full border border-[#C6A15B]/50 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-40" />
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6A15B] group-hover:text-[#111111] transition-colors shrink-0" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-[#C6A15B] group-hover:text-[#111111] leading-tight">
          Concierge
        </span>
        <span className="text-[10px] sm:text-xs font-mono font-medium text-white group-hover:text-[#111111] leading-tight">
          +234 704 100 8351
        </span>
      </div>
    </a>
  );
}
