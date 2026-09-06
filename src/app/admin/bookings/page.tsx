"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  BarChart3,
  Building,
  BedDouble,
  LogOut,
  Search,
  Filter,
  Car,
  RefreshCw,
  Utensils,
} from "lucide-react";
import { INITIAL_BOOKINGS } from "@/lib/data/seedData";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<any[]>([]);

  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  async function confirmPayment(id: string) {
    setBusy(id);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "confirm-payment" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setBookings((prev) => prev.map((b) => (b.id === id ? json.data : b)));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }
  React.useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setBookings(json.data);
        }
      })
      .catch(() => setError("Could not load reservations. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

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
                <div className="font-serif text-lg text-white font-medium">
                  Stay Connect
                </div>
                <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest font-semibold">
                  Admin Portal
                </div>
              </div>
            </div>

            <nav className="space-y-2 text-xs uppercase tracking-widest font-medium">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]"
              >
                <BarChart3 className="w-4 h-4 text-[#C6A15B]" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/properties"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]"
              >
                <Building className="w-4 h-4 text-[#C6A15B]" />
                <span>Properties</span>
              </Link>
              <Link
                href="/admin/rooms"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]"
              >
                <BedDouble className="w-4 h-4 text-[#C6A15B]" />
                <span>Rooms Inventory</span>
              </Link>
              <Link
                href="/admin/housekeeping"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]"
              >
                <RefreshCw className="w-4 h-4 text-[#C6A15B]" />
                <span>Housekeeping Ops</span>
              </Link>
              <Link
                href="/admin/dining"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]"
              >
                <Utensils className="w-4 h-4 text-[#C6A15B]" />
                <span>Dining & Menu</span>
              </Link>
              <Link
                href="/admin/fleet"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]"
              >
                <Car className="w-4 h-4 text-[#C6A15B]" />
                <span>Fleet Logistics</span>
              </Link>
              <Link
                href="/admin/bookings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservations CRM</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#2C2B29]">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B]"
            >
              <LogOut className="w-4 h-4" />
              <span>Return to Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 space-y-8 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                Guest Reservations
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                Bookings CRM
              </h1>
            </div>
            <Link
              href="/book"
              className="w-full sm:w-auto text-center px-5 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded"
            >
              + New Booking
            </Link>
          </div>

          {error && (
            <p role="alert" className="text-rose-300">
              {error}
            </p>
          )}
          <label className="block text-xs text-neutral-300">
            Search guest, reference or agent
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full p-3 mt-2 bg-[#1A1918] border border-[#444] rounded-lg"
            />
          </label>
          {loading && <p role="status">Loading reservations…</p>}
          <div className="bg-[#1A1918] rounded-xl border border-[#2C2B29] overflow-hidden p-4 sm:p-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Calendar className="w-10 h-10 text-[#C6A15B] mx-auto" />
                <h3 className="font-serif text-xl text-white">
                  No Reservations Yet
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Live guest reservations placed online or added via reception
                  walk-in will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-light text-neutral-300 min-w-[640px]">
                  <thead className="bg-[#111111] text-[#C6A15B] uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Ref Number</th>
                      <th className="py-3 px-4">Guest Name</th>
                      <th className="py-3 px-4">Suite Booked</th>
                      <th className="py-3 px-4">Check-In → Out</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Agent attribution</th>
                      <th className="py-3 px-4">Payment action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C2B29]">
                    {bookings
                      .filter((b) =>
                        [b.guestName, b.bookingRef, b.agentCode]
                          .join(" ")
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                      )
                      .map((b) => (
                        <tr
                          key={b.id || b._id}
                          className="hover:bg-[#252422] transition-colors"
                        >
                          <td className="py-4 px-4 font-mono text-white font-medium">
                            {b.bookingRef}
                          </td>
                          <td className="py-4 px-4 text-white font-medium">
                            {b.guestName}
                            <div className="text-[10px] text-neutral-400">
                              {b.guestPhone}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-neutral-200">
                            {b.roomName}
                          </td>
                          <td className="py-4 px-4">
                            {b.checkIn} → {b.checkOut}
                            <div className="text-[10px] text-[#C6A15B]">
                              {b.nights} Night(s)
                            </div>
                          </td>
                          <td className="py-4 px-4 font-serif text-sm font-semibold text-white">
                            ₦{b.totalPrice?.toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 rounded bg-[#111111] border border-[#2C2B29] text-[10px] text-[#C6A15B]">
                              {b.paymentMethod} · {b.paymentStatus}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                              {b.status === "Pending"
                                ? "Reservation / Pending payment"
                                : b.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {b.agentCode || "Direct booking"}
                            {b.visitorId && (
                              <p className="text-[10px] text-neutral-500">
                                Visitor {b.visitorId.slice(0, 8)}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {b.paymentStatus !== "Paid" &&
                            !["Cancelled", "Refunded", "Checked Out"].includes(
                              b.status,
                            ) ? (
                              <button
                                disabled={busy === b.id}
                                onClick={() => confirmPayment(b.id)}
                                className="bg-[#C6A15B] text-black px-3 py-2 rounded-lg font-semibold"
                              >
                                {busy === b.id
                                  ? "Confirming…"
                                  : "Confirm payment"}
                              </button>
                            ) : (
                              <span className="text-emerald-300">
                                {b.paymentConfirmedAt
                                  ? `Confirmed ${new Date(b.paymentConfirmedAt).toLocaleString()} by ${b.paymentConfirmedBy}`
                                  : b.paymentStatus}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
