"use client";

import React, { useState, useEffect } from "react";
import PropertyEditor from "@/components/properties/PropertyEditor";
import { uploadImages } from "@/lib/upload-images";
import Link from "next/link";
import {
  Building,
  Plus,
  MapPin,
  CheckCircle,
  BarChart3,
  BedDouble,
  Calendar,
  LogOut,
  X,
  Car,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Utensils,
  UserCheck,
  Upload,
  Trash2,
} from "lucide-react";
import { Property, Partner } from "@/types";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default function AdminPropertiesPage() {
  return <AdminAuthGuard><AdminPropertiesPageContent /></AdminAuthGuard>;
}

function AdminPropertiesPageContent() {
  const [error, setError] = useState("");
  const [editing, setEditing] = useState("");
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [reviewing, setReviewing] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    address: "",
    city: "",
    description: "",
    heroImage: "",
    gallery: [] as string[],
    partnerId: "",
    hostName: "",
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

  const fetchLiveProperties = async () => {
    try {
      setLoadingProps(true);
      const res = await fetch("/api/properties?manage=true");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load saved records");
      if (json.success && json.data) {
        setProperties(json.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load saved records");
    } finally {
      setLoadingProps(false);
    }
  };

  useEffect(() => {
    fetchLiveProperties();
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
        heroImage: prev.heroImage || urls[0],
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
        heroImage: updated[0] || "",
      };
    });
  };

  const handleFileUpload = handleBulkImageUpload;
  async function review(id: string, action: string) {
    setError("");
    setReviewing(true);
    try {
      const res = await fetch("/api/properties", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, reviewNote: reviewNotes[id] || "" }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load saved records");
      if (!res.ok) throw new Error(json.error);
      await fetchLiveProperties();
      await fetchLivePartners();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setReviewing(false);
    }
  }

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newPropPayload = {
      slug,
      name: formData.name,
      tagline: formData.tagline,
      address: formData.address,
      city: formData.city,
      description: formData.description,
      heroImage:
        formData.heroImage ||
        formData.gallery[0] ||
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90",
      gallery:
        formData.gallery.length > 0 ? formData.gallery : [formData.heroImage],
      partnerId: formData.partnerId || undefined,
      hostName: formData.hostName || undefined,
    };

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPropPayload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load saved records");
      if (json.success && json.data) {
        setProperties([json.data, ...properties]);
      } else {
        throw new Error(json.error || "Property could not be saved");
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
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold"
              >
                <Building className="w-4 h-4" />
                <span>Properties</span>
              </Link>
              <Link
                href="/admin/rooms"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <BedDouble className="w-4 h-4 text-[#85672E]" />
                <span>Rooms Inventory</span>
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
                Multi-Hotel Portfolio
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-slate-900 font-normal mt-1">
                Properties Manager
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Property</span>
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="p-4 border border-rose-700 rounded-lg text-rose-700"
            >
              {error}
            </p>
          )}
          {loadingProps ? (
            <div className="flex items-center justify-center p-12 text-[#85672E] gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs uppercase tracking-widest">
                Loading Live Properties...
              </span>
            </div>
          ) : properties.length === 0 && !error ? (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center" role="status">
              <h2 className="font-serif text-2xl text-slate-900">No properties yet</h2>
              <p className="mt-3 text-sm text-slate-600">Add your first property to start setting up your inventory.</p>
            </section>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {properties.map((prop, idx) => (
                <div
                  key={
                    (prop as any)._id || prop.id || prop.slug || `prop-${idx}`
                  }
                  className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src={
                        prop.heroImage ||
                        prop.gallery?.[0] ||
                        "/images/saffron/saffron-1.jpg"
                      }
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    {prop.partnerId && (
                      <span className="absolute top-2 right-2 bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200 uppercase font-mono">
                        Merchant: {prop.hostName || prop.partnerId}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-slate-900">
                      {prop.name}
                    </h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold rounded-full border border-emerald-200 self-start sm:self-auto">
                      {prop.verificationStatus || "Approved"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#85672E] shrink-0" />
                    <span>{prop.address}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
                    {prop.description}
                  </p>
                  <p className="text-xs text-slate-600">
                    {prop.numberOfUnits || 1} rooms / units · From ₦
                    {prop.pricingStartingFrom?.toLocaleString()}
                  </p>
                  {prop.reviewNote && (
                    <p className="text-sm text-amber-800">{prop.reviewNote}</p>
                  )}
                  <div className="flex gap-4 flex-wrap text-sm">
                    <button
                      onClick={() =>
                        setEditing(editing === prop.id ? "" : prop.id)
                      }
                      className="underline"
                    >
                      Edit details & photos
                    </button>
                    {["Draft", "Changes Required"].includes(
                      prop.verificationStatus || "",
                    ) && (
                      <button
                        disabled={reviewing}
                        onClick={() => review(prop.id, "submit")}
                        className="text-[#85672E]"
                      >
                        Submit for verification
                      </button>
                    )}
                  </div>
                  {prop.verificationStatus === "Pending Verification" && (
                    <div className="space-y-3">
                      <label className="block text-xs">
                        Review feedback
                        <textarea
                          value={reviewNotes[prop.id] || ""}
                          onChange={(e) =>
                            setReviewNotes({
                              ...reviewNotes,
                              [prop.id]: e.target.value,
                            })
                          }
                          className="w-full p-3 mt-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </label>
                      <div className="flex gap-3">
                        <button
                          disabled={reviewing}
                          onClick={() => review(prop.id, "approve")}
                          className="bg-[#C6A15B] text-black px-4 py-2 rounded-lg text-xs"
                        >
                          Approve & publish
                        </button>
                        <button
                          disabled={reviewing}
                          onClick={() => review(prop.id, "changes")}
                          className="border border-[#555] px-4 py-2 rounded-lg text-xs"
                        >
                          Request changes
                        </button>
                      </div>
                    </div>
                  )}
                  {editing === prop.id && (
                    <PropertyEditor
                      property={prop}
                      onSaved={() => {
                        setEditing("");
                        fetchLiveProperties();
                      }}
                    />
                  )}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-[#85672E]">ID: {prop.slug}</span>
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="text-slate-900 hover:text-[#85672E] underline"
                    >
                      View Public Page →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="font-serif text-2xl text-slate-900">
                  Add New Property
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <p role="alert" className="text-rose-700 text-sm">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleCreateProperty}
                className="space-y-4 text-xs"
              >
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

                <div>
                  <label className="text-slate-700 font-medium">
                    Property Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mary House Serviced Suites"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-medium">
                    Full Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14B Providence Street, Lekki Phase 1, Lagos"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 mt-1"
                  />
                </div>

                {/* Bulk Image Upload Field (6+ images at once) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-700 font-medium block">
                      Property Photos (Bulk Upload 6+ Photos At Once)
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
                            alt={`Gallery ${idx + 1}`}
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
                              Hero Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-slate-700 font-medium">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
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
                    Publish Property Live
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
