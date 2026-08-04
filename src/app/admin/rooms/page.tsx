'use client';

import React from 'react';
import Link from 'next/link';
import { BedDouble, Plus, CheckCircle, BarChart3, Building, Calendar, LogOut } from 'lucide-react';
import { INITIAL_ROOMS } from '@/lib/data/seedData';

export default function AdminRoomsPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans flex">
      <aside className="w-64 border-r border-[#2C2B29] p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-sm">
              SC
            </div>
            <div>
              <div className="font-serif text-lg text-white font-medium">Stay Connect</div>
              <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest">Admin Portal</div>
            </div>
          </div>

          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <BarChart3 className="w-4 h-4 text-[#C6A15B]" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <Building className="w-4 h-4 text-[#C6A15B]" />
              <span>Properties</span>
            </Link>
            <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest">
              <BedDouble className="w-4 h-4" />
              <span>Rooms & Inventory</span>
            </Link>
            <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <Calendar className="w-4 h-4 text-[#C6A15B]" />
              <span>Reservations CRM</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#2C2B29]">
          <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B] transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 space-y-10">
        <div className="flex items-center justify-between border-b border-[#2C2B29] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Inventory Manager</span>
            <h1 className="font-serif text-3xl text-white font-normal mt-1">Suites & Rooms Catalog</h1>
          </div>
          <button className="px-5 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create New Room</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_ROOMS.map((rm) => (
            <div key={rm.id} className="p-8 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-white">{rm.name}</h3>
                <span className="text-xs font-serif text-[#C6A15B]">₦{rm.pricePerNight.toLocaleString()} / night</span>
              </div>
              <div className="text-xs text-neutral-400">
                {rm.maxGuests} Guests • {rm.propertySize} m² • {rm.bedrooms} BR • 📍 {rm.address}
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{rm.description}</p>
              <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Published
                </span>
                <Link href={`/rooms/${rm.slug}`} className="text-white hover:text-[#C6A15B] underline">
                  View Suite →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
