'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, AlertTriangle, RefreshCw, BarChart3, Building, BedDouble, Calendar, Car, LogOut, Utensils } from 'lucide-react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

interface RoomStatus {
  id: string;
  roomName: string;
  roomType: string;
  assignedHousekeeper: string;
  cleaningStatus: 'Clean & Inspected' | 'Turnover In Progress' | 'Dirty / Needs Cleaning' | 'Out of Service';
  lastCleaned: string;
  priority: 'High' | 'Normal' | 'Low';
}

export default function AdminHousekeepingPage() {
  const [housekeepingList, setHousekeepingList] = useState<RoomStatus[]>([
    {
      id: 'hk-1',
      roomName: 'Saffron Executive Suite (14B Providence)',
      roomType: 'Executive Single Suite',
      assignedHousekeeper: 'Blessing Okon',
      cleaningStatus: 'Clean & Inspected',
      lastCleaned: 'Today at 10:30 AM',
      priority: 'Normal',
    },
    {
      id: 'hk-2',
      roomName: 'The Royal Lekki Penthouse',
      roomType: 'Presidential Penthouse',
      assignedHousekeeper: 'Florence Nwachukwu',
      cleaningStatus: 'Turnover In Progress',
      lastCleaned: 'In progress...',
      priority: 'High',
    },
    {
      id: 'hk-3',
      roomName: 'Azure Deluxe Suite',
      roomType: 'Executive Deluxe',
      assignedHousekeeper: 'Grace Adebayo',
      cleaningStatus: 'Dirty / Needs Cleaning',
      lastCleaned: 'Yesterday at 2:00 PM',
      priority: 'High',
    },
  ]);

  const updateStatus = (id: string, newStatus: any) => {
    setHousekeepingList(
      housekeepingList.map((h) => (h.id === id ? { ...h, cleaningStatus: newStatus } : h))
    );
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#111111] text-white font-sans flex flex-col md:flex-row">
        {/* Mobile Header Bar */}
        <AdminMobileNav />

        {/* Sidebar */}
        <aside className="w-64 border-r border-[#2C2B29] p-6 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-sm">
                SC
              </div>
              <div>
                <div className="font-serif text-lg text-white font-medium">Stay Connect</div>
                <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest font-semibold">PMS Operations</div>
              </div>
            </div>

            <nav className="space-y-2 text-xs uppercase tracking-widest font-medium">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <BarChart3 className="w-4 h-4 text-[#C6A15B]" />
                <span>Dashboard</span>
              </Link>
              <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <Building className="w-4 h-4 text-[#C6A15B]" />
                <span>Properties</span>
              </Link>
              <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <BedDouble className="w-4 h-4 text-[#C6A15B]" />
                <span>Rooms Inventory</span>
              </Link>
              <Link href="/admin/housekeeping" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold">
                <RefreshCw className="w-4 h-4" />
                <span>Housekeeping Ops</span>
              </Link>
              <Link href="/admin/dining" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <Utensils className="w-4 h-4 text-[#C6A15B]" />
                <span>Dining & Menu</span>
              </Link>
              <Link href="/admin/fleet" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <Car className="w-4 h-4 text-[#C6A15B]" />
                <span>Fleet Logistics</span>
              </Link>
              <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <Calendar className="w-4 h-4 text-[#C6A15B]" />
                <span>Reservations CRM</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#2C2B29]">
            <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B]">
              <LogOut className="w-4 h-4" />
              <span>Return to Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 space-y-8 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Hotel Operations</span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">Housekeeping & Suite Hygiene Control</h1>
            </div>

            <div className="text-xs text-neutral-400 font-light">
              Executive Turnover Protocol • 14B Providence St, Lekki
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="text-neutral-400 text-xs font-medium">Clean & Inspected Suites</div>
              <div className="font-serif text-3xl text-emerald-400 font-bold">
                {housekeepingList.filter((h) => h.cleaningStatus === 'Clean & Inspected').length}
              </div>
            </div>

            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="text-neutral-400 text-xs font-medium">Turnover In Progress</div>
              <div className="font-serif text-3xl text-amber-400 font-bold">
                {housekeepingList.filter((h) => h.cleaningStatus === 'Turnover In Progress').length}
              </div>
            </div>

            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="text-neutral-400 text-xs font-medium">Dirty / Action Needed</div>
              <div className="font-serif text-3xl text-rose-400 font-bold">
                {housekeepingList.filter((h) => h.cleaningStatus === 'Dirty / Needs Cleaning').length}
              </div>
            </div>
          </div>

          <div className="bg-[#1A1918] rounded-2xl border border-[#2C2B29] p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light text-neutral-300 min-w-[600px]">
                <thead className="bg-[#111111] text-[#C6A15B] uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Suite / Room</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Assigned Housekeeper</th>
                    <th className="py-3 px-4">Last Inspected</th>
                    <th className="py-3 px-4">Cleaning Status & Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2B29]">
                  {housekeepingList.map((h) => (
                    <tr key={h.id} className="hover:bg-[#252422] transition-colors">
                      <td className="py-4 px-4 font-serif text-white font-medium">{h.roomName}</td>
                      <td className="py-4 px-4 text-neutral-400">{h.roomType}</td>
                      <td className="py-4 px-4 text-neutral-200">{h.assignedHousekeeper}</td>
                      <td className="py-4 px-4 text-neutral-400">{h.lastCleaned}</td>
                      <td className="py-4 px-4">
                        <select
                          value={h.cleaningStatus}
                          onChange={(e) => updateStatus(h.id, e.target.value)}
                          className="bg-[#111111] border border-[#2C2B29] text-[#C6A15B] text-[11px] rounded px-3 py-1.5 focus:outline-none focus:border-[#C6A15B]"
                        >
                          <option value="Clean & Inspected">Clean & Inspected</option>
                          <option value="Turnover In Progress">Turnover In Progress</option>
                          <option value="Dirty / Needs Cleaning">Dirty / Needs Cleaning</option>
                          <option value="Out of Service">Out of Service</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
