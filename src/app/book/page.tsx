'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  CheckCircle2,
  Calendar,
  Users,
  Building,
  CreditCard,
  Check,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { INITIAL_PROPERTIES, INITIAL_ROOMS } from '@/lib/data/seedData';
import { Room, Property } from '@/types';

function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Wizard Steps: 1..7
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedProperty, setSelectedProperty] = useState<Property>(INITIAL_PROPERTIES[0]);
  const [selectedRoom, setSelectedRoom] = useState<Room>(
    INITIAL_ROOMS.find((r) => r.slug === searchParams.get('room')) || INITIAL_ROOMS[0]
  );

  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '2026-08-15');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '2026-08-18');
  const [adults, setAdults] = useState(searchParams.get('adults') || '2');
  const [children, setChildren] = useState('0');
  const [promoCode, setPromoCode] = useState(searchParams.get('promoCode') || '');

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [specialRequests, setSpecialRequests] = useState('');
  const [arrivalTime, setArrivalTime] = useState('15:00');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Paystack' | 'Stripe' | 'Pay at Hotel'>('Bank Transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diff = Math.abs(d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));

  // Pricing calculations
  const subtotal = selectedRoom.pricePerNight * nights;
  const discountAmount = promoCode.toUpperCase() === 'LEKKI20' ? subtotal * 0.2 : 0;
  const taxableSubtotal = subtotal - discountAmount;
  const vat = taxableSubtotal * 0.075;
  const lagosTax = taxableSubtotal * 0.05;
  const totalPrice = taxableSubtotal + vat + lagosTax;

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedProperty.id,
          roomId: selectedRoom.id,
          roomName: `${selectedRoom.name} (${selectedRoom.type})`,
          checkIn,
          checkOut,
          nights,
          adults,
          children,
          guestName,
          guestEmail,
          guestPhone,
          country,
          specialRequests,
          arrivalTime,
          promoCode,
          subtotal,
          taxesAndFees: vat + lagosTax,
          discountAmount,
          totalPrice,
          paymentMethod,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setBookingResult(resData.data);
        setCurrentStep(7);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    'Property',
    'Dates & Guests',
    'Choose Room',
    'Guest Details',
    'Summary & Taxes',
    'Payment Method',
    'Confirmation'
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-12">
      {/* Wizard Progress Bar */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
            Luxury Guest Reservation
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#111111] font-normal">
            Step {currentStep} of 7: {stepTitles[currentStep - 1]}
          </h1>
        </div>

        {/* Timeline Stepper */}
        <div className="grid grid-cols-7 gap-1 pt-4">
          {stepTitles.map((st, i) => {
            const stepNum = i + 1;
            const active = currentStep === stepNum;
            const completed = currentStep > stepNum;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-full h-1.5 rounded-full transition-all duration-500 ${
                    completed
                      ? 'bg-[#C6A15B]'
                      : active
                      ? 'bg-[#111111]'
                      : 'bg-[#E8E5DF]'
                  }`}
                />
                <span
                  className={`text-[9px] uppercase tracking-wider font-semibold hidden md:inline text-center ${
                    active ? 'text-[#C6A15B]' : 'text-neutral-400'
                  }`}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Select Property */}
      {currentStep === 1 && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
          <h3 className="font-serif text-2xl text-[#111111]">Step 1: Select Hotel Property</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_PROPERTIES.map((prop) => (
              <div
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedProperty.id === prop.id
                    ? 'border-[#C6A15B] bg-[#FAF9F6] shadow-lg'
                    : 'border-[#E8E5DF] hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-medium text-[#111111]">{prop.name}</h4>
                  {selectedProperty.id === prop.id && <CheckCircle2 className="w-5 h-5 text-[#C6A15B]" />}
                </div>
                <p className="text-xs text-neutral-500 font-light mt-1">{prop.address}</p>
                <p className="text-xs text-neutral-700 font-light mt-3">{prop.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-widest rounded flex items-center gap-2"
            >
              <span>Next: Select Dates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Dates & Guests */}
      {currentStep === 2 && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
          <h3 className="font-serif text-2xl text-[#111111]">Step 2: Choose Stay Dates & Guests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Check-In Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Check-Out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Adult Guests</label>
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Children</label>
              <select
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              >
                <option value="0">0 Children</option>
                <option value="1">1 Child</option>
              </select>
            </div>
          </div>
          <div className="p-4 bg-[#FAF9F6] rounded border border-[#E8E5DF] text-xs text-[#C6A15B] font-medium">
            Calculated Duration: {nights} Night(s) in Lekki.
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 border border-[#111111] text-xs font-medium uppercase tracking-widest rounded"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-8 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-widest rounded flex items-center gap-2"
            >
              <span>Next: Select Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Choose Room (Saffron Spotlight) */}
      {currentStep === 3 && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
          <h3 className="font-serif text-2xl text-[#111111]">Step 3: Select Room / Suite</h3>
          <div className="space-y-4">
            {INITIAL_ROOMS.map((rm) => (
              <div
                key={rm.id}
                onClick={() => setSelectedRoom(rm)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  selectedRoom.id === rm.id
                    ? 'border-[#C6A15B] bg-[#FAF9F6] shadow-md'
                    : 'border-[#E8E5DF] hover:border-neutral-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-xl font-medium text-[#111111]">{rm.name}</h4>
                    {rm.slug === 'saffron' && (
                      <span className="px-2 py-0.5 bg-[#C6A15B] text-[#111111] text-[10px] uppercase font-bold rounded">
                        Flagship 14B Providence
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500 font-light">
                    {rm.maxGuests} Guests • {rm.propertySize} m² • {rm.bedrooms} Bedroom • 📍 {rm.address}
                  </div>
                  <p className="text-xs text-neutral-700 font-light max-w-xl">{rm.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-serif text-2xl font-bold text-[#111111]">
                    ₦{rm.pricePerNight.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-neutral-400">per night</div>
                  {selectedRoom.id === rm.id && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#C6A15B] font-semibold mt-2">
                      <CheckCircle2 className="w-4 h-4" /> Selected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 border border-[#111111] text-xs font-medium uppercase tracking-widest rounded"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-8 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-widest rounded flex items-center gap-2"
            >
              <span>Next: Guest Information</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Guest Information */}
      {currentStep === 4 && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
          <h3 className="font-serif text-2xl text-[#111111]">Step 4: Guest Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Full Name *</label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Babatunde Alabi"
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Email Address *</label>
              <input
                type="email"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="e.g. guest@domain.com"
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Phone Number *</label>
              <input
                type="tel"
                required
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+234 803 123 4567"
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Country of Residence</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-[#111111]">Special Requests & Airport Concierge</label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="High floor preference, late arrival, private airport chauffeur details..."
                className="w-full bg-[#FAF9F6] border border-[#E8E5DF] rounded p-3 text-xs text-[#111111] mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 border border-[#111111] text-xs font-medium uppercase tracking-widest rounded"
            >
              Back
            </button>
            <button
              disabled={!guestName || !guestEmail || !guestPhone}
              onClick={() => setCurrentStep(5)}
              className="px-8 py-3 bg-[#C6A15B] hover:bg-[#B08C46] disabled:opacity-50 text-[#111111] font-medium text-xs uppercase tracking-widest rounded flex items-center gap-2"
            >
              <span>Next: Review Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Summary & Taxes */}
      {currentStep === 5 && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
          <h3 className="font-serif text-2xl text-[#111111]">Step 5: Reservation Summary & Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-xs font-light text-neutral-700">
              <div className="p-4 bg-[#FAF9F6] rounded-xl space-y-2 border border-[#E8E5DF]">
                <div className="font-serif text-lg text-[#111111] font-medium">{selectedRoom.name}</div>
                <div>📍 {selectedRoom.address}</div>
                <div>Dates: {checkIn} to {checkOut} ({nights} nights)</div>
                <div>Guests: {adults} Adult(s), {children} Child(ren)</div>
                <div>Guest Contact: {guestName} ({guestEmail})</div>
              </div>
            </div>

            <div className="p-6 bg-[#111111] text-white rounded-xl space-y-4">
              <div className="font-serif text-xl text-[#C6A15B] border-b border-[#2C2B29] pb-2">
                Cost & Tax Calculation
              </div>
              <div className="space-y-2 text-xs font-light text-neutral-300">
                <div className="flex justify-between">
                  <span>Room Subtotal ({nights} nights)</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C6A15B]">
                    <span>Promo Discount ({promoCode})</span>
                    <span>-₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>7.5% Federal VAT</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>5% Lagos Hotel Consumption Tax</span>
                  <span>₦{lagosTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-white font-bold pt-3 border-t border-[#2C2B29]">
                  <span>Total Amount Payable</span>
                  <span className="text-[#C6A15B]">₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 border border-[#111111] text-xs font-medium uppercase tracking-widest rounded"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-8 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-widest rounded flex items-center gap-2"
            >
              <span>Next: Payment Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Payment Selection */}
      {currentStep === 6 && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
          <h3 className="font-serif text-2xl text-[#111111]">Step 6: Select Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Bank Transfer', 'Paystack', 'Pay at Hotel'] as const).map((method) => (
              <div
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === method
                    ? 'border-[#C6A15B] bg-[#FAF9F6] shadow-md'
                    : 'border-[#E8E5DF] hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-6 h-6 text-[#C6A15B]" />
                  {paymentMethod === method && <CheckCircle2 className="w-5 h-5 text-[#C6A15B]" />}
                </div>
                <div className="font-serif text-lg font-medium text-[#111111] mt-3">{method}</div>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  {method === 'Bank Transfer'
                    ? 'Direct transfer to Stay Connect Hotels GTBank / Zenith account.'
                    : method === 'Paystack'
                    ? 'Secure online card, USSD & Apple Pay processing.'
                    : 'Settle directly at front desk upon check-in at 14B Providence St.'}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-3 border border-[#111111] text-xs font-medium uppercase tracking-widest rounded"
            >
              Back
            </button>
            <button
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="px-10 py-3.5 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded shadow-xl flex items-center gap-2"
            >
              {isSubmitting ? 'Processing Reservation...' : 'Confirm & Reserve Suite'}
            </button>
          </div>
        </div>
      )}

      {/* Step 7: Booking Confirmation Screen */}
      {currentStep === 7 && bookingResult && (
        <div className="bg-[#111111] text-white p-10 rounded-2xl border border-[#C6A15B]/40 shadow-2xl space-y-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Reservation Confirmed
            </span>
            <h2 className="font-serif text-4xl text-white">
              Thank You, {bookingResult.guestName}
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Your stay at 14B Providence Street, Lekki has been registered under reference:
            </p>
            <div className="font-serif text-3xl text-[#C6A15B] font-bold tracking-widest pt-2">
              {bookingResult.bookingRef}
            </div>
          </div>

          <div className="max-w-xl mx-auto p-6 bg-[#1A1918] rounded-xl border border-[#2C2B29] text-left space-y-3 text-xs font-light text-neutral-300">
            <div className="flex justify-between border-b border-[#2C2B29] pb-2">
              <span>Suite Reserved</span>
              <span className="text-white font-medium">{bookingResult.roomName}</span>
            </div>
            <div className="flex justify-between border-b border-[#2C2B29] pb-2">
              <span>Check-In / Out</span>
              <span className="text-white font-medium">{bookingResult.checkIn} → {bookingResult.checkOut} ({bookingResult.nights} Nights)</span>
            </div>
            <div className="flex justify-between border-b border-[#2C2B29] pb-2">
              <span>Payment Method</span>
              <span className="text-[#C6A15B] font-medium">{bookingResult.paymentMethod} ({bookingResult.paymentStatus})</span>
            </div>
            <div className="flex justify-between font-serif text-lg text-white font-bold pt-2">
              <span>Total Price Paid/Due</span>
              <span className="text-[#C6A15B]">₦{bookingResult.totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-white/40 hover:border-[#C6A15B] text-white hover:text-[#C6A15B] text-xs uppercase tracking-widest rounded"
            >
              Print Confirmation Voucher
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-[#C6A15B] text-[#111111] font-medium text-xs uppercase tracking-widest rounded"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />
      <main className="pt-28 pb-20">
        <Suspense fallback={<div className="text-center py-20 font-serif text-[#C6A15B]">Loading Reservation Wizard...</div>}>
          <BookingWizard />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
