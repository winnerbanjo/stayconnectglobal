"use client";

import React, { useState, useEffect } from "react";
import { uploadImages } from "@/lib/upload-images";
import RoomEditor from "@/components/properties/RoomEditor";
import Link from "next/link";
import Image from "next/image";
import {
  BedDouble,
  Plus,
  CheckCircle,
  BarChart3,
  Building,
  Calendar,
  LogOut,
  X,
  Car,
  Upload,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Utensils,
} from "lucide-react";
import { Room, Partner } from "@/types";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default function AdminRoomsPage() {
  return <AdminAuthGuard><AdminRoomsPageContent /></AdminAuthGuard>;
}

function AdminRoomsPageContent() {
  const [properties, setProperties] = useState<any[]>([]);
  const [editing, setEditing] = useState("");
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [formData, setFormData] = useState({
    propertyId: "",
    numberOfUnits: 1,
    name: "",
    tagline: "",
    type: "Executive",
    pricePerNight: 0,
    weekendPricePerNight: 0,
    maxGuests: 2,
    propertySize: 0,
    bedrooms: 1,
    bathrooms: 1,
    address: "",
    description: "",
    heroImage: "",
    gallery: [] as string[],
    partnerId: "",
    hostName: "",
    amenities: "",
  });

  const fetchLivePartners = async () => {
    try {
      const res = await fetch("/api/partners");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load saved records");
      if (json.success && json.data) {
        setPartners(json.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load saved records");
    }
  };

  const fetchLiveRooms = async () => {
    try {
      setLoadingRooms(true);
      const res = await fetch("/api/rooms?manage=true");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load saved records");
      if (json.success && json.data) {
        setRooms(json.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load saved records");
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    fetch("/api/properties?manage=true")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setProperties(j.data);
      });
    fetchLiveRooms();
    fetchLivePartners();
  }, []);

  const approvedPartners = partners.filter((p) => p.status === "Approved");

  const handleBulkImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;
    setUploading(true);
    setError("");
    try {
      const urls = await uploadImages(e.target.files);
      setFormData((prev) => ({
        ...prev,
        heroImage: prev.gallery.length ? prev.heroImage : urls[0],
        gallery: [...prev.gallery, ...urls],
      }));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };
  const removeGalleryImage = (index: number) => {
    setFormData((prev) => {
      const updated = prev.gallery.filter((_, i) => i !== index);
      return {
        ...prev,
        gallery: updated,
        heroImage: updated[0] || prev.heroImage,
      };
    });
  };

  const handleFileUpload = handleBulkImageUpload;
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newRoomPayload = {
      slug,
      name: formData.name,
      tagline: formData.tagline,
      propertyId: formData.propertyId,
      numberOfUnits: formData.numberOfUnits,
      type: formData.type,
      address: formData.address,
      city: properties.find(p => p.id === formData.propertyId)?.city || "",
      maxGuests: Number(formData.maxGuests),
      propertySize: Number(formData.propertySize),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      pricePerNight: Number(formData.pricePerNight),
      weekendPricePerNight: Number(formData.weekendPricePerNight),
      description: formData.description,
      heroImage: formData.heroImage || formData.gallery[0] || "",
      gallery:
        formData.gallery.length > 0 ? formData.gallery : [formData.heroImage],
      partnerId: formData.partnerId || undefined,
      hostName: formData.hostName || undefined,
      amenities: formData.amenities.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoomPayload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load saved records");
      if (json.success && json.data) {
        setRooms([json.data, ...rooms]);
      } else {
        throw new Error(json.error || "Room could not be saved");
      }
      setIsModalOpen(false);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col md:flex-row">
        {/* Mobile Header Bar */}
        <AdminMobileNav />

        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#85672E] font-serif font-bold flex items-center justify-center text-sm">
                SC
              </div>
              <div>
                <div className="font-serif text-lg text-slate-900 font-medium">
                  Stay Connect
                </div>
                <div className="text-[10px] text-[#85672E] uppercase tracking-widest font-semibold">
                  Admin Portal
                </div>
              </div>
            </div>

            <nav className="space-y-2 text-xs uppercase tracking-widest font-medium">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <BarChart3 className="w-4 h-4 text-[#85672E]" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/properties"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Building className="w-4 h-4 text-[#85672E]" />
                <span>Properties</span>
              </Link>
              <Link
                href="/admin/rooms"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold"
              >
                <BedDouble className="w-4 h-4" />
                <span>Rooms & Inventory</span>
              </Link>
              <Link
                href="/admin/housekeeping"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <RefreshCw className="w-4 h-4 text-[#85672E]" />
                <span>Housekeeping Ops</span>
              </Link>
              <Link
                href="/admin/dining"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Utensils className="w-4 h-4 text-[#85672E]" />
                <span>Dining & Menu</span>
              </Link>
              <Link
                href="/admin/fleet"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Car className="w-4 h-4 text-[#85672E]" />
                <span>Fleet Logistics</span>
              </Link>
              <Link
                href="/admin/bookings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Calendar className="w-4 h-4 text-[#85672E]" />
                <span>Reservations CRM</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#85672E]"
            >
              <LogOut className="w-4 h-4" />
              <span>Return to Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#85672E] font-semibold">
                Inventory Manager
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-slate-900 font-normal mt-1">
                Suites & Rooms Catalog
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Room</span>
            </button>
          </div>

          {error && (
            <p role="alert" className="text-rose-700">
              {error}
            </p>
          )}
          {loadingRooms ? (
            <div className="flex items-center justify-center p-12 text-[#85672E] gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs uppercase tracking-widest">
                Loading room inventory…
              </span>
            </div>
          ) : rooms.length === 0 && !error ? (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center" role="status">
              <h2 className="font-serif text-2xl text-slate-900">No rooms yet</h2>
              <p className="mt-3 text-sm text-slate-600">Add a property first, then create its rooms and set your rates.</p>
            </section>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {rooms.map((rm, idx) => (
                <div
                  key={(rm as any)._id || rm.id || rm.slug || `room-${idx}`}
                  className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src={rm.heroImage}
                      alt={rm.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-slate-600">
                    {properties.find((p) => p.id === rm.propertyId)?.name} ·{" "}
                    {rm.numberOfUnits || 1} units
                  </p>
                  <button
                    onClick={() => setEditing(editing === rm.id ? "" : rm.id)}
                    className="text-xs text-[#85672E] underline"
                  >
                    Edit inventory, price & photos
                  </button>
                  {editing === rm.id && (
                    <RoomEditor
                      room={rm}
                      onSaved={() => {
                        setEditing("");
                        fetchLiveRooms();
                      }}
                    />
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-slate-900">
                      {rm.name}
                    </h3>
                    <span className="text-xs font-serif text-[#85672E] font-bold">
                      ₦{rm.pricePerNight.toLocaleString()} / night
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {rm.maxGuests} Guests • {rm.propertySize} m² • {rm.bedrooms}{" "}
                    BR • 📍 {rm.address}
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
                    {rm.description}
                  </p>
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Room type saved
                    </span>
                    <Link
                      href={`/rooms/${rm.slug}`}
                      className="text-slate-900 hover:text-[#85672E] underline"
                    >
                      View Suite →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Create Room Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-xl w-full space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#85672E] font-semibold">
                    Inventory Manager
                  </span>
                  <h3 className="font-serif text-2xl text-slate-900">
                    Create New Suite / Room
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRoom} className="space-y-4 text-xs">
                {error && (
                  <p role="alert" className="text-rose-700">
                    {error}
                  </p>
                )}
                <label className="block">
                  Property
                  <select
                    required
                    value={formData.propertyId}
                    onChange={(e) => {
                      const p = properties.find((p) => p.id === e.target.value);
                      setFormData({
                        ...formData,
                        propertyId: e.target.value,
                        address: p?.address || "",
                        partnerId: p?.partnerId || "",
                        hostName: p?.hostName || "",
                      });
                    }}
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg mt-2"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  Number of available units for this room type
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={formData.numberOfUnits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfUnits: Number(e.target.value),
                      })
                    }
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg mt-2"
                  />
                </label>

                {/* Property Owner / Partner Selection */}
                <div>
                  <label className="text-slate-700 font-medium flex items-center justify-between">
                    <span>Property Owner / Partner Merchant</span>
                    <span className="text-[10px] text-[#85672E] font-semibold">
                      Approved Merchants Only
                    </span>
                  </label>
                  <select
                    value={formData.partnerId}
                    onChange={(e) => {
                      const selectedPartnerId = e.target.value;
                      const matchedPartner = approvedPartners.find(
                        (p) => p.partnerId === selectedPartnerId,
                      );
                      setFormData({
                        ...formData,
                        partnerId: selectedPartnerId,
                        hostName: matchedPartner
                          ? matchedPartner.propertyName ||
                            matchedPartner.businessName ||
                            matchedPartner.contactName
                          : "Stay Connect Direct Flagship",
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1 focus:border-[#C6A15B]"
                  >
                    <option value="">
                      Stay Connect Global (Direct Flagship Managed)
                    </option>
                    {approvedPartners.map((p) => (
                      <option key={p.id || p.partnerId} value={p.partnerId}>
                        {p.propertyName || p.businessName || p.contactName} (
                        {p.partnerId} • {p.contactName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-medium">
                      Suite Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Emerald Suite"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Suite Tagline
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Executive Single Suite"
                      value={formData.tagline}
                      onChange={(e) =>
                        setFormData({ ...formData, tagline: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                </div>

                {/* Bulk Image Upload Field (6+ Photos At Once) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-700 font-medium block">
                      Suite Photos (Bulk Upload 6+ Photos At Once)
                    </label>
                    <span className="text-[10px] font-mono text-[#85672E] font-semibold">
                      {formData.gallery.length} Photo(s) Attached
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 hover:border-[#C6A15B] rounded-xl text-center space-y-2 transition-colors relative cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-white text-[#85672E] flex items-center justify-center mx-auto border border-[#C6A15B]/40">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-900">
                        Click to Select & Upload At Least 6+ Image Files
                      </div>
                      <div className="text-[10px] text-slate-600">
                        Multi-select JPG, PNG, WEBP files directly from device
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleBulkImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>

                  {formData.gallery.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                      {formData.gallery.map((imgSrc, idx) => (
                        <div
                          key={idx}
                          className="relative h-20 rounded-lg overflow-hidden border border-[#C6A15B]/50 group bg-slate-100"
                        >
                          <img
                            src={imgSrc}
                            alt={`Suite Photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-white text-rose-700 rounded-full hover:bg-rose-50 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 bg-[#C6A15B] text-[#111111] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                              Primary Photo
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-700 font-medium">
                      Nightly Rate (₦)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.pricePerNight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerNight: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Weekend Rate (₦)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.weekendPricePerNight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weekendPricePerNight: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Size (m²)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.propertySize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertySize: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-700 font-medium">
                      Max Guests
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.maxGuests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxGuests: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.bedrooms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bedrooms: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.bathrooms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bathrooms: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-medium">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide an editorial description..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold uppercase tracking-widest rounded-lg shadow-xl"
                  >
                    Publish Suite Live
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
