"use client";

import React from "react";
import { Zap } from "lucide-react";

interface AirbnbFloatingFeePillProps {
  includeFees: boolean;
  onToggle: () => void;
}

export default function AirbnbFloatingFeePill({
  includeFees,
  onToggle,
}: AirbnbFloatingFeePillProps) {
  return (
    <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-[92vw]">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111111]/95 dark:bg-[#1A1918]/95 text-white font-semibold text-xs sm:text-sm shadow-2xl hover:shadow-[0_0_25px_rgba(0,174,239,0.3)] border border-[#00AEEF]/40 hover:border-[#00AEEF] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md truncate"
      >
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center shrink-0">
          <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
        </span>
        <span className="tracking-wide truncate">
          <span className="sm:hidden">⚡ 24/7 Power · All Fees Included</span>
          <span className="hidden sm:inline">100% Transparent Rates · All Fees & Power Included</span>
        </span>
        <span
          className={`ml-1 w-2 h-2 rounded-full transition-colors shrink-0 ${
            includeFees ? "bg-[#00AEEF] shadow-[0_0_6px_#00AEEF]" : "bg-neutral-600"
          }`}
        />
      </button>
    </div>
  );
}
