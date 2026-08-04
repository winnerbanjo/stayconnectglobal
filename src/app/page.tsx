import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import HeroSection from '@/components/home/HeroSection';
import BookingSearchWidget from '@/components/home/BookingSearchWidget';
import CategoryOfferings from '@/components/home/CategoryOfferings';
import DestinationsSection from '@/components/home/DestinationsSection';
import FeaturedRoomsSection from '@/components/home/FeaturedRoomsSection';
import HospitalityPackagesSection from '@/components/home/HospitalityPackagesSection';
import LuxuryFleetSection from '@/components/home/LuxuryFleetSection';
import CuratedExperiencesSection from '@/components/home/CuratedExperiencesSection';
import WhyStayConnect from '@/components/home/WhyStayConnect';
import PartnerCTASection from '@/components/home/PartnerCTASection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export const metadata = {
  title: 'Stay Connect Global | Luxury Hospitality Platform & Ecosystem',
  description: 'Discover exceptional luxury hotels, serviced apartments, premium residences, chauffeur services, concierge experiences, and curated stays across Nigeria.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111] transition-colors duration-300">
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Search Widget */}
        <BookingSearchWidget />

        {/* Section 3: Featured Stays (Stay Connect Collection vs Partner Collection) */}
        <FeaturedRoomsSection />

        {/* Section 4: Top Destinations */}
        <DestinationsSection />

        {/* Section 5: Stay & Mobility Packages */}
        <HospitalityPackagesSection />

        {/* Section 6: Why Stay Connect Guarantees */}
        <WhyStayConnect />
      </main>

      <Footer />
    </div>
  );
}
