import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Calendar, Users, Award, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Weddings, Conferences & Private Galas | Stay Connect Hotels Lekki',
  description: 'Host luxury weddings, corporate executive board meetings, and private celebrations at Stay Connect Hotels in Lekki, Lagos.',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Celebrations & Gatherings
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Weddings, Conferences & Events
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              State-of-the-art event spaces, high-speed connectivity, and bespoke banqueting at 14B Providence Street, Lekki Phase 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-xl p-8 space-y-6">
              <div className="relative h-60 rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90"
                  alt="Weddings & Celebrations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#C6A15B] uppercase tracking-widest font-semibold">Bespoke Celebrations</span>
                <h2 className="font-serif text-3xl text-[#111111] font-normal">Luxury Weddings & Birthdays</h2>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  From intimate wedding receptions to milestone birthday dinners, our event directors tailor every detail with fine floral styling, tasting menus, and luxury suite accommodations.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between text-xs">
                <span>Capacity: Up to 250 Guests</span>
                <a href="tel:+2348031234567" className="text-[#C6A15B] font-semibold hover:underline">Inquire Venue →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden shadow-xl p-8 space-y-6">
              <div className="relative h-60 rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1600&q=90"
                  alt="Corporate Conferences"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#C6A15B] uppercase tracking-widest font-semibold">Executive Meetings</span>
                <h2 className="font-serif text-3xl text-[#111111] font-normal">Corporate Conferences & Retreats</h2>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Equipped with high-definition audio-visual systems, video conferencing suites, ergonomic seating, and coffee breaks catered by Aura Restaurant.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between text-xs">
                <span>Capacity: Up to 120 Executives</span>
                <a href="tel:+2348031234567" className="text-[#C6A15B] font-semibold hover:underline">Inquire Venue →</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
