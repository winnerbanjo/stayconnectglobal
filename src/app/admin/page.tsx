'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building,
  BedDouble,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  Plus,
  BarChart3,
  LogOut,
  ShieldCheck,
  PhoneCall,
  UserCheck,
  Search,
  Filter,
  MessageSquare,
  Car,
  Lock,
  RefreshCw,
  Utensils
} from 'lucide-react';
import { INITIAL_BOOKINGS, INITIAL_ROOMS, INITIAL_PARTNERS } from '@/lib/data/seedData';
import { Booking, Partner } from '@/types';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [activeTab, setActiveTab] = useState<'BOOKINGS' | 'PARTNERS'>('BOOKINGS');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DIGITAL' | 'WALK_IN'>('ALL');
  const [showAddWalkInModal, setShowAddWalkInModal] = useState(false);

  useEffect(() => {
    // Fetch live real bookings from database API
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setBookings(json.data);
        }
      })
      .catch((err) => console.error('Error fetching live bookings:', err));

    // Fetch live real partner applications from database API
    fetch('/api/partners')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setPartners(json.data);
        }
      })
      .catch((err) => console.error('Error fetching live partners:', err));
  }, []);
  const [newWalkIn, setNewWalkIn] = useState({
    guestName: '',
    guestPhone: '',
    roomName: 'Saffron (Executive Single Room)',
    checkIn: '2026-08-04',
    checkOut: '2026-08-07',
    nights: 3,
    totalPrice: 624375,
    paymentMethod: 'Bank Transfer',
    channel: 'Walk-In',
  });

  const handleLogout = () => {
    sessionStorage.removeItem('stayconnect_admin_auth');
    window.location.reload();
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const walkInCount = bookings.filter((b) => b.specialRequests?.includes('Walk-In') || b.bookingRef.includes('WALKIN')).length;
  const digitalCount = bookings.length - walkInCount;

  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Booking = {
      id: `book-walkin-${Date.now()}`,
      bookingRef: `SC-WALKIN-${Math.floor(1000 + Math.random() * 9000)}`,
      propertyId: 'prop-lekki-1',
      roomId: 'room-saffron-1',
      roomName: newWalkIn.roomName,
      checkIn: newWalkIn.checkIn,
      checkOut: newWalkIn.checkOut,
      nights: Number(newWalkIn.nights),
      adults: 2,
      children: 0,
      guestName: newWalkIn.guestName,
      guestEmail: 'frontdesk@stayconnecthotels.com',
      guestPhone: newWalkIn.guestPhone || '+234 704 100 8351',
      country: 'Nigeria',
      specialRequests: 'Walk-In reservation entered by Front Desk Admin',
      subtotal: newWalkIn.totalPrice * 0.88,
      taxesAndFees: newWalkIn.totalPrice * 0.12,
      discountAmount: 0,
      totalPrice: Number(newWalkIn.totalPrice),
      status: 'Confirmed',
      paymentMethod: newWalkIn.paymentMethod as any,
      paymentStatus: 'Paid',
      createdAt: new Date().toISOString(),
    };

    setBookings([created, ...bookings]);
    setShowAddWalkInModal(false);
    setNewWalkIn({
      guestName: '',
      guestPhone: '',
      roomName: 'Saffron (Executive Single Room)',
      checkIn: '2026-08-04',
      checkOut: '2026-08-07',
      nights: 3,
      totalPrice: 624375,
      paymentMethod: 'Bank Transfer',
      channel: 'Walk-In',
    });
  };

  const updateBookingStatus = (id: string, newStatus: any) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filteredBookings = bookings.filter((b) => {
    const isWalkIn = b.specialRequests?.includes('Walk-In') || b.bookingRef.includes('WALKIN');
    if (activeFilter === 'WALK_IN') return isWalkIn;
    if (activeFilter === 'DIGITAL') return !isWalkIn;
    return true;
  });

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#111111] text-white font-sans flex flex-col md:flex-row">
        {/* Mobile Header Bar */}
        <AdminMobileNav />

        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-[#2C2B29] p-6 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-sm">
                SC
              </div>
              <div>
                <div className="font-serif text-lg text-white font-medium">Stay Connect</div>
                <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest font-semibold">PMS Executive Panel</div>
              </div>
            </div>

            <nav className="space-y-2 text-xs uppercase tracking-widest font-medium">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold">
                <BarChart3 className="w-4 h-4" />
                <span>PMS Dashboard</span>
              </Link>
              <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <Building className="w-4 h-4 text-[#C6A15B]" />
                <span>Properties</span>
              </Link>
              <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <BedDouble className="w-4 h-4 text-[#C6A15B]" />
                <span>Rooms Inventory</span>
              </Link>
              <Link href="/admin/housekeeping" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <RefreshCw className="w-4 h-4 text-[#C6A15B]" />
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

          <div className="pt-6 border-t border-[#2C2B29] space-y-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors w-full text-left"
            >
              <Lock className="w-4 h-4" />
              <span>Lock & Log Out (stayconnect1)</span>
            </button>
            <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B] transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </aside>

        {/* Main PMS Executive Area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 space-y-8 overflow-x-hidden">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                Property Management System (PMS)
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal mt-1">
                Executive Front Desk Control
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddWalkInModal(true)}
                className="w-full sm:w-auto px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
              >
                <UserCheck className="w-4 h-4" />
                <span>+ Record Walk-In Guest</span>
              </button>
            </div>
          </div>

          {/* PMS High Level Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                <span>Total Revenue</span>
                <DollarSign className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-white font-bold">
                ₦{totalRevenue.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400">Live MongoDB Atlas Database</div>
            </div>

            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                <span>Occupancy Rate</span>
                <TrendingUp className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-white font-bold">85%</div>
              <div className="text-[10px] text-neutral-400">14B Providence St, Lekki</div>
            </div>

            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                <span>Digital Online Bookings</span>
                <Calendar className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-bold">{digitalCount}</div>
              <div className="text-[10px] text-neutral-400">Website & Mailtrap Vouchers</div>
            </div>

            <div className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                <span>Walk-In Front Desk</span>
                <UserCheck className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-white font-bold">{walkInCount}</div>
              <div className="text-[10px] text-emerald-400">Direct Reception Check-ins</div>
            </div>
          </div>

          {/* Navigation Tabs: Reservations vs Partner Applications */}
          <div className="flex items-center gap-2 border-b border-[#2C2B29] pb-4">
            <button
              onClick={() => setActiveTab('BOOKINGS')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'BOOKINGS' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#1A1918] text-neutral-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Reservations CRM ({bookings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('PARTNERS')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'PARTNERS' ? 'bg-[#C6A15B] text-[#111111]' : 'bg-[#1A1918] text-neutral-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Partner Onboarding Queue ({partners.length})</span>
            </button>
          </div>

          {activeTab === 'BOOKINGS' ? (
            /* Filter Controls for Digital vs Walk-In */
            <div className="bg-[#1A1918] rounded-2xl border border-[#2C2B29] p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Filter Channel:</span>
                  <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#2C2B29] overflow-x-auto">
                    <button
                      onClick={() => setActiveFilter('ALL')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        activeFilter === 'ALL' ? 'bg-[#C6A15B] text-[#111111]' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      All ({bookings.length})
                    </button>
                    <button
                      onClick={() => setActiveFilter('DIGITAL')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        activeFilter === 'DIGITAL' ? 'bg-[#C6A15B] text-[#111111]' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Digital ({digitalCount})
                    </button>
                    <button
                      onClick={() => setActiveFilter('WALK_IN')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        activeFilter === 'WALK_IN' ? 'bg-[#C6A15B] text-[#111111]' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Walk-In ({walkInCount})
                    </button>
                  </div>
                </div>

                <div className="text-xs text-neutral-400 font-light">
                  WhatsApp Concierge Admin: <span className="text-[#C6A15B] font-mono">+234 704 100 8351</span>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-light text-neutral-300 min-w-[640px]">
                  <thead className="bg-[#111111] text-[#C6A15B] uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Channel</th>
                      <th className="py-3 px-4">Guest Info</th>
                      <th className="py-3 px-4">Reserved Suite</th>
                      <th className="py-3 px-4">Dates & Duration</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C2B29]">
                    {filteredBookings.map((b) => {
                      const isWalkIn = b.specialRequests?.includes('Walk-In') || b.bookingRef.includes('WALKIN');
                      return (
                        <tr key={b.id} className="hover:bg-[#252422] transition-colors">
                          <td className="py-4 px-4 font-mono text-white font-medium">{b.bookingRef}</td>
                          <td className="py-4 px-4">
                            {isWalkIn ? (
                              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold uppercase">
                                Walk-In
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-bold uppercase">
                                Digital Online
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white font-medium">{b.guestName}</div>
                            <div className="text-[10px] text-neutral-400 font-mono">{b.guestPhone}</div>
                          </td>
                          <td className="py-4 px-4 text-neutral-200">{b.roomName}</td>
                          <td className="py-4 px-4">
                            <div>{b.checkIn} → {b.checkOut}</div>
                            <div className="text-[10px] text-[#C6A15B]">{b.nights} Night(s)</div>
                          </td>
                          <td className="py-4 px-4 font-serif text-sm font-semibold text-white">
                            ₦{b.totalPrice.toLocaleString()}
                            <div className="text-[10px] text-neutral-400">{b.paymentMethod}</div>
                          </td>
                          <td className="py-4 px-4 space-y-1">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                              className="bg-[#111111] border border-[#2C2B29] text-[#C6A15B] text-[11px] rounded px-2.5 py-1 focus:outline-none focus:border-[#C6A15B]"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Checked In">Checked In</option>
                              <option value="Checked Out">Checked Out</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* PARTNER APPLICATIONS QUEUE TABLE */
            <div className="bg-[#1A1918] rounded-2xl border border-[#2C2B29] p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-4">
                <div>
                  <h3 className="font-serif text-xl text-white">Host & Property Applications Queue</h3>
                  <p className="text-xs text-neutral-400">Applications submitted via public /list-your-property portal.</p>
                </div>
                <div className="text-xs text-[#C6A15B] font-semibold">
                  {partners.length} Total Applicants
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-light text-neutral-300 min-w-[700px]">
                  <thead className="bg-[#111111] text-[#C6A15B] uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Partner ID</th>
                      <th className="py-3 px-4">Applicant & Contact</th>
                      <th className="py-3 px-4">Company / Property</th>
                      <th className="py-3 px-4">Location & Inventory</th>
                      <th className="py-3 px-4">Est. Rate</th>
                      <th className="py-3 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C2B29]">
                    {partners.map((p: any) => (
                      <tr key={p.id || p.partnerId} className="hover:bg-[#252422] transition-colors">
                        <td className="py-4 px-4 font-mono text-white font-medium">{p.partnerId || 'PART-NEW'}</td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{p.contactName || p.name}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">{p.email}</div>
                          <div className="text-[10px] text-[#C6A15B] font-mono">{p.phone}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-serif text-sm font-medium">{p.companyName || p.propertyName || 'Private Luxury Residence'}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div>{p.location || 'Lagos, Nigeria'}</div>
                          <div className="text-[10px] text-neutral-400">{p.totalUnits || 1} Units Offered</div>
                        </td>
                        <td className="py-4 px-4 font-serif text-sm text-[#C6A15B] font-semibold">
                          ₦{(p.expectedRate || 185000).toLocaleString()} / night
                        </td>
                        <td className="py-4 px-4 space-y-2">
                          <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                            p.status === 'Verified' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {p.status || 'Pending Onboarding'}
                          </span>
                          <div>
                            <a
                              href={`https://wa.me/${(p.phone || '+2347041008351').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${p.contactName || 'Partner'}, this is Stay Connect Admin regarding your property application on Stay Connect Global.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C6A15B] hover:text-white transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Contact via WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        {/* Record Walk-In Modal */}
        {showAddWalkInModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">Front Desk Reception</span>
                  <h3 className="font-serif text-2xl text-white">New Walk-In Reservation</h3>
                </div>
                <button
                  onClick={() => setShowAddWalkInModal(false)}
                  className="text-neutral-400 hover:text-white text-xs uppercase"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-300 font-medium">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Oluwaseun Davies"
                    value={newWalkIn.guestName}
                    onChange={(e) => setNewWalkIn({ ...newWalkIn, guestName: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-4 py-2.5 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-medium">Guest Phone Number (WhatsApp)</label>
                  <input
                    type="text"
                    required
                    placeholder="+234 704 100 8351"
                    value={newWalkIn.guestPhone}
                    onChange={(e) => setNewWalkIn({ ...newWalkIn, guestPhone: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-4 py-2.5 text-white mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Check-In Date</label>
                    <input
                      type="date"
                      required
                      value={newWalkIn.checkIn}
                      onChange={(e) => setNewWalkIn({ ...newWalkIn, checkIn: e.target.value })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Check-Out Date</label>
                    <input
                      type="date"
                      required
                      value={newWalkIn.checkOut}
                      onChange={(e) => setNewWalkIn({ ...newWalkIn, checkOut: e.target.value })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Total Amount (₦)</label>
                    <input
                      type="number"
                      required
                      value={newWalkIn.totalPrice}
                      onChange={(e) => setNewWalkIn({ ...newWalkIn, totalPrice: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Payment Method</label>
                    <select
                      value={newWalkIn.paymentMethod}
                      onChange={(e) => setNewWalkIn({ ...newWalkIn, paymentMethod: e.target.value })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3 py-2 text-white mt-1"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash at Desk">Cash at Desk</option>
                      <option value="POS Card">POS Terminal</option>
                      <option value="Paystack">Paystack</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2C2B29]">
                  <button
                    type="button"
                    onClick={() => setShowAddWalkInModal(false)}
                    className="px-4 py-2 text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold uppercase tracking-widest rounded-lg shadow-xl"
                  >
                    Save Walk-In Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}
