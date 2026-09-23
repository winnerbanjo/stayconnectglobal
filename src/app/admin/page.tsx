"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Utensils,
  Eye,
  Building2,
  MapPin,
  Mail,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { Booking, Partner } from "@/types";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default function AdminPage() {
  return <AdminAuthGuard><AdminPageContent /></AdminAuthGuard>;
}

function AdminPageContent() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartnerModal, setSelectedPartnerModal] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"BOOKINGS" | "PARTNERS">(
    "BOOKINGS",
  );
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "DIGITAL" | "WALK_IN"
  >("ALL");
  const [showAddWalkInModal, setShowAddWalkInModal] = useState(false);

  useEffect(() => {
    Promise.all(["/api/bookings", "/api/partners", "/api/rooms"].map(async url => {
      const response = await fetch(url, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Unable to load dashboard");
      return json.data;
    })).then(([bookings, partners, rooms]) => {
      setBookings(bookings); setPartners(partners); setRooms(rooms);
      setNewWalkIn(prev => ({ ...prev, roomId: rooms[0]?.id || "" }));
    }).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);
  const today = new Date().toISOString().slice(0, 10);
  const totalUnits = rooms.reduce((sum, room) => sum + (room.numberOfUnits || 1), 0);
  const occupiedUnits = bookings.filter(b => ["Confirmed", "Checked In"].includes(b.status) && b.checkIn <= today && b.checkOut > today).length;
  const occupancy = totalUnits ? Math.round(occupiedUnits / totalUnits * 100) : null;
  const [newWalkIn, setNewWalkIn] = useState({
    guestEmail: "",
    guestName: "",
    guestPhone: "",
    roomId: "",
    checkIn: new Date().toISOString().slice(0, 10),
    checkOut: new Date(Date.now() + 86400000).toISOString().slice(0, 10),

    paymentMethod: "Bank Transfer",
    channel: "Walk-In",
  });

  const handleLogout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    sessionStorage.removeItem("stayconnect_admin_auth");
    window.location.reload();
  };

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const walkInCount = bookings.filter(
    (b) =>
      b.specialRequests?.includes("Walk-In") || b.bookingRef?.includes("WALKIN"),
  ).length;
  const digitalCount = bookings.length - walkInCount;

  const handleCreateWalkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newWalkIn,
          roomId: newWalkIn.roomId,
          adults: 2,
          specialRequests: "Walk-In reservation entered by Front Desk Admin",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setBookings([json.data, ...bookings]);
      setShowAddWalkInModal(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const isWalkIn =
      b.specialRequests?.includes("Walk-In") || b.bookingRef?.includes("WALKIN");
    if (activeFilter === "WALK_IN") return isWalkIn;
    if (activeFilter === "DIGITAL") return !isWalkIn;
    return true;
  });

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col md:flex-row">
        {/* Mobile Header Bar */}
        <AdminMobileNav />

        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF] text-[#0077B6] font-serif font-bold flex items-center justify-center text-sm">
                SC
              </div>
              <div>
                <div className="font-serif text-lg text-slate-900 font-medium">
                  Stay Connect
                </div>
                <div className="text-[10px] text-[#0077B6] uppercase tracking-widest font-semibold">
                  PMS Executive Panel
                </div>
              </div>
            </div>

            <nav className="space-y-2 text-xs uppercase tracking-widest font-medium">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00AEEF] text-[#111111] font-semibold"
              >
                <BarChart3 className="w-4 h-4" />
                <span>PMS Dashboard</span>
              </Link>
              <Link
                href="/admin/properties"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Building className="w-4 h-4 text-[#0077B6]" />
                <span>Properties</span>
              </Link>
              <Link
                href="/admin/rooms"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <BedDouble className="w-4 h-4 text-[#0077B6]" />
                <span>Rooms Inventory</span>
              </Link>
              <Link
                href="/admin/housekeeping"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <RefreshCw className="w-4 h-4 text-[#0077B6]" />
                <span>Housekeeping Ops</span>
              </Link>
              <Link
                href="/admin/dining"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Utensils className="w-4 h-4 text-[#0077B6]" />
                <span>Dining & Menu</span>
              </Link>
              <Link
                href="/admin/fleet"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Car className="w-4 h-4 text-[#0077B6]" />
                <span>Fleet Logistics</span>
              </Link>
              <Link
                href="/admin/bookings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Calendar className="w-4 h-4 text-[#0077B6]" />
                <span>Reservations CRM</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-rose-700 hover:text-rose-700 transition-colors w-full text-left"
            >
              <Lock className="w-4 h-4" />
              <span>Lock & Log Out</span>
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0077B6] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </aside>

        {/* Main PMS Executive Area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 space-y-8 overflow-x-hidden">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#0077B6] font-semibold">
                Property Management System (PMS)
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl text-slate-900 font-normal mt-1">
                Executive Front Desk Control
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddWalkInModal(true)}
                className="w-full sm:w-auto px-5 py-3 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
              >
                <UserCheck className="w-4 h-4" />
                <span>+ Record Walk-In Guest</span>
              </button>
            </div>
          </div>

          {error && <p role="alert" className="text-rose-700">{error} <button onClick={() => window.location.reload()}>Retry</button></p>}
          {loading && <p role="status">Loading saved records…</p>}
          {/* PMS High Level Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-600 text-xs font-medium">
                <span>Total Revenue</span>
                <DollarSign className="w-4 h-4 text-[#0077B6]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold">
                ₦{totalRevenue.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-700">
                Confirmed payments
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-600 text-xs font-medium">
                <span>Occupancy Rate</span>
                <TrendingUp className="w-4 h-4 text-[#0077B6]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold">
                {occupancy === null ? "—" : `${occupancy}%`}
              </div>
              <div className="text-[10px] text-slate-600">
                14B Providence St, Lekki
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-600 text-xs font-medium">
                <span>Digital Online Bookings</span>
                <Calendar className="w-4 h-4 text-[#0077B6]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-[#0077B6] font-bold">
                {digitalCount}
              </div>
              <div className="text-[10px] text-slate-600">
                Website reservations
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-600 text-xs font-medium">
                <span>Walk-In Front Desk</span>
                <UserCheck className="w-4 h-4 text-[#0077B6]" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold">
                {walkInCount}
              </div>
              <div className="text-[10px] text-emerald-700">
                Direct Reception Check-ins
              </div>
            </div>
          </div>

          {/* Navigation Tabs: Reservations vs Partner Applications */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveTab("BOOKINGS")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === "BOOKINGS"
                  ? "bg-[#00AEEF] text-[#111111]"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Reservations CRM ({bookings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("PARTNERS")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === "PARTNERS"
                  ? "bg-[#00AEEF] text-[#111111]"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Partner Onboarding Queue ({partners.length})</span>
            </button>
          </div>

          {activeTab === "BOOKINGS" ? (
            /* Filter Controls for Digital vs Walk-In */
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                    Filter Channel:
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 overflow-x-auto">
                    <button
                      onClick={() => setActiveFilter("ALL")}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        activeFilter === "ALL"
                          ? "bg-[#00AEEF] text-[#111111]"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All ({bookings.length})
                    </button>
                    <button
                      onClick={() => setActiveFilter("DIGITAL")}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        activeFilter === "DIGITAL"
                          ? "bg-[#00AEEF] text-[#111111]"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Digital ({digitalCount})
                    </button>
                    <button
                      onClick={() => setActiveFilter("WALK_IN")}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        activeFilter === "WALK_IN"
                          ? "bg-[#00AEEF] text-[#111111]"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Walk-In ({walkInCount})
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-600 font-light">
                  WhatsApp Concierge Admin:{" "}
                  <span className="text-[#0077B6] font-mono">
                    +234 704 100 8351
                  </span>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-light text-slate-700 min-w-[640px]">
                  <thead className="bg-white text-[#0077B6] uppercase tracking-wider text-[10px] font-semibold">
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
                  <tbody className="divide-y divide-slate-200">
                    {!loading && !error && filteredBookings.length === 0 && <tr><td colSpan={7} className="p-12 text-center">
                      <h3 className="font-serif text-xl text-slate-900">No reservations yet</h3>
                      <p className="mt-2 text-slate-600">New guest reservations will appear here once your rooms are ready to book.</p>
                    </td></tr>}
                    {filteredBookings.map((b) => {
                      const isWalkIn =
                        b.specialRequests?.includes("Walk-In") ||
                        b.bookingRef?.includes("WALKIN");
                      return (
                        <tr
                          key={b.id}
                          className="hover:bg-slate-100 transition-colors"
                        >
                          <td className="py-4 px-4 font-mono text-slate-900 font-medium">
                            {b.bookingRef}
                          </td>
                          <td className="py-4 px-4">
                            {isWalkIn ? (
                              <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase">
                                Walk-In
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-800 text-[10px] font-bold uppercase">
                                Digital Online
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-slate-900 font-medium">
                              {b.guestName}
                            </div>
                            <div className="text-[10px] text-slate-600 font-mono">
                              {b.guestPhone}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-700">
                            {b.roomName}
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              {b.checkIn} → {b.checkOut}
                            </div>
                            <div className="text-[10px] text-[#0077B6]">
                              {b.nights} Night(s)
                            </div>
                          </td>
                          <td className="py-4 px-4 font-serif text-sm font-semibold text-slate-900">
                            ₦{b.totalPrice.toLocaleString()}
                            <div className="text-[10px] text-slate-600">
                              {b.paymentMethod}
                            </div>
                          </td>
                          <td className="py-4 px-4 space-y-1">
                            <p className="text-[#0077B6]">
                              {b.status === "Pending"
                                ? "Reservation / Pending payment"
                                : b.status}
                            </p>
                            <Link
                              href="/admin/bookings"
                              className="text-xs underline"
                            >
                              Manage payment
                            </Link>
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
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="font-serif text-xl text-slate-900">
                    Host & Property Applications Queue
                  </h3>
                  <p className="text-xs text-slate-600">
                    Applications submitted via public /list-your-property
                    portal.
                  </p>
                </div>
                <div className="text-xs text-[#0077B6] font-semibold">
                  {partners.length} Total Applicants
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-light text-slate-700 min-w-[700px]">
                  <thead className="bg-white text-[#0077B6] uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Partner ID</th>
                      <th className="py-3 px-4">Applicant & Contact</th>
                      <th className="py-3 px-4">Company / Property</th>
                      <th className="py-3 px-4">Location & Inventory</th>
                      <th className="py-3 px-4">Est. Rate</th>
                      <th className="py-3 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {!loading && !error && partners.length === 0 && <tr><td colSpan={6} className="p-12 text-center">
                      <h3 className="font-serif text-xl text-slate-900">No partner applications yet</h3>
                      <p className="mt-2 text-slate-600">New property applications will appear here for review.</p>
                    </td></tr>}
                    {partners.map((p: any) => (
                      <tr
                        key={p.id || p.partnerId}
                        onClick={() => setSelectedPartnerModal(p)}
                        className="hover:bg-slate-100 transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-4 font-mono text-slate-900 font-medium group-hover:text-[#0077B6] transition-colors">
                          {p.partnerId || "PART-NEW"}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-900 font-medium">
                            {p.contactName || p.name}
                          </div>
                          <div className="text-[10px] text-slate-600 font-mono">
                            {p.email}
                          </div>
                          <div className="text-[10px] text-[#0077B6] font-mono">
                            {p.phone}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-900 font-serif text-sm font-medium">
                            {p.propertyName ||
                              p.businessName ||
                              p.companyName ||
                              "Private Luxury Residence"}
                          </div>
                          <div className="text-[10px] text-slate-600">
                            {p.propertyType || "Serviced Apartment"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            {p.address
                              ? `${p.address}, ${p.city || "Lagos"}`
                              : p.location || "Lagos, Nigeria"}
                          </div>
                          <div className="text-[10px] text-slate-600">
                            {p.numberOfUnits || p.totalUnits || 1} Units Offered
                          </div>
                        </td>
                        <td className="py-4 px-4 font-serif text-sm text-[#0077B6] font-semibold">
                          ₦
                          {(
                            p.expectedRate ||
                            p.pricingStartingFrom ||
                            100000
                          ).toLocaleString()}{" "}
                          / night
                        </td>
                        <td
                          className="py-4 px-4 space-y-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span
                            className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                              p.status === "Approved" || p.status === "Verified"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {p.status || "Pending Onboarding"}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setSelectedPartnerModal(p)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#00AEEF] text-[#111111] font-bold text-[10px] uppercase tracking-wider hover:bg-[#d8b46e] transition-colors shadow-sm"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Onboarding Details</span>
                            </button>
                            <a
                              href={`https://wa.me/${(p.phone || "+2347041008351").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hello ${p.contactName || "Partner"}, this is Stay Connect Admin regarding your property application on Stay Connect Global.`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0077B6] hover:text-slate-900 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
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
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-[#00AEEF]/40 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#0077B6] font-semibold">
                    Front Desk Reception
                  </span>
                  <h3 className="font-serif text-2xl text-slate-900">
                    New Walk-In Reservation
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddWalkInModal(false)}
                  className="text-slate-600 hover:text-slate-900 text-xs uppercase"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
                <label className="block">
                  Guest email
                  <input
                    type="email"
                    required
                    value={newWalkIn.guestEmail}
                    onChange={(e) =>
                      setNewWalkIn({ ...newWalkIn, guestEmail: e.target.value })
                    }
                    className="block w-full p-3 mt-2 bg-white border rounded-lg"
                  />
                </label>
                <div>
                  <label className="text-slate-700 font-medium">
                    Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Oluwaseun Davies"
                    value={newWalkIn.guestName}
                    onChange={(e) =>
                      setNewWalkIn({ ...newWalkIn, guestName: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 mt-1"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-medium">
                    Guest Phone Number (WhatsApp)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+234 704 100 8351"
                    value={newWalkIn.guestPhone}
                    onChange={(e) =>
                      setNewWalkIn({ ...newWalkIn, guestPhone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-medium">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newWalkIn.checkIn}
                      onChange={(e) =>
                        setNewWalkIn({ ...newWalkIn, checkIn: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newWalkIn.checkOut}
                      onChange={(e) =>
                        setNewWalkIn({ ...newWalkIn, checkOut: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-medium">Room</label>
                    <select required value={newWalkIn.roomId} onChange={e => setNewWalkIn({ ...newWalkIn, roomId: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 mt-1">
                      <option value="">Choose a room</option>
                      {rooms.map(room => <option key={room.id} value={room.id}>{room.name} — ₦{room.pricePerNight.toLocaleString()} / night</option>)}
                    </select>
                    <p className="text-slate-600 mt-2">Total calculated from saved room rate and dates, including taxes and fees.</p>
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Payment Method
                    </label>
                    <select
                      value={newWalkIn.paymentMethod}
                      onChange={(e) =>
                        setNewWalkIn({
                          ...newWalkIn,
                          paymentMethod: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 mt-1"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Pay at Hotel">Pay at Hotel</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddWalkInModal(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#00AEEF] text-[#111111] font-semibold uppercase tracking-widest rounded-lg shadow-xl"
                  >
                    Save Walk-In Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Merchant Onboarding Application Details Modal */}
        {selectedPartnerModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl border border-[#00AEEF]/50 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0077B6] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      Merchant Onboarding File •{" "}
                      {selectedPartnerModal.partnerId || selectedPartnerModal.id}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-slate-900 mt-1">
                    Partner Application Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPartnerModal(null)}
                  className="p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {/* Contact Information */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="text-[10px] uppercase tracking-wider text-[#0077B6] font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>1. Applicant Contact Info</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">
                      Contact Person Name
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {selectedPartnerModal.contactName ||
                        selectedPartnerModal.name ||
                        "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">
                      Email Address
                    </span>
                    <span className="font-mono text-slate-900 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-[#0077B6]" />
                      {selectedPartnerModal.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">
                      Phone / WhatsApp
                    </span>
                    <span className="font-mono text-[#0077B6] font-bold flex items-center gap-1.5 mt-0.5">
                      <PhoneCall className="w-3.5 h-3.5" />
                      {selectedPartnerModal.phone}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="text-[10px] uppercase tracking-wider text-[#0077B6] font-bold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>2. Property Specifications</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">
                      Company / Property Name
                    </span>
                    <span className="font-serif text-base font-medium text-slate-900">
                      {selectedPartnerModal.propertyName ||
                        selectedPartnerModal.businessName ||
                        "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">
                      Property Category
                    </span>
                    <span className="text-slate-900 font-medium">
                      {selectedPartnerModal.propertyType ||
                        "Serviced Apartment"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">
                      Location & Address
                    </span>
                    <span className="text-slate-900 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0077B6] shrink-0" />
                      <span>
                        {selectedPartnerModal.address
                          ? `${selectedPartnerModal.address}, ${selectedPartnerModal.city || "Lagos"}`
                          : selectedPartnerModal.location || "Lagos, Nigeria"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Commercials & Units */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 sm:col-span-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#0077B6] font-bold">
                      3. Commercials & Inventory Offered
                    </div>
                    <span
                      className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full border ${
                        selectedPartnerModal.status === "Approved" ||
                        selectedPartnerModal.status === "Verified"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {selectedPartnerModal.status || "Pending Onboarding"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <span className="text-slate-600 block text-[10px]">
                        Units Offered
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {selectedPartnerModal.numberOfUnits ||
                          selectedPartnerModal.totalUnits ||
                          1}{" "}
                        Unit(s)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 block text-[10px]">
                        Expected Nightly Rate
                      </span>
                      <span className="text-sm font-serif font-bold text-[#0077B6]">
                        ₦
                        {(
                          selectedPartnerModal.expectedRate ||
                          selectedPartnerModal.pricingStartingFrom ||
                          100000
                        ).toLocaleString()}{" "}
                        / night
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 block text-[10px]">
                        Onboarding Commission
                      </span>
                      <span className="text-sm font-semibold text-emerald-700">
                        {selectedPartnerModal.commissionRate || 10}% Negotiated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities List */}
                {selectedPartnerModal.amenities &&
                  selectedPartnerModal.amenities.length > 0 && (
                    <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 sm:col-span-2">
                      <div className="text-[10px] uppercase tracking-wider text-[#0077B6] font-bold">
                        4. Submitted Property Amenities
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedPartnerModal.amenities.map(
                          (item: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white border border-[#00AEEF]/30 rounded-lg text-[11px] text-slate-700 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#0077B6]" />
                              <span>{item}</span>
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {/* Property Photos & Direct File Upload */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-wider text-[#0077B6] font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>5. Property Photos (Direct File Uploads)</span>
                    </div>
                    <span className="text-[10px] text-slate-600">
                      {selectedPartnerModal.images?.length || 0} File(s)
                      Attached
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">Manage and save property photos in <Link href="/admin/properties" className="text-[#0077B6] underline">Properties</Link>.</p>

                  {/* Photo Thumbnails */}
                  {selectedPartnerModal.images &&
                  selectedPartnerModal.images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {selectedPartnerModal.images.map(
                        (imgSrc: string, i: number) => (
                          <div
                            key={i}
                            className="relative h-28 rounded-xl overflow-hidden border border-[#00AEEF]/40 bg-slate-100 group"
                          >
                            <img
                              src={imgSrc}
                              alt={`Property Photo ${i + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />

                            <span className="absolute bottom-1 left-1.5 bg-white px-2 py-0.5 rounded text-[9px] font-mono text-[#0077B6]">
                              Photo #{i + 1}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-600 italic text-center py-2 bg-white rounded-xl border border-slate-200">
                      No photos uploaded yet. Use the file picker above to
                      attach actual image files.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${(selectedPartnerModal.phone || "+2347041008351").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedPartnerModal.contactName || "Partner"}, this is Stay Connect Global Admin regarding your property application for ${selectedPartnerModal.propertyName || selectedPartnerModal.businessName || "Not provided"}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>
                    Contact via WhatsApp ({selectedPartnerModal.phone})
                  </span>
                </a>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/admin/properties"
                    className="bg-[#00AEEF] text-black px-5 py-3 rounded-lg text-xs"
                  >
                    Review property verification →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedPartnerModal(null)}
                    className="px-5 py-3 bg-slate-50 text-slate-600 hover:text-slate-900 text-xs uppercase font-medium rounded-xl border border-slate-200"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
