"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  User,
  Users,
  Phone,
  Mail,
  Check,
  CreditCard,
  Shield,
  Copy,
  CheckCircle,
  ArrowRight,
  Building2,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Zap,
  Crown,
  Upload,
  MessageCircle,
  Star,
} from "lucide-react";
import AirbnbHeader from "@/components/airbnb/AirbnbHeader";
import AirbnbFooter from "@/components/airbnb/AirbnbFooter";
import { uploadImages, type ImageUploadProgress } from "@/lib/upload-images";

export default function BookingPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [agentCode, setAgentCode] = useState("");
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState<any>(null);
  const [paymentReceipt, setPaymentReceipt] = useState("");
  const [receiptProgress, setReceiptProgress] = useState<ImageUploadProgress | null>(null);
  const [receiptUploading, setReceiptUploading] = useState(false);

  const [formData, setFormData] = useState({
    suiteSlug: "",
    suiteName: "",
    pricePerNight: 0,
    checkIn: new Date().toISOString().slice(0, 10),
    checkOut: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    nights: 1,
    guests: 2,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    paymentMethod: "Bank Transfer",
    specialRequests: "",
    selectedAddOns: [] as string[],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAgentCode(localStorage.getItem("sc_agent") || "");
    fetch("/api/rooms")
      .then((r) => r.json())
      .then((json) => {
        if (!json.success)
          throw new Error(json.error || "Rooms could not be loaded");
        const available = params.get("propertyId")
          ? json.data.filter(
              (r: any) => r.propertyId === params.get("propertyId"),
            )
          : json.data;
        setRooms(available);
        const selected =
          available.find(
            (r: any) => r.slug === (params.get("room") || params.get("suite")),
          ) || available[0];
        if (selected)
          setFormData((prev) => ({
            ...prev,
            suiteSlug: selected.slug,
            suiteName: selected.name,
            pricePerNight: selected.pricePerNight,
            checkIn: params.get("checkIn") || prev.checkIn,
            checkOut: params.get("checkOut") || prev.checkOut,
            guests: Math.min(
              Number(params.get("adults") || params.get("guests")) || 2,
              selected.maxGuests,
            ),
          }));
      })
      .catch((e) => setError(e.message))
      .finally(() => setRoomsLoading(false));
  }, []);

  useEffect(() => {
    const nights =
      Math.max(
        0,
        Math.round(
          (new Date(formData.checkOut).getTime() -
            new Date(formData.checkIn).getTime()) /
            86400000,
        ),
      ) || 0;
    setFormData((prev) => ({ ...prev, nights }));
  }, [formData.checkIn, formData.checkOut]);

  const selectedRoom = rooms.find((r) => r.slug === formData.suiteSlug);
  const isApartment = Boolean(
    selectedRoom?.badge?.toLowerCase().includes("apartment") ||
    selectedRoom?.type?.toLowerCase().includes("apartment") ||
    selectedRoom?.category?.toLowerCase().includes("apartment")
  );

  function validateDates() {
    if (!selectedRoom) {
      setError("Please select an available accommodation.");
      return false;
    }
    if (
      !formData.nights ||
      formData.checkIn < new Date().toISOString().slice(0, 10)
    ) {
      setError("Choose a future check-in and a check-out after check-in.");
      return false;
    }
    if (formData.guests > selectedRoom.maxGuests) {
      setError(
        `This ${isApartment ? "apartment" : "suite"} accommodates up to ${selectedRoom.maxGuests} guests.`,
      );
      return false;
    }
    setError("");
    return true;
  }

  // Calculate pricing breakdown dynamically
  const nightlyTotal = formData.pricePerNight * formData.nights;
  const grandTotal = nightlyTotal;

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText("1000364331");
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 3000);
    } catch {
      setError("Please copy account number 1000364331 manually.");
    }
  };

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validateDates()) return;
      if (formData.paymentMethod === "Bank Transfer" && !paymentReceipt) {
        setError("Please upload your bank transfer receipt before completing the reservation.");
        return;
      }
      setIsSubmitting(true);
      setError("");
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoom?.id,
          selectedAddOns: formData.selectedAddOns,
          agentCode: agentCode.trim() || undefined,
          visitorId: localStorage.getItem("sc_visitor") || undefined,
          roomName: formData.suiteName,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          nights: formData.nights,
          adults: formData.guests,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          specialRequests: formData.specialRequests,
          totalPrice: grandTotal,
          paymentMethod: formData.paymentMethod,
          paymentReceipt: paymentReceipt || undefined,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setBookingCompleted(json.data);
      } else {
        throw new Error(
          json.error || "Reservation could not be saved. Please try again.",
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111111] text-[#111111] dark:text-white font-sans flex flex-col justify-between transition-colors duration-200">
      {/* 1. AIRBNB HEADER */}
      <AirbnbHeader
        activeCategory="all"
        onSelectCategory={() => {}}
        selectedLocation=""
        onSelectLocation={() => {}}
        onSearch={() => {}}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 space-y-6">
        {/* TOP BACK BUTTON & PAGE TITLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#00AEEF] text-neutral-700 dark:text-neutral-300 transition"
            aria-label="Back to stays"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Confirm and pay
          </h1>
        </div>

        {error && (
          <div
            role="alert"
            className="p-4 rounded-2xl border border-rose-500/40 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-medium"
          >
            {error}
          </div>
        )}

        {roomsLoading && (
          <div className="p-12 text-center text-sm text-neutral-500">
            Loading reservation details...
          </div>
        )}

        {/* CONFIRMATION SCREEN (When booking is saved) */}
        {bookingCompleted && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#00AEEF] font-bold">
                {bookingCompleted.paymentStatus === "Paid"
                  ? "Reservation Confirmed"
                  : "Reservation Voucher Saved • Pending Payment Verification"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                Voucher #{bookingCompleted.bookingRef}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-lg mx-auto">
                Thank you, <strong>{formData.guestName}</strong>. Your reservation request for{" "}
                <strong>{formData.suiteName}</strong> has been created. Our team will verify your payment receipt and send WhatsApp confirmation shortly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] dark:bg-[#111111] border border-[#E8E5DF] dark:border-[#2C2B29] text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-500">Dates</span>
                <span className="font-semibold">{formData.checkIn} → {formData.checkOut} ({formData.nights} nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Guests</span>
                <span className="font-semibold">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 font-bold text-sm">
                <span>Total Amount</span>
                <span className="text-[#00AEEF]">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/2349042854834?text=${encodeURIComponent(
                  `Hello Stay Connect Concierge, I just completed reservation #${bookingCompleted.bookingRef} for ${formData.suiteName}. Please confirm receipt verification.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Concierge on WhatsApp</span>
              </a>

              <Link
                href={`/booking-status?ref=${bookingCompleted.bookingRef}#${bookingCompleted.lookupToken}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:border-[#00AEEF] flex items-center justify-center"
              >
                Track Voucher Status
              </Link>
            </div>
          </div>
        )}

        {/* 2-COLUMN AIRBNB CHECKOUT FLOW */}
        {!roomsLoading && !bookingCompleted && (
          <form onSubmit={handleCompleteBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* LEFT COLUMN: GUEST & PAYMENT DETAILS (65% width) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8 divide-y divide-[#E8E5DF] dark:divide-[#2C2B29]">
              {/* SECTION 1: YOUR TRIP */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Your trip details
                </h2>

                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1A1918] p-4 sm:p-5 space-y-4 shadow-sm">
                  {/* Accommodation Selector (if multiple suites) */}
                  {rooms.length > 1 && (
                    <div className="border-b border-neutral-100 dark:border-neutral-800 pb-3">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Selected Accommodation
                      </label>
                      <select
                        value={formData.suiteSlug}
                        onChange={(e) => {
                          const matched = rooms.find((r) => r.slug === e.target.value);
                          if (matched) {
                            setFormData((prev) => ({
                              ...prev,
                              suiteSlug: matched.slug,
                              suiteName: matched.name,
                              pricePerNight: matched.pricePerNight,
                            }));
                          }
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs font-semibold cursor-pointer"
                      >
                        {rooms.map((r) => (
                          <option key={r.id} value={r.slug}>
                            {r.name} — ₦{r.pricePerNight.toLocaleString()} / night
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#00AEEF]" />
                        <span>Dates</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <label className="block text-[10px] text-neutral-500 mb-0.5">Check-in</label>
                          <input
                            type="date"
                            value={formData.checkIn}
                            onChange={(e) => setFormData((prev) => ({ ...prev, checkIn: e.target.value }))}
                            className="w-full p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs font-semibold cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-500 mb-0.5">Checkout</label>
                          <input
                            type="date"
                            value={formData.checkOut}
                            onChange={(e) => setFormData((prev) => ({ ...prev, checkOut: e.target.value }))}
                            className="w-full p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs font-semibold cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#00AEEF]" />
                        <span>Guests</span>
                      </div>
                      <div className="mt-2">
                        <label className="block text-[10px] text-neutral-500 mb-0.5">Total capacity</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData((prev) => ({ ...prev, guests: Number(e.target.value) }))}
                          className="w-full p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs font-semibold cursor-pointer"
                        >
                          {Array.from({ length: selectedRoom?.maxGuests || 4 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} Guest{i > 0 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: GUEST INFORMATION */}
              <div className="pt-8 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Guest contact details
                </h2>

                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1A1918] p-4 sm:p-5 space-y-4 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Oluwaseun Davies"
                      value={formData.guestName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, guestName: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                        Email Address (for confirmation voucher) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="guest@domain.com"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData((prev) => ({ ...prev, guestEmail: e.target.value }))}
                        className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 904 285 4834"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, guestPhone: e.target.value }))}
                        className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Special Requests or Arrival Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Estimated arrival time, dietary preference, protocol assistance..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#FAF9F6] dark:bg-[#111111] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: PAYMENT METHOD WITH LIVE BANK DETAILS */}
              <div className="pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Payment method
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Secure Encrypted Transfer</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Direct Bank Transfer (Parallex Bank) */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "Bank Transfer" }))}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "Bank Transfer"
                        ? "border-[#00AEEF] bg-[#00AEEF]/5 ring-1 ring-[#00AEEF] shadow-md"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1A1918]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-neutral-900 dark:text-white">
                            Direct Bank Transfer (Manual Verification)
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00AEEF] bg-[#00AEEF]/10 px-2 py-0.5 rounded-full">
                            Preferred
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-light">
                          Transfer directly to Stay Connect Solutions Ltd account, upload proof, and your voucher will be approved.
                        </p>

                        {/* LIVE PARALLEX BANK DETAILS BOX */}
                        {formData.paymentMethod === "Bank Transfer" && (
                          <div
                            className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#111111] border border-[#00AEEF]/40 space-y-4 shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                              <div>
                                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                                  Official Operating Account
                                </span>
                                <div className="text-xs font-bold text-neutral-900 dark:text-white">
                                  Stay Connect Solutions Ltd
                                </div>
                              </div>
                              <span className="text-xs font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
                                Parallex Bank
                              </span>
                            </div>

                            <div className="flex items-center justify-between bg-[#FAF9F6] dark:bg-[#161616] p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
                              <div>
                                <div className="text-[10px] uppercase font-bold text-neutral-500">
                                  Account Number
                                </div>
                                <div className="text-base sm:text-lg font-mono font-bold tracking-widest text-[#111111] dark:text-white">
                                  1000364331
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={handleCopyAccount}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00AEEF] hover:bg-[#0090C8] text-[#111111] font-bold text-xs shadow-sm transition active:scale-95"
                              >
                                {copiedAccount ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy Number</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <p className="text-[11px] text-neutral-500 font-light">
                              Please transfer <strong>₦{grandTotal.toLocaleString()}</strong> and use your full name (
                              <strong>{formData.guestName || "Your Name"}</strong>) as payment narration.
                            </p>

                            {/* RECEIPT UPLOAD INPUT */}
                            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                              <label className="block text-xs font-bold text-neutral-900 dark:text-white">
                                Upload Bank Transfer Receipt *
                              </label>
                              <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#00AEEF] rounded-2xl p-4 text-center cursor-pointer transition bg-[#FAF9F6] dark:bg-[#161616]">
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp"
                                  disabled={receiptUploading || isSubmitting}
                                  onChange={async (e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (!file) return;
                                    setError("");
                                    setReceiptProgress(null);
                                    setReceiptUploading(true);
                                    try {
                                      const [url] = await uploadImages([file], { onProgress: setReceiptProgress });
                                      setPaymentReceipt(url);
                                    } catch (uploadError) {
                                      setPaymentReceipt("");
                                      setError(
                                        uploadError instanceof Error
                                          ? uploadError.message
                                          : "Receipt upload failed. Please try again."
                                      );
                                    } finally {
                                      setReceiptUploading(false);
                                      e.currentTarget.value = "";
                                    }
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="space-y-1">
                                  <Upload className="w-6 h-6 text-[#00AEEF] mx-auto" />
                                  <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                    Click or drag transfer receipt here
                                  </div>
                                  <div className="text-[10px] text-neutral-400">
                                    PNG, JPG, or WEBP up to 10MB
                                  </div>
                                </div>
                              </div>

                              {receiptUploading && (
                                <p className="text-xs text-[#00AEEF] font-semibold animate-pulse">
                                  Uploading transfer receipt...
                                </p>
                              )}
                              {paymentReceipt && (
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/30">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                  <span>Transfer receipt attached and ready for verification!</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Pay at Property */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "Pay at Hotel" }))}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "Pay at Hotel"
                        ? "border-[#00AEEF] bg-[#00AEEF]/5 ring-1 ring-[#00AEEF] shadow-md"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1A1918]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">
                          Pay upon Arrival at Residence
                        </span>
                        <p className="text-xs text-neutral-500 font-light">
                          Arrange direct payment on arrival with the on-ground concierge. Reservation remains pending verification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Agent referral code */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                    Agent referral code (Optional)
                  </label>
                  <input
                    value={agentCode}
                    onChange={(e) => setAgentCode(e.target.value)}
                    placeholder="Enter agent promo or partner code"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#111111] text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>
              </div>

              {/* SECTION 4: GROUND RULES & CONFIRMATION BUTTON */}
              <div className="pt-8 space-y-4">
                <div className="text-xs text-neutral-500 font-light leading-relaxed">
                  By clicking <strong>Complete Reservation</strong>, you agree to Stay Connect Global terms of service, guest policies, and 24/7 power protection standards.
                </div>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    receiptUploading ||
                    (formData.paymentMethod === "Bank Transfer" && !paymentReceipt)
                  }
                  className="w-full py-4 rounded-2xl bg-[#00AEEF] hover:bg-[#0090C8] disabled:opacity-50 text-[#111111] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-cyan-500/20 active:scale-95 transition-all duration-200"
                >
                  <Lock className="w-4 h-4 stroke-[2.8]" />
                  <span>{isSubmitting ? "Generating Voucher..." : "Complete Reservation"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY ORDER SUMMARY CARD (35% width) */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
              <div className="rounded-3xl border border-[#E8E5DF] dark:border-[#2C2B29] bg-white dark:bg-[#1A1918] p-6 shadow-xl space-y-5">
                {/* Accommodation Card Summary */}
                <div className="flex gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <div className="w-24 h-20 rounded-2xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200 dark:border-neutral-700">
                    <img
                      src={selectedRoom?.heroImage || "/images/experiences/chauffeur.jpg"}
                      alt={formData.suiteName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#00AEEF]">
                      Stay Connect Verified
                    </span>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white line-clamp-1">
                      {formData.suiteName || "Luxury Residence"}
                    </h3>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 font-light">
                      {selectedRoom?.address || "Lagos, Nigeria"}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">
                      <Star className="w-3 h-3 fill-current text-[#C6A15B]" />
                      <span>4.98</span>
                      <span className="text-neutral-400 font-normal">· (28 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Guarantees Tag */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] text-xs font-semibold">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>Guaranteed 24/7 Power & Escort Ready</span>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                    Price details
                  </div>
                  <div className="flex justify-between items-center">
                    <span>
                      ₦{formData.pricePerNight.toLocaleString()} x {formData.nights} night
                      {formData.nights > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ₦{nightlyTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stay Connect Service Fee</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">₦0 (Included)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>24/7 Energy & Generator Surcharge</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">₦0 (Complimentary)</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-baseline text-sm font-bold text-neutral-900 dark:text-white">
                    <span>Total (NGN)</span>
                    <span className="text-lg text-[#00AEEF]">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Parallex Bank Reminder Card */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 text-[11px] space-y-1">
                  <div className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
                    <span>Parallex Bank Transfer</span>
                    <span className="font-mono text-[#00AEEF]">1000364331</span>
                  </div>
                  <p className="text-neutral-500 font-light">
                    Stay Connect Solutions Ltd • Receipt verified upon upload
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* 5. AIRBNB FOOTER */}
      <AirbnbFooter />
    </div>
  );
}
