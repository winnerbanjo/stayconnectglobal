"use client";

import React from "react";
import AirbnbHeader from "@/components/airbnb/AirbnbHeader";
import AirbnbFooter from "@/components/airbnb/AirbnbFooter";
import PropertySearch from "@/components/properties/PropertySearch";
import { Property } from "@/types";

export default function PropertiesClientView({
  properties,
  initialLocation,
  initialCategory,
  query,
}: {
  properties: Property[];
  initialLocation: string;
  initialCategory: string;
  query: string;
}) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans transition-colors duration-200">
      <AirbnbHeader
        activeCategory="all"
        onSelectCategory={() => {}}
        selectedLocation={initialLocation}
        onSelectLocation={() => {}}
        onSearch={() => {}}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <header className="max-w-2xl space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#00AEEF] font-bold">
            Stay Connect Collection
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            All Verified Stays in Nigeria
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
            Curated serviced apartments, penthouses, and private residences in Banana Island, Ikoyi, Lekki Phase 1, and Abuja.
          </p>
        </header>
        <PropertySearch
          properties={properties}
          initialLocation={initialLocation}
          initialCategory={initialCategory}
          query={query}
        />
      </main>
      <AirbnbFooter />
    </div>
  );
}
