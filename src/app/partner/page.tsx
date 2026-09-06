"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import PropertyEditor from "@/components/properties/PropertyEditor";
export default function PartnerPage() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState("");
  async function refresh(key = token) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/partner/manage", {
        headers: { Authorization: `Bearer ${key}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.data);
      sessionStorage.setItem("sc_partner_token", key);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    const key = sessionStorage.getItem("sc_partner_token");
    if (key) {
      setToken(key);
      refresh(key);
    }
  }, []);
  async function submit(id: string) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/partner/manage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, action: "submit" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      <main className="pt-32 pb-20 max-w-5xl mx-auto px-5 space-y-8">
        <header>
          <p className="text-[#C6A15B] text-xs uppercase tracking-widest">
            Partner workspace
          </p>
          <h1 className="font-serif text-4xl mt-3">
            Your properties, clearly managed.
          </h1>
          <p className="text-neutral-400 mt-3 text-sm">
            Complete your listing, submit for verification and follow your
            reservations.
          </p>
        </header>
        {error && (
          <p role="alert" className="text-rose-300 bg-rose-950 p-4 rounded-lg">
            {error}
          </p>
        )}
        {!data ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              refresh();
            }}
            className="max-w-lg space-y-4 bg-[#1A1918] rounded-2xl p-6 border border-[#333]"
          >
            <label className="text-sm">
              Private partner access key
              <input
                type="password"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full mt-2 p-3 bg-black rounded-lg border border-[#444]"
              />
            </label>
            <button
              disabled={busy}
              className="bg-[#C6A15B] text-black px-5 py-3 rounded-lg"
            >
              {busy ? "Opening…" : "Open my properties"}
            </button>
            <p className="text-xs text-neutral-400">
              Use the key you received after creating your listing.
            </p>
            <Link
              href="/list-your-property"
              className="block text-[#C6A15B] text-sm"
            >
              Create a property →
            </Link>
          </form>
        ) : (
          <>
            <div className="flex justify-between">
              <h2 className="font-serif text-2xl">{data.businessName}</h2>
              <button
                onClick={() => refresh()}
                className="text-[#C6A15B] text-sm"
              >
                Refresh status
              </button>
            </div>
            {data.properties.map((p: any) => (
              <section
                key={p.id}
                className="bg-[#1A1918] border border-[#333] rounded-2xl p-6 space-y-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    className="w-full sm:w-40 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-xs bg-[#C6A15B]/20 text-[#E6C98C] px-3 py-1 rounded-full">
                      {p.verificationStatus}
                    </span>
                    <h2 className="font-serif text-3xl mt-3">{p.name}</h2>
                    <p className="text-sm text-neutral-400">
                      {p.address} · {p.numberOfUnits || 1} rooms / units
                    </p>
                  </div>
                </div>
                {p.reviewNote && (
                  <p className="border border-amber-600 p-4 rounded-lg text-sm">
                    Review feedback: {p.reviewNote}
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  {p.verificationStatus !== "Pending Verification" && (
                    <button
                      onClick={() => setEditing(editing === p.id ? "" : p.id)}
                      className="text-sm underline"
                    >
                      {editing === p.id
                        ? "Close editor"
                        : "Edit details & images"}
                    </button>
                  )}
                  {["Draft", "Changes Required"].includes(
                    p.verificationStatus,
                  ) && (
                    <button
                      disabled={busy}
                      onClick={() => submit(p.id)}
                      className="bg-[#C6A15B] text-black px-5 py-3 rounded-lg text-sm"
                    >
                      Submit for verification
                    </button>
                  )}
                  {p.published && (
                    <Link
                      className="text-[#C6A15B]"
                      href={`/properties/${p.slug}`}
                    >
                      View public listing →
                    </Link>
                  )}
                </div>
                {p.verificationStatus === "Pending Verification" && (
                  <p className="text-sm text-neutral-400">
                    Your listing is with the Stay Connect team. It becomes
                    public after approval.
                  </p>
                )}
                {editing === p.id && (
                  <PropertyEditor
                    property={p}
                    endpoint="/api/partner/manage"
                    token={token}
                    onSaved={() => {
                      setEditing("");
                      refresh();
                    }}
                  />
                )}
              </section>
            ))}
            <section className="space-y-4">
              <h2 className="font-serif text-3xl">Reservations & payments</h2>
              {!data.bookings.length && (
                <p className="text-neutral-400 text-sm">
                  Reservations for your properties will appear here.
                </p>
              )}
              {data.bookings.map((b: any) => (
                <div
                  key={b.id}
                  className="bg-[#1A1918] border border-[#333] p-5 rounded-xl grid sm:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    {b.bookingRef}
                    <p className="text-neutral-400">
                      {b.guestName} · {b.roomName}
                    </p>
                  </div>
                  <div>
                    {b.checkIn} → {b.checkOut}
                    <p>₦{b.totalPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-[#E6C98C]">
                    {b.status === "Pending"
                      ? "Reservation / Pending payment"
                      : b.status}
                    <p>
                      {b.paymentStatus === "Paid"
                        ? "Payment confirmed"
                        : b.paymentStatus}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
