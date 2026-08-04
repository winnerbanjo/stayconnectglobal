import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import HeroSection from '@/components/home/HeroSection';
import BookingSearchWidget from '@/components/home/BookingSearchWidget';
import FeaturedRoomsSection from '@/components/home/FeaturedRoomsSection';
import EditorialStorySection from '@/components/home/EditorialStorySection';
import AmenitiesGrid from '@/components/home/AmenitiesGrid';
import LekkiMapSection from '@/components/home/LekkiMapSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export const metadata = {
  title: 'Stay Connect Hotels | Luxury Hotel & Executive Suites in Lekki, Lagos',
  description: 'Experience luxury hospitality at Stay Connect Hotels in Lekki Phase 1, Lagos, Nigeria. Flagship executive single suites, presidential penthouses, fine dining, and private lagoon experiences.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main>
        {/* Full-Screen Hero */}
        <HeroSection />

        {/* Floating Availability Widget */}
        <BookingSearchWidget />

        {/* Featured Suites (Saffron Spotlight) */}
        <FeaturedRoomsSection />

        {/* Editorial Storytelling */}
        <EditorialStorySection />

        {/* Luxury Amenities Showcase */}
        <AmenitiesGrid />

        {/* Interactive Location & Lekki Map */}
        <LekkiMapSection />

        {/* Testimonials */}
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
