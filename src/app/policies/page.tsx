import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'Guest Policies & Terms | Stay Connect Hotels Lekki',
  description: 'Cancellation policy, payment terms, and guest protocols for Stay Connect Hotels.',
};

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Guest Registry Protocols
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111111] font-normal">
              Hotel Policies & Cancellation Terms
            </h1>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-2xl border border-[#E8E5DF] shadow-md space-y-8 text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-serif text-2xl text-[#111111]">1. Reservation & Cancellation</h3>
              <p>
                Complimentary cancellation is available up to 48 hours prior to official check-in time (3:00 PM). Cancellations made within 48 hours of check-in will be subject to a one-night suite charge.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-2xl text-[#111111]">2. Check-In & Verification</h3>
              <p>
                Guests must present valid government-issued photo identification (International Passport or Driver’s License) upon arrival at 14B Providence Street, Lekki.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-2xl text-[#111111]">3. Non-Smoking & Privacy Policy</h3>
              <p>
                All suites, balconies, and internal public spaces are strictly non-smoking. Designated outdoor garden areas are provided for smoking guests.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
