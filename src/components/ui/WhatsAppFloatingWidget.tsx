'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloatingWidget() {
  const whatsappNumber = '2349042854834';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Stay%20Connect%20Global%2C%20I%20would%20like%20to%20inquire%20about%20a%20stay%20reservation%20or%20concierge%20service.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Stay Connect on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 sm:gap-3 bg-[#111111]/95 backdrop-blur-md hover:bg-[#25D366] text-white hover:text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full border border-[#25D366]/40 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40" />
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] group-hover:text-white transition-colors shrink-0" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-[#25D366] group-hover:text-white leading-tight">
          WhatsApp Concierge
        </span>
        <span className="text-[10px] sm:text-xs font-mono font-medium text-white group-hover:text-white leading-tight">
          +234 904 285 4834
        </span>
      </div>
    </a>
  );
}
