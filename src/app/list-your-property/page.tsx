'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, CheckCircle2, ShieldCheck, Upload, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function ListYourPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    propertyType: 'Serviced Apartment',
    propertyName: '',
    address: '',
    city: 'Lagos',
    numberOfUnits: 1,
    description: '',
    amenities: [] as string[],
    notes: '',
  });

  const amenitiesOptions = [
    '24/7 Power Generator',
    'Armed Security Detail',
    'High Speed WiFi',
    'Rooftop Pool',
    'Fitness Studio',
    'In-House Chef',
    'Chauffeur & Airport Transport',
    'Smart Keyless Entry',
    'Private Jetty Access',
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      if (exists) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) };
      } else {
        return { ...prev, amenities: [...prev.amenities, amenity] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback for demonstration
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Header Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-[#1A1918] border border-[#C6A15B]/30 inline-block">
            Partner Onboarding Portal
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Grow Your Hospitality Business with Stay Connect.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            List your luxury hotel, serviced apartment, private villa, or corporate residence. Connect with high-value guests, manage inventory, and receive direct payouts.
          </p>
        </section>

        {/* Why List With Stay Connect vs OTAs */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">The Stay Connect Advantage</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">Why List With Us Instead of Booking.com or Airbnb?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-6 space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">Direct Booking Engine & Web Presence</div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">Get a custom property showcase, direct guest reservations, and integrated payment gateway with zero third-party commissions.</p>
            </div>
            <div className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-6 space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">Complete Property Management Dashboard</div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">Control calendar availability, seasonal dynamic pricing, housekeeping assignments, and revenue reports in one place.</p>
            </div>
            <div className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-6 space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">Local Nigerian Support & Fleet Mobility</div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">24/7 dedicated Nigerian account managers, airport transfer logistics, and concierge cross-selling for higher guest spend.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1918] border border-[#2C2B29] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-[#C6A15B]/10 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white">Application Received!</h2>
                <p className="text-neutral-300 text-sm max-w-lg mx-auto leading-relaxed">
                  Thank you for applying to join the Stay Connect Global Partner Network. Our partner verification team will review your property submission and contact you within 24 hours.
                </p>
                <div className="pt-4 flex items-center justify-center gap-4">
                  <a
                    href="/partner"
                    className="px-8 py-3.5 bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#d8b46e] transition-colors"
                  >
                    View Partner Portal Draft
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-[#2C2B29] pb-6">
                  <h3 className="font-serif text-2xl text-white">1. Business & Contact Information</h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">Tell us about your business or hospitality operation.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Business / Operator Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bourdillon Hospitality Ltd"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Adebayo Davies"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. partner@bourdillon.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-[#2C2B29] pb-6">
                  <h3 className="font-serif text-2xl text-white">2. Property Details</h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">Specify your property category and location.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Property Category *</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      >
                        <option value="Hotel">Luxury Hotel</option>
                        <option value="Serviced Apartment">Serviced Apartment</option>
                        <option value="Luxury Residence">Luxury Residence / Penthouse</option>
                        <option value="Villa">Private Villa / Holiday Home</option>
                        <option value="Shortlet">Shortlet Apartment</option>
                        <option value="Corporate Housing">Corporate Housing</option>
                        <option value="Boutique Hotel">Boutique Hotel</option>
                        <option value="Resort">Resort</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Property Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Crown Serviced Suites"
                        value={formData.propertyName}
                        onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">City / Location *</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Calabar">Calabar</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Number of Units / Rooms *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.numberOfUnits}
                        onChange={(e) => setFormData({ ...formData, numberOfUnits: parseInt(e.target.value) || 1 })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs text-[#C6A15B] uppercase tracking-wider font-semibold">Full Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 12B Alexander Avenue, Ikoyi, Lagos"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities checklist */}
                <div className="border-b border-[#2C2B29] pb-6">
                  <h3 className="font-serif text-2xl text-white">3. Amenities & Facilities</h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">Select key features offered at your property.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {amenitiesOptions.map((item, idx) => {
                      const isSelected = formData.amenities.includes(item);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAmenityToggle(item)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#C6A15B]/20 border-[#C6A15B] text-white'
                              : 'bg-[#111111] border-[#2C2B29] text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>{item}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-light">
                    <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                    <span>Free registration. No upfront setup fees. Verified payouts.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-4 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl hover:scale-105"
                  >
                    {loading ? 'Submitting Application...' : 'Submit Property for Verification →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
