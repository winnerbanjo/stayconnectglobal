"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
export default function BookingStatus() {
  const [ref, setRef] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function lookup(bookingRef = ref, key = token) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/bookings/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingRef, token: key }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("ref") || "";
    const t = window.location.hash.slice(1);
    setRef(r);
    setToken(t);
    if (r && t) lookup(r, t);
  }, []);
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black">
      <Navbar />
      <main className="pt-36 pb-24 px-5 max-w-2xl mx-auto space-y-6">
        <h1 className="font-serif text-4xl">Your reservation</h1>
        <p className="text-neutral-600 text-sm">
          Check the latest booking and payment status.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            lookup();
          }}
          className="bg-white p-6 border rounded-2xl space-y-4"
        >
          <label className="block text-sm">
            Reservation reference
            <input
              required
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg"
            />
          </label>
          <label className="block text-sm">
            Private access key
            <input
              required
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg"
            />
          </label>
          <button disabled={busy} className="bg-[#C6A15B] px-5 py-3 rounded-lg">
            {busy ? "Checking…" : "Check / refresh status"}
          </button>
        </form>
        {error && (
          <p role="alert" className="text-rose-600">
            {error}
          </p>
        )}
        {data && (
          <section className="bg-white border rounded-2xl p-6 space-y-4">
            <p className="text-[#947137] font-semibold">
              {data.paymentStatus === "Paid"
                ? "Confirmed Booking / Payment Confirmed"
                : "Reservation / Pending Payment"}
            </p>
            <h2 className="font-serif text-3xl">{data.roomName}</h2>
            <p>
              {data.checkIn} → {data.checkOut} · {data.nights} nights
            </p>
            <p>
              ₦{data.totalPrice.toLocaleString()} · {data.paymentMethod}
            </p>
            {data.paymentConfirmedAt ? (
              <p className="text-sm">
                Payment confirmed on{" "}
                {new Date(data.paymentConfirmedAt).toLocaleString()}.
              </p>
            ) : (
              <p className="text-sm text-neutral-600">
                Your request is saved. Stay Connect must verify payment and
                availability before your booking is confirmed.
              </p>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
