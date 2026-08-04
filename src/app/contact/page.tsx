'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import LekkiMapSection from '@/components/home/LekkiMapSection';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20 space-y-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Personalized Assistance
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              Connect With Our Concierge
            </h1>
            <p className="text-neutral-600 text-sm font-light max-w-xl mx-auto">
              For suite inquiries, private reservations, or chauffeur arrangements at 14B Providence Street, Lekki Phase 1.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-12 rounded-2xl border border-[#E8E5DF] shadow-xl space-y-6">
              <h2 className="font-serif text-3xl text-[#111111] font-normal">Send a Direct Message</h2>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#FAF9F6] border border-[#C6A15B] text-center text-sm text-[#C6A15B] space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#C6A15B] mx-auto" />
                  <div className="font-serif text-lg text-[#111111]">Message Received</div>
                  <p className="text-xs text-neutral-600 font-light">Our head concierge will contact you within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Babatunde Alabi"
                        className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="guest@domain.com"
                        className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+234 803 123 4567"
                      className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Message / Inquiry Details</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Specify dates, suite preferences, or event inquiry details..."
                      className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-[0.2em] rounded shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Concierge</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#111111] text-white p-8 rounded-2xl border border-[#C6A15B]/30 space-y-6 shadow-xl">
                <div className="font-serif text-2xl text-[#C6A15B] border-b border-[#2C2B29] pb-3">
                  Flagship Contact Directory
                </div>

                <div className="space-y-4 text-xs font-light text-neutral-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Hotel Address</div>
                      <div>14B, Providence Street, Lekki Phase 1, Lagos, Nigeria</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Direct Telephone & WhatsApp</div>
                      <div>+234 803 123 4567 / +234 901 888 0000</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Email Desk</div>
                      <div>concierge@stayconnecthotels.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <LekkiMapSection />
      </main>

      <Footer />
    </div>
  );
}
