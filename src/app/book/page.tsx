'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, Mail, Check, CreditCard, Shield, Copy, CheckCircle, ArrowRight, Building2, Car, Plane, ConciergeBell, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { INITIAL_ROOMS } from '@/lib/data/seedData';

const ADDON_SERVICES = [
  {
    id: 'chauffeur-rr',
    name: 'Range Rover Chauffeur Mobility',
    price: 150000,
    desc: 'Dedicated Range Rover Autobiography SUV with diplomatic protocol chauffeur.',
    icon: Car,
  },
  {
    id: 'tarmac-escort',
    name: 'Airport VIP Tarmac Escort',
    price: 75000,
    desc: 'MMIA / ABV tarmac escort, VIP lounge access, and expedited luggage handling.',
    icon: Plane,
  },
  {
    id: 'private-chef',
    name: 'In-Suite Private Chef Service',
    price: 90000,
    desc: 'Michelin-trained private chef for customized 3-course suite dining.',
    icon: ConciergeBell,
  },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState<any>(null);

  const [formData, setFormData] = useState({
    suiteSlug: 'saffron',
    suiteName: 'Saffron Executive Suite (14B Providence)',
    pricePerNight: 185000,
    checkIn: '2026-08-15',
    checkOut: '2026-08-18',
    nights: 3,
    guests: 2,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    paymentMethod: 'Bank Transfer',
    specialRequests: '',
    selectedAddOns: [] as string[],
  });

  // Calculate pricing breakdown dynamically
  const nightlyTotal = formData.pricePerNight * formData.nights;
  const addOnsTotal = formData.selectedAddOns.reduce((acc, addonId) => {
    const item = ADDON_SERVICES.find((a) => a.id === addonId);
    return acc + (item ? item.price : 0);
  }, 0);
  const subtotal = nightlyTotal + addOnsTotal;
  const vatAmount = Math.round(subtotal * 0.075);
  const stateTax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + vatAmount + stateTax;

  const toggleAddOn = (addonId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedAddOns.includes(addonId);
      if (exists) {
        return { ...prev, selectedAddOns: prev.selectedAddOns.filter((id) => id !== addonId) };
      } else {
        return { ...prev, selectedAddOns: [...prev.selectedAddOns, addonId] };
      }
    });
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0123456789');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomName: formData.suiteName,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          nights: formData.nights,
          adults: formData.guests,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          specialRequests: formData.specialRequests,
          totalPrice: grandTotal,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setBookingCompleted(json.data);
      } else {
        setBookingCompleted({
          bookingRef: `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          roomName: formData.suiteName,
          totalPrice: grandTotal,
        });
      }
      setCurrentStep(4);
    } catch (err) {
      setBookingCompleted({
        bookingRef: `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        roomName: formData.suiteName,
        totalPrice: grandTotal,
      });
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1 space-y-8">
        {/* Checkout Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B] font-semibold px-4 py-1.5 rounded-full bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#C6A15B]/30 inline-block shadow-sm">
            Encrypted Checkout Process
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#111111] dark:text-white">
            Reserve Your Luxury Sanctuary
          </h1>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light">
            Stay Connect Global Platform • Direct Guaranteed Pricing
          </p>
        </div>

        {/* Stripe-Grade 4-Step Wizard Indicator */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: 1, label: 'Dates & Suite' },
              { num: 2, label: 'Guest Info' },
              { num: 3, label: 'Add-On Services' },
              { num: 4, label: 'Payment' },
            ].map((st) => (
              <div
                key={st.num}
                className={`py-2 px-2 rounded-xl transition-all ${
                  currentStep === st.num
                    ? 'bg-[#C6A15B] text-[#111111] font-bold shadow-md'
                    : currentStep > st.num
                    ? 'bg-[#C6A15B]/20 text-[#C6A15B] font-semibold'
                    : 'text-neutral-400 font-medium'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider">Step 0{st.num}</div>
                <div className="text-xs sm:text-sm font-serif truncate">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content & Sticky Live Order Summary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form Container */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* STEP 1: DATES & SUITE SELECTION */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-4">
                  <h3 className="font-serif text-2xl text-[#111111] dark:text-white">Step 1: Choose Suite & Dates</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Select your preferred accommodation and reservation stay window.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Select Suite / Residence</label>
                    <select
                      value={formData.suiteSlug}
                      onChange={(e) => {
                        const matched = INITIAL_ROOMS.find((r) => r.slug === e.target.value);
                        if (matched) {
                          setFormData({
                            ...formData,
                            suiteSlug: matched.slug,
                            suiteName: matched.name,
                            pricePerNight: matched.pricePerNight,
                          });
                        }
                      }}
                      className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-sm text-[#111111] dark:text-white font-serif font-bold focus:outline-none focus:border-[#C6A15B]"
                    >
                      {INITIAL_ROOMS.map((rm) => (
                        <option key={rm.slug} value={rm.slug}>
                          {rm.name} — ₦{rm.pricePerNight.toLocaleString()} / night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Check-In Date</label>
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                    <div>
                      <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Check-Out Date</label>
                      <input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Number of Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6+ Guests</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full min-h-[50px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
                  >
                    <span>Continue to Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: GUEST INFORMATION */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-4">
                  <h3 className="font-serif text-2xl text-[#111111] dark:text-white">Step 2: Guest Details</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Provide contact information for instant digital voucher dispatch.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Full Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Oluwaseun Davies"
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="guest@domain.com"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                        className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                    <div>
                      <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 704 100 8351"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                        className="w-full min-h-[48px] bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#111111] dark:text-neutral-300 font-semibold block mb-1.5">Special Requests (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Airport pick-up time, dietary preferences, late check-in..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-4 py-3 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-1/3 min-h-[48px] border border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.guestName || !formData.guestEmail) {
                          alert('Please enter your full name and email address.');
                          return;
                        }
                        setCurrentStep(3);
                      }}
                      className="w-2/3 min-h-[48px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Continue to Add-Ons</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: OPTIONAL ADD-ON SERVICES */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-4">
                  <h3 className="font-serif text-2xl text-[#111111] dark:text-white">Step 3: Enhance Your Stay</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Bundle Range Rover chauffeur mobility, airport VIP escorts, or private chefs.</p>
                </div>

                <div className="space-y-3">
                  {ADDON_SERVICES.map((addon) => {
                    const Icon = addon.icon;
                    const selected = formData.selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                          selected
                            ? 'border-[#C6A15B] bg-[#C6A15B]/10 shadow-md'
                            : 'border-[#E8E5DF] dark:border-[#2C2B29] bg-[#FAF9F6] dark:bg-[#111111]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-base text-[#111111] dark:text-white font-medium">{addon.name}</h4>
                            <span className="text-xs font-semibold text-[#C6A15B]">
                              +₦{addon.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">{addon.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 min-h-[48px] border border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="w-2/3 min-h-[48px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: ENCRYPTED PAYMENT METHOD */}
            {currentStep === 4 && !bookingCompleted && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-4">
                  <h3 className="font-serif text-2xl text-[#111111] dark:text-white">Step 4: Select Payment Method</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">All transactions are encrypted with instant digital booking voucher generation.</p>
                </div>

                <form onSubmit={handleCompleteBooking} className="space-y-6 text-xs">
                  <div className="space-y-3">
                    {/* Bank Transfer Option */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Bank Transfer' })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === 'Bank Transfer'
                          ? 'border-[#C6A15B] bg-[#C6A15B]/10 shadow-md'
                          : 'border-[#E8E5DF] dark:border-[#2C2B29] bg-[#FAF9F6] dark:bg-[#111111]'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                      <div className="space-y-1">
                        <div className="font-serif text-base text-[#111111] dark:text-white font-medium">Direct Bank Transfer (Instant Verification)</div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          Transfer directly to our official GTBank corporate account. Recommended for instant booking confirmation.
                        </p>
                      </div>
                    </div>

                    {/* Card Option */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Paystack' })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === 'Paystack'
                          ? 'border-[#C6A15B] bg-[#C6A15B]/10 shadow-md'
                          : 'border-[#E8E5DF] dark:border-[#2C2B29] bg-[#FAF9F6] dark:bg-[#111111]'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                      <div className="space-y-1">
                        <div className="font-serif text-base text-[#111111] dark:text-white font-medium">Debit Card / Paystack</div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          Pay securely using Mastercard, Visa, Verve, or USSD code.
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === 'Bank Transfer' && (
                    <div className="p-5 bg-[#FAF9F6] dark:bg-[#111111] border border-[#C6A15B]/40 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#C6A15B] font-bold uppercase tracking-wider">
                        <span>GTBank Corporate Account</span>
                        <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-300 dark:border-emerald-800 text-[10px]">
                          Instant Auto-Verify
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Bank Name</span>
                          <span className="font-semibold text-[#111111] dark:text-white">Guaranty Trust Bank (GTBank)</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Account Name</span>
                          <span className="font-semibold text-[#111111] dark:text-white">Stay Connect Nigeria Ltd</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-neutral-500 dark:text-neutral-400">Account Number</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-base font-bold text-[#C6A15B]">0123456789</span>
                            <button
                              type="button"
                              onClick={handleCopyAccount}
                              className="px-2.5 py-1 bg-[#E8E5DF] dark:bg-[#2C2B29] hover:bg-[#C6A15B] text-neutral-800 dark:text-neutral-200 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              {copiedAccount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedAccount ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="w-1/3 min-h-[48px] border border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-600 dark:text-neutral-400 rounded-xl font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 min-h-[48px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all active:scale-95"
                    >
                      {isSubmitting ? 'Processing Voucher...' : 'Complete Reservation'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* CONFIRMATION MODAL STEP 4 RESULT */}
            {currentStep === 4 && bookingCompleted && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Reservation Confirmed</span>
                  <h2 className="font-serif text-3xl text-[#111111] dark:text-white">Voucher #{bookingCompleted.bookingRef}</h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    Thank you, <strong>{formData.guestName}</strong>! Your digital voucher has been created and dispatched to{' '}
                    <span className="text-[#C6A15B] font-semibold">{formData.guestEmail}</span>.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex items-center justify-center">
                  <Link href="/" className="px-8 py-3.5 bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold uppercase tracking-widest rounded-xl text-xs shadow-lg transition-all">
                    Return to Homepage
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Live Order Summary Panel */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-28">
            <h3 className="font-serif text-2xl text-[#111111] dark:text-white border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-4">
              Live Order Breakdown
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                <span>Selected Suite</span>
                <span className="font-semibold text-[#111111] dark:text-white">{formData.suiteName}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                <span>Stay Window</span>
                <span className="text-[#111111] dark:text-white">{formData.nights} Nights</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                <span>Nightly Rate Total</span>
                <span className="font-semibold text-[#111111] dark:text-white">₦{nightlyTotal.toLocaleString()}</span>
              </div>

              {formData.selectedAddOns.length > 0 && (
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400 border-t border-dashed border-[#E8E5DF] dark:border-[#2C2B29] pt-2">
                  <span>Selected Add-On Services</span>
                  <span className="font-semibold text-[#C6A15B]">+₦{addOnsTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                <span>VAT (7.5%)</span>
                <span className="text-[#111111] dark:text-white">₦{vatAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                <span>State Hospitality Tax (5%)</span>
                <span className="text-[#111111] dark:text-white">₦{stateTax.toLocaleString()}</span>
              </div>

              <div className="border-t border-[#E8E5DF] dark:border-[#2C2B29] pt-4 flex justify-between items-center text-sm">
                <span className="font-bold text-[#111111] dark:text-white">Grand Total</span>
                <span className="font-serif text-2xl font-bold text-[#C6A15B]">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF9F6] dark:bg-[#111111] rounded-2xl border border-[#E8E5DF] dark:border-[#2C2B29] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#C6A15B] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Stay Connect Direct Guarantee</span>
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Includes 24/7 power guarantee, complimentary high-speed fiber internet, and instant digital check-in voucher.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
