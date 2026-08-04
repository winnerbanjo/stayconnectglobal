'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BedDouble, Plus, CheckCircle, BarChart3, Building, Calendar, LogOut, X, Car, Upload, Image as ImageIcon, Loader2, RefreshCw, Utensils } from 'lucide-react';
import { INITIAL_ROOMS } from '@/lib/data/seedData';
import { Room } from '@/types';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: 'Executive Single Suite',
    type: 'Executive',
    pricePerNight: 200000,
    weekendPricePerNight: 230000,
    maxGuests: 2,
    propertySize: 160,
    bedrooms: 1,
    bathrooms: 1,
    address: '14B, Providence Street, Lekki, Lagos',
    description: '',
    heroImage: '/images/saffron/saffron-1.jpg',
    amenities: 'WiFi, Air Conditioning, Smart TV, Netflix, Coffee Machine, Room Service',
  });

  const fetchLiveRooms = async () => {
    try {
      setLoadingRooms(true);
      const res = await fetch('/api/rooms');
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setRooms(json.data);
      }
    } catch (e) {
      console.warn('Using local seed rooms fallback:', e);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    fetchLiveRooms();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setFormData((prev) => ({ ...prev, heroImage: json.url }));
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, heroImage: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('File upload error:', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, heroImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newRoomPayload = {
      slug,
      name: formData.name,
      tagline: formData.tagline,
      propertyId: 'prop-lekki-1',
      type: formData.type,
      address: formData.address,
      city: 'Lagos, Nigeria',
      maxGuests: Number(formData.maxGuests),
      propertySize: Number(formData.propertySize),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      pricePerNight: Number(formData.pricePerNight),
      weekendPricePerNight: Number(formData.weekendPricePerNight),
      description: formData.description || 'Newly added luxury executive suite in Lekki Phase 1.',
      heroImage: formData.heroImage,
      amenities: formData.amenities.split(',').map((s) => s.trim()),
    };

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoomPayload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setRooms([json.data, ...rooms]);
      } else {
        const localRoom: Room = {
          id: `room-${Date.now()}`,
          ...newRoomPayload,
          type: newRoomPayload.type as any,
          holidayPricePerNight: Number(formData.pricePerNight) * 1.25,
          badge: 'TLC ⭐⭐⭐⭐⭐',
          rating: 5.0,
          reviewCount: 0,
          ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
          gallery: [formData.heroImage],
          features: {
            bedType: 'King Size Pillow-top',
            view: 'Lekki Skyline View',
            floor: 'Executive Level',
            balcony: true,
            workspace: true,
            miniBar: true,
            coffeeMachine: true,
            smartTV: true,
            netflix: true,
            wifi: true,
            safe: true,
            closet: true,
            hairDryer: true,
            refrigerator: true,
            cable: true,
            roomService: true,
            housekeeping: true,
          },
          published: true,
          featured: true,
        };
        setRooms([localRoom, ...rooms]);
      }
    } catch (e) {
      console.error('Save room error:', e);
    } finally {
      setIsModalOpen(false);
      setFormData({
        name: '',
        tagline: 'Executive Single Suite',
        type: 'Executive',
        pricePerNight: 200000,
        weekendPricePerNight: 230000,
        maxGuests: 2,
        propertySize: 160,
        bedrooms: 1,
        bathrooms: 1,
        address: '14B, Providence Street, Lekki, Lagos',
        description: '',
        heroImage: '/images/saffron/saffron-1.jpg',
        amenities: 'WiFi, Air Conditioning, Smart TV, Netflix, Coffee Machine, Room Service',
      });
    }
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
                <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest font-semibold">Admin Portal</div>
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
              <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold">
                <BedDouble className="w-4 h-4" />
                <span>Rooms & Inventory</span>
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

          <div className="pt-6 border-t border-[#2C2B29]">
            <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B]">
              <LogOut className="w-4 h-4" />
              <span>Return to Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Inventory Manager</span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">Suites & Rooms Catalog</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Room</span>
            </button>
          </div>

          {loadingRooms ? (
            <div className="flex items-center justify-center p-12 text-[#C6A15B] gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs uppercase tracking-widest">Loading Live MongoDB Inventory...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {rooms.map((rm, idx) => (
                <div
                  key={(rm as any)._id || rm.id || rm.slug || `room-${idx}`}
                  className="p-6 sm:p-8 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900 mb-2">
                    <img src={rm.heroImage} alt={rm.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-white">{rm.name}</h3>
                    <span className="text-xs font-serif text-[#C6A15B] font-bold">₦{rm.pricePerNight.toLocaleString()} / night</span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    {rm.maxGuests} Guests • {rm.propertySize} m² • {rm.bedrooms} BR • 📍 {rm.address}
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">{rm.description}</p>
                  <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between text-xs">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Published (Live Atlas)
                    </span>
                    <Link href={`/rooms/${rm.slug}`} className="text-white hover:text-[#C6A15B] underline">
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
            <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-xl w-full space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">Inventory Manager</span>
                  <h3 className="font-serif text-2xl text-white">Create New Suite / Room</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRoom} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Suite Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Emerald Suite"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Suite Tagline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Executive Single Suite"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                </div>

                {/* Direct Image File Upload Field */}
                <div className="space-y-2">
                  <label className="text-neutral-300 font-medium block">Suite Photo (Direct Image Upload)</label>
                  <div className="p-4 bg-[#1A1918] border-2 border-dashed border-[#2C2B29] hover:border-[#C6A15B] rounded-xl text-center space-y-3 transition-colors relative">
                    {formData.heroImage ? (
                      <div className="relative h-40 rounded-lg overflow-hidden border border-[#C6A15B]">
                        <img src={formData.heroImage} alt="Uploaded Suite Preview" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] text-[#C6A15B]">
                          Ready to Publish
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 space-y-2">
                        <ImageIcon className="w-8 h-8 text-[#C6A15B] mx-auto" />
                        <div className="text-xs text-neutral-300">Click to select photo or drag & drop</div>
                        <div className="text-[10px] text-neutral-500">JPG, PNG, WEBP up to 10MB</div>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    {uploading && (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center gap-2 text-[#C6A15B] rounded-xl">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Uploading to Cloudinary...</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Nightly Rate (₦)</label>
                    <input
                      type="number"
                      required
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Weekend Rate (₦)</label>
                    <input
                      type="number"
                      required
                      value={formData.weekendPricePerNight}
                      onChange={(e) => setFormData({ ...formData, weekendPricePerNight: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Size (m²)</label>
                    <input
                      type="number"
                      required
                      value={formData.propertySize}
                      onChange={(e) => setFormData({ ...formData, propertySize: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Max Guests</label>
                    <input
                      type="number"
                      required
                      value={formData.maxGuests}
                      onChange={(e) => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Bedrooms</label>
                    <input
                      type="number"
                      required
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Bathrooms</label>
                    <input
                      type="number"
                      required
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-medium">Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide an editorial description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2C2B29]">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-neutral-400 hover:text-white">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold uppercase tracking-widest rounded-lg shadow-xl">
                    Publish Suite Live
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
