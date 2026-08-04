'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Users, Search, ShieldCheck, MapPin, Building2, Car, Compass, Plane, ConciergeBell } from 'lucide-react';

export default function BookingSearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'stays' | 'mobility' | 'transfers' | 'experiences' | 'concierge'>('stays');
  const [destination, setDestination] = useState('Lagos');
  const [propertyType, setPropertyType] = useState('All');
  const [checkIn, setCheckIn] = useState('2026-08-15');
  const [checkOut, setCheckOut] = useState('2026-08-18');
  const [guests, setGuests] = useState('2');
  const [vehicleCategory, setVehicleCategory] = useState('SUV');
  const [airport, setAirport] = useState('Lagos MMIA');
  const [serviceType, setServiceType] = useState('Private Chef Service');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'stays') {
      const query = new URLSearchParams({
        city: destination,
        category: propertyType !== 'All' ? propertyType : '',
        checkIn,
        checkOut,
        guests,
      }).toString();
      router.push(`/rooms?${query}`);
    } else if (activeTab === 'mobility') {
      router.push(`/car-rentals?category=${vehicleCategory}&city=${destination}`);
    } else if (activeTab === 'transfers') {
      router.push(`/transfers?airport=${encodeURIComponent(airport)}`);
    } else if (activeTab === 'experiences') {
      router.push(`/experiences?city=${destination}`);
    } else {
      router.push(`/concierge?service=${encodeURIComponent(serviceType)}`);
    }
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto -mt-10 sm:-mt-16 px-4">
      <div className="bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border border-[#E8E5DF] dark:border-[#C6A15B]/30 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 text-[#111111] dark:text-white transition-colors duration-300">
        <div className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold mb-3">
          What are you looking for?
        </div>

        {/* 5-Service Category Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-[#E8E5DF] dark:border-[#2C2B29]">
          <button
            type="button"
            onClick={() => setActiveTab('stays')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'stays' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#FAF9F6] dark:bg-[#1A1918] text-neutral-700 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white border border-[#E8E5DF] dark:border-transparent'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Places to Stay</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mobility')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'mobility' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#1A1918] text-neutral-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Car Rentals</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('transfers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'transfers' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#1A1918] text-neutral-400 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Airport Transfers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'experiences' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#1A1918] text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Experiences</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('concierge')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'concierge' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#1A1918] text-neutral-400 hover:text-white'
            }`}
          >
            <ConciergeBell className="w-3.5 h-3.5" />
            <span>Concierge Services</span>
          </button>
        </div>

        {/* Dynamic Inputs Unification Bar */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="bg-[#FAF9F6] dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-2xl p-3 sm:p-4 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
              {activeTab === 'stays' && (
                <>
                  <div className="space-y-1 lg:col-span-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Destination</span>
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white focus:border-[#C6A15B]"
                    >
                      <option value="Lagos">Lagos (Lekki, Ikoyi, VI)</option>
                      <option value="Abuja">Abuja (Maitama, Asokoro)</option>
                      <option value="Port Harcourt">Port Harcourt</option>
                    </select>
                  </div>

                  <div className="space-y-1 lg:col-span-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Accommodation Type</span>
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white focus:border-[#C6A15B]"
                    >
                      <option value="All">All Accommodation Types</option>
                      <option value="Luxury Hotel">Luxury Hotels</option>
                      <option value="Serviced Apartment">Serviced Apartments</option>
                      <option value="Luxury Residence">Luxury Residences</option>
                      <option value="Villa">Private Villas</option>
                    </select>
                  </div>

                  <div className="space-y-1 lg:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Check-In</span>
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    />
                  </div>

                  <div className="space-y-1 lg:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Guests</span>
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6+ Guests (Villas)</option>
                    </select>
                  </div>

                  {/* Directly Adjacent Search Action Button */}
                  <div className="lg:col-span-2 pt-1 lg:pt-5">
                    <button
                      type="submit"
                      className="w-full min-h-[44px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95 shrink-0"
                    >
                      <Search className="w-4 h-4 shrink-0" />
                      <span>Search</span>
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'mobility' && (
                <>
                  <div className="space-y-1 lg:col-span-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Vehicle Class</span>
                    </label>
                    <select
                      value={vehicleCategory}
                      onChange={(e) => setVehicleCategory(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    >
                      <option value="All">All Luxury Vehicles</option>
                      <option value="Range Rover Autobiography">Range Rover Autobiography</option>
                      <option value="Mercedes G-Wagon G63">Mercedes G-Wagon G63</option>
                      <option value="Rolls-Royce Cullinan">Rolls-Royce Cullinan</option>
                      <option value="Toyota Land Cruiser">Toyota Land Cruiser VIP</option>
                    </select>
                  </div>

                  <div className="space-y-1 lg:col-span-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Pick-Up City</span>
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    >
                      <option value="Lagos">Lagos State</option>
                      <option value="Abuja">Abuja FCT</option>
                      <option value="Port Harcourt">Port Harcourt</option>
                    </select>
                  </div>

                  <div className="space-y-1 lg:col-span-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Rental Date</span>
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    />
                  </div>

                  {/* Search Button docked directly beside inputs */}
                  <div className="lg:col-span-3 pt-1 lg:pt-5">
                    <button
                      type="submit"
                      className="w-full min-h-[44px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Search className="w-4 h-4 shrink-0" />
                      <span>Search Mobility</span>
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'transfers' && (
                <>
                  <div className="space-y-1 lg:col-span-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Airport Location</span>
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    >
                      <option value="Lagos">Murtala Muhammed Int'l Airport (LOS)</option>
                      <option value="Abuja">Nnamdi Azikiwe Int'l Airport (ABV)</option>
                      <option value="Port Harcourt">Port Harcourt Int'l Airport (PHC)</option>
                    </select>
                  </div>

                  <div className="space-y-1 lg:col-span-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Flight Arrival Date</span>
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    />
                  </div>

                  {/* Search Button docked directly beside inputs */}
                  <div className="lg:col-span-4 pt-1 lg:pt-5">
                    <button
                      type="submit"
                      className="w-full min-h-[44px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Search className="w-4 h-4 shrink-0" />
                      <span>Search Transfers</span>
                    </button>
                  </div>
                </>
              )}

              {(activeTab === 'experiences' || activeTab === 'concierge') && (
                <>
                  <div className="space-y-1 lg:col-span-5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <ConciergeBell className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Service Type</span>
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    >
                      <option value="Private Chef Service">Private Chef Service</option>
                      <option value="VIP Security & Escort">VIP Security & Escort</option>
                      <option value="Yacht Lagoon Cruise">Private Yacht Cruise</option>
                      <option value="Proposal Setup">Proposal & Romantic Setup</option>
                      <option value="Restaurant Reservation">Fine Dining Reservation</option>
                    </select>
                  </div>

                  <div className="space-y-1 lg:col-span-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full min-h-[44px] bg-white dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-xl px-3 py-2 text-xs text-[#111111] dark:text-white"
                    />
                  </div>

                  {/* Search Button docked directly beside inputs */}
                  <div className="lg:col-span-3 pt-1 lg:pt-5">
                    <button
                      type="submit"
                      className="w-full min-h-[44px] bg-[#C6A15B] hover:bg-[#d8b46e] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Search className="w-4 h-4 shrink-0" />
                      <span>Search Services</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>

        <div className="mt-3 pt-3 border-t border-[#E8E5DF] dark:border-[#2C2B29] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 font-light gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#C6A15B] font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Verified Luxury Properties & Partners • Direct Platform Pricing</span>
          </div>
          <div className="text-[10px] sm:text-[11px]">Lagos • Abuja • Port Harcourt</div>
        </div>
      </div>
    </div>
  );
}
