'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  BedDouble,
  Users,
  CheckCircle,
  Clock,
  Plus,
  Building,
  ShieldCheck,
  BarChart3,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { INITIAL_BOOKINGS, INITIAL_ROOMS, INITIAL_PROPERTIES } from '@/lib/data/seedData';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const activeBookingsCount = bookings.length;
  const occupancyRate = 85; // %
  const adr = 215000; // Average Daily Rate in NGN
  const revpar = 182750; // RevPAR in NGN

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans flex">
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 border-r border-[#2C2B29] p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-sm">
              SC
            </div>
            <div>
              <div className="font-serif text-lg text-white font-medium">Stay Connect</div>
              <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest">Admin Portal v1.0</div>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/properties"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium"
            >
              <Building className="w-4 h-4 text-[#C6A15B]" />
              <span>Properties</span>
            </Link>

            <Link
              href="/admin/rooms"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium"
            >
              <BedDouble className="w-4 h-4 text-[#C6A15B]" />
              <span>Rooms & Inventory</span>
            </Link>

            <Link
              href="/admin/bookings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium"
            >
              <Calendar className="w-4 h-4 text-[#C6A15B]" />
              <span>Reservations CRM</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#2C2B29]">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Dashboard Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto space-y-10">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Executive Overview
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-white font-normal mt-1">
              Multi-Property Performance Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="px-4 py-2.5 bg-[#C6A15B] text-[#111111] font-medium text-xs uppercase tracking-widest rounded shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Reservation</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-wider font-medium">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-[#C6A15B]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">
              ₦{totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#C6A15B] flex items-center gap-1 font-light">
              <TrendingUp className="w-3 h-3" /> +18.4% vs last month
            </div>
          </div>

          <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-wider font-medium">
              <span>Occupancy Rate</span>
              <BedDouble className="w-4 h-4 text-[#C6A15B]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">{occupancyRate}%</div>
            <div className="text-[11px] text-neutral-400 font-light">
              Lekki Flagship Peak Demand
            </div>
          </div>

          <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-wider font-medium">
              <span>Average Daily Rate (ADR)</span>
              <BarChart3 className="w-4 h-4 text-[#C6A15B]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">
              ₦{adr.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#C6A15B] font-light">RevPAR: ₦{revpar.toLocaleString()}</div>
          </div>

          <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-wider font-medium">
              <span>Active Reservations</span>
              <Users className="w-4 h-4 text-[#C6A15B]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">{activeBookingsCount}</div>
            <div className="text-[11px] text-neutral-400 font-light">
              Including Saffron Executive Stay
            </div>
          </div>
        </div>

        {/* Flagship Room Management Bar */}
        <div className="p-6 bg-[#1A1918] rounded-xl border border-[#C6A15B]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#2C2B29] pb-3">
            <div className="font-serif text-xl text-white">Flagship Suite Status: Saffron</div>
            <span className="px-3 py-1 bg-[#C6A15B] text-[#111111] text-xs uppercase font-bold rounded-full">
              14B Providence St, Lekki
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
            <div>
              <div className="text-neutral-400 font-light">Suite ID</div>
              <div className="font-medium text-white">room-saffron-1</div>
            </div>
            <div>
              <div className="text-neutral-400 font-light">Rate</div>
              <div className="font-medium text-[#C6A15B]">₦185,000 / night</div>
            </div>
            <div>
              <div className="text-neutral-400 font-light">Specs</div>
              <div className="font-medium text-white">150 m² • 1 BR • 1 BA</div>
            </div>
            <div>
              <div className="text-neutral-400 font-light">Guest Capacity</div>
              <div className="font-medium text-white">2 Guests</div>
            </div>
            <div>
              <div className="text-neutral-400 font-light">Status</div>
              <div className="font-medium text-[#C6A15B] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#C6A15B]" /> Published & Ready
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reservations Table */}
        <div className="bg-[#1A1918] rounded-xl border border-[#2C2B29] overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-4">
            <h3 className="font-serif text-2xl text-white">Recent Guest Reservations</h3>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search guest or ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#111111] border border-[#2C2B29] pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 rounded focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#111111] border border-[#2C2B29] px-3 py-2 text-xs text-white rounded focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Checked In">Checked In</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light text-neutral-300">
              <thead className="bg-[#111111] text-[#C6A15B] uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Suite Booked</th>
                  <th className="py-3 px-4">Check-In → Out</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2B29]">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#252422] transition-colors">
                    <td className="py-4 px-4 font-mono text-white font-medium">{b.bookingRef}</td>
                    <td className="py-4 px-4 text-white font-medium">
                      {b.guestName}
                      <div className="text-[10px] text-neutral-400">{b.guestPhone}</div>
                    </td>
                    <td className="py-4 px-4 text-neutral-200">{b.roomName}</td>
                    <td className="py-4 px-4">
                      {b.checkIn} → {b.checkOut}
                      <div className="text-[10px] text-[#C6A15B]">{b.nights} Night(s)</div>
                    </td>
                    <td className="py-4 px-4 font-serif text-sm font-semibold text-white">
                      ₦{b.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#111111] border border-[#2C2B29] text-[10px] text-[#C6A15B]">
                        {b.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : b.status === 'Pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
