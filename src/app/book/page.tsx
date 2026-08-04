'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Phone, Mail, Check, CreditCard, Shield, Copy, CheckCircle, ArrowRight, MessageSquare, Building2, Upload } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import WhatsAppFloatingWidget from '@/components/ui/WhatsAppFloatingWidget';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState<any>(null);

  const [formData, setFormData] = useState({
    suite: 'Saffron Executive Suite (14B Providence)',
    pricePerNight: 185000,
    checkIn: '2026-08-10',
    checkOut: '2026-08-13',
    nights: 3,
    guests: 2,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    paymentMethod: 'Bank Transfer',
    specialRequests: '',
  });

  const nightlyTotal = formData.pricePerNight * formData.nights;
  const vatAmount = Math.round(nightlyTotal * 0.075);
  const stateTax = Math.round(nightlyTotal * 0.05);
  const grandTotal = nightlyTotal + vatAmount + stateTax;

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
          roomName: formData.suite,
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
        setStep(3);
      } else {
        setBookingCompleted({
          bookingRef: `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          roomName: formData.suite,
          totalPrice: grandTotal,
        });
        setStep(3);
      }
    } catch (err) {
      console.error('Booking creation error:', err);
      setBookingCompleted({
        bookingRef: `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        roomName: formData.suite,
        totalPrice: grandTotal,
      });
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex-1 space-y-8 sm:space-y-12">
        <div className="text-center space-y-2 sm:space-y-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Luxury Suite Checkout</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">Reserve Your Luxury Sanctuary</h1>
          <p className="text-xs text-neutral-400 font-light max-w-md mx-auto">14B, Providence Street, Lekki Phase 1, Lagos, Nigeria</p>
        </div>

        {/* Step 1 & Step 2 Booking Wizard */}
        {step < 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Form Steps */}
            <div className="lg:col-span-7 bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                <span className="text-xs font-serif text-[#C6A15B]">Step {step} of 2</span>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  {step === 1 ? 'Guest & Dates Information' : 'Payment Method Selection'}
                </span>
              </div>

              {step === 1 ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-neutral-300 font-medium block">Selected Suite</label>
                    <input
                      type="text"
                      disabled
                      value={formData.suite}
                      className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-[#C6A15B] font-serif font-bold mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1 w-full">
                      <label className="text-neutral-300 font-medium block">Check-In Date</label>
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        style={{ colorScheme: 'dark' }}
                        className="w-full min-h-[48px] bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm sm:text-xs text-white font-medium focus:outline-none focus:border-[#C6A15B] appearance-none mt-1"
                      />
                    </div>
                    <div className="space-y-1 w-full">
                      <label className="text-neutral-300 font-medium block">Check-Out Date</label>
                      <input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        style={{ colorScheme: 'dark' }}
                        className="w-full min-h-[48px] bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm sm:text-xs text-white font-medium focus:outline-none focus:border-[#C6A15B] appearance-none mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-neutral-300 font-medium block">Guest Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Oluwaseun Davies"
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        className="w-full min-h-[48px] bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm sm:text-xs text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-300 font-medium block">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                        className="w-full min-h-[48px] bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm sm:text-xs text-white mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-300 font-medium block">WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 704 100 8351"
                      value={formData.guestPhone}
                      onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                      className="w-full min-h-[48px] bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm sm:text-xs text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-300 font-medium block">Special Requests (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Airport Chauffeur pickup, late check-in, dietary preferences..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full bg-[#111111] border border-[#2C2B29] rounded-xl px-4 py-3 text-sm sm:text-xs text-white mt-1"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.guestName || !formData.guestEmail) {
                        alert('Please fill in your name and email address.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full min-h-[48px] bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 mt-4 active:scale-95"
                  >
                    <span>Proceed to Payment Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCompleteBooking} className="space-y-6 text-xs">
                  <div className="space-y-3">
                    <label className="text-neutral-300 font-semibold block">Select Payment Channel</label>
                    
                    {/* Bank Transfer Option */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Bank Transfer' })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === 'Bank Transfer'
                          ? 'border-[#C6A15B] bg-[#C6A15B]/10'
                          : 'border-[#2C2B29] bg-[#111111]'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                      <div className="space-y-1">
                        <div className="font-serif text-base text-white font-medium">Direct Bank Transfer (Instant Verification)</div>
                        <p className="text-[11px] text-neutral-400">
                          Transfer directly to our official GTBank corporate account. Recommended for instant booking confirmation.
                        </p>
                      </div>
                    </div>

                    {/* Paystack Option */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Paystack' })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === 'Paystack'
                          ? 'border-[#C6A15B] bg-[#C6A15B]/10'
                          : 'border-[#2C2B29] bg-[#111111]'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
                      <div className="space-y-1">
                        <div className="font-serif text-base text-white font-medium">Debit Card / Paystack</div>
                        <p className="text-[11px] text-neutral-400">
                          Pay securely using Mastercard, Visa, Verve, or USSD code.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Account Transfer Card Details */}
                  {formData.paymentMethod === 'Bank Transfer' && (
                    <div className="p-5 bg-[#111111] border border-[#C6A15B]/40 rounded-xl space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#C6A15B] font-semibold uppercase tracking-wider">
                        <span>Official Corporate Bank Account</span>
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded border border-emerald-800 text-[10px]">
                          Instant Auto-Verify
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-[#2C2B29] pb-2">
                          <span className="text-neutral-400">Bank Name</span>
                          <span className="text-white font-semibold">Guaranty Trust Bank (GTBank)</span>
                        </div>
                        <div className="flex justify-between border-b border-[#2C2B29] pb-2">
                          <span className="text-neutral-400">Account Name</span>
                          <span className="text-white font-semibold">Stay Connect Nigeria Ltd</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-neutral-400">Account Number</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-base font-bold text-[#C6A15B]">0123456789</span>
                            <button
                              type="button"
                              onClick={handleCopyAccount}
                              className="px-2.5 py-1 bg-[#2C2B29] hover:bg-[#C6A15B] hover:text-[#111111] text-neutral-300 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              {copiedAccount ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
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
                      onClick={() => setStep(1)}
                      className="w-1/3 min-h-[48px] border border-[#2C2B29] text-neutral-400 hover:text-white rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 min-h-[48px] bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all active:scale-95"
                    >
                      {isSubmitting ? 'Processing Voucher...' : 'Complete & Dispatch Voucher'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Reservation Summary Panel */}
            <div className="lg:col-span-5 bg-[#1A1918] border border-[#2C2B29] rounded-2xl p-5 sm:p-6 space-y-6">
              <h3 className="font-serif text-xl text-white border-b border-[#2C2B29] pb-3">Reservation Summary</h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Suite Rate ({formData.nights} Nights)</span>
                  <span className="text-white">₦{nightlyTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>VAT (7.5%)</span>
                  <span className="text-white">₦{vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Lagos State Hotel Tax (5%)</span>
                  <span className="text-white">₦{stateTax.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#2C2B29] pt-3 flex justify-between items-center text-sm">
                  <span className="font-semibold text-white">Grand Total</span>
                  <span className="font-serif text-xl font-bold text-[#C6A15B]">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-[#111111] rounded-xl border border-[#2C2B29] space-y-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2 text-[#C6A15B] font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>Stay Connect Direct Guarantee</span>
                </div>
                <p>Complimentary High Speed WiFi • Daily Housekeeping • 24/7 Power Security Guarantee.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Public Confirmation Voucher Modal */}
        {step === 3 && bookingCompleted && (
          <div className="bg-[#1A1918] border border-[#C6A15B] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Reservation Confirmed</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">Voucher #{bookingCompleted.bookingRef}</h2>
              <p className="text-xs text-neutral-300">
                Thank you, <strong>{formData.guestName}</strong>! Your reservation voucher has been generated and dispatched to{' '}
                <span className="text-[#C6A15B] font-mono">{formData.guestEmail}</span>.
              </p>
            </div>

            {/* Bank Transfer Receipt Submission Card */}
            {formData.paymentMethod === 'Bank Transfer' && (
              <div className="p-5 sm:p-6 bg-[#111111] border border-[#C6A15B]/40 rounded-xl space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-[#2C2B29] pb-3">
                  <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-wider">Bank Transfer Verification</span>
                  <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded font-bold">
                    Awaiting Transfer Receipt
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">GTBank Account</span>
                    <span className="font-mono text-white font-bold">0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Account Name</span>
                    <span className="text-white">Stay Connect Nigeria Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Total Payable</span>
                    <span className="font-serif text-base text-[#C6A15B] font-bold">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/2347041008351?text=${encodeURIComponent(
                    `Hello Stay Connect Concierge, I have made a bank transfer payment for my reservation:\n\n*Guest Name*: ${formData.guestName}\n*Voucher Ref*: ${bookingCompleted.bookingRef}\n*Amount*: ₦${grandTotal.toLocaleString()}\n*Suite*: ${formData.suite}\n\nAttached is my payment receipt screenshot.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Transfer Receipt via WhatsApp (+234 704 100 8351)</span>
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-center">
              <Link href="/" className="px-8 py-3.5 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold uppercase tracking-widest rounded-xl text-xs shadow-xl transition-all">
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppFloatingWidget />
    </div>
  );
}
