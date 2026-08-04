import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions | Stay Connect Hotels Lekki',
  description: 'Answers to guest queries regarding check-in times, Saffron suite specifications, power backup, and airport transfers.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'Where is Stay Connect Hotels located?',
      a: 'Our flagship hotel property is located at 14B, Providence Street, Lekki Phase 1, Lagos, Nigeria — a serene, highly secured enclave within close proximity to Admiralty Way, Nike Art Gallery, and Ikoyi.'
    },
    {
      q: 'What are the specifications for the Saffron Executive Suite?',
      a: 'Saffron is a 150 m² executive single room featuring 1 bedroom, 1 bathroom, king pillow-top bed, Nespresso coffee machine, Evian mineral water, high-speed fiber internet, and 24/7 climate control.'
    },
    {
      q: 'Do you guarantee 24/7 uninterrupted power?',
      a: 'Yes. We operate dual redundant industrial generators alongside high-capacity inverter banks to guarantee 100% uninterrupted electricity and air conditioning at all times.'
    },
    {
      q: 'Can I arrange airport chauffeur pickup?',
      a: 'Yes. Our private chauffeur team operates Range Rover Autograph and Mercedes S-Class vehicles with optional VIP tarmac escort at Murtala Muhammed International Airport (LOS).'
    },
    {
      q: 'What is your check-in and check-out schedule?',
      a: 'Check-in begins at 3:00 PM and check-out is by 12:00 PM. Early check-in or late check-out can be requested via our head concierge.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Guest Assistance
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111111] font-normal">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-3">
                <h3 className="font-serif text-2xl text-[#111111] font-medium">{item.q}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
