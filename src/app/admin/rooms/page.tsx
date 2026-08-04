'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BedDouble, Plus, CheckCircle, BarChart3, Building, Calendar, LogOut, X, Car } from 'lucide-react';
import { INITIAL_ROOMS } from '@/lib/data/seedData';
import { Room } from '@/types';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: 'Luxury Suite',
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

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      slug,
      name: formData.name,
      tagline: formData.tagline,
      propertyId: 'prop-lekki-1',
      type: formData.type as any,
      address: formData.address,
      city: 'Lagos, Nigeria',
      badge: 'TLC ⭐⭐⭐⭐⭐',
      maxGuests: Number(formData.maxGuests),
      propertySize: Number(formData.propertySize),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      pricePerNight: Number(formData.pricePerNight),
      weekendPricePerNight: Number(formData.weekendPricePerNight),
      holidayPricePerNight: Number(formData.pricePerNight) * 1.25,
      rating: 5.0,
      reviewCount: 0,
      ratingBreakdown: {
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      },
      description: formData.description || 'Newly added luxury executive suite in Lekki Phase 1.',
      heroImage: formData.heroImage,
      gallery: [formData.heroImage],
      amenities: formData.amenities.split(',').map(s => s.trim()),
      features: {
        bedType: 'King Size Pillow-top',
        view: 'Lekki Peninsula View',
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

    setRooms([newRoom, ...rooms]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      tagline: 'Luxury Suite',
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
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans flex">
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

          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <BarChart3 className="w-4 h-4 text-[#C6A15B]" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <Building className="w-4 h-4 text-[#C6A15B]" />
              <span>Properties</span>
            </Link>
            <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest">
              <BedDouble className="w-4 h-4" />
              <span>Rooms & Inventory</span>
            </Link>
            <Link href="/admin/fleet" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <Car className="w-4 h-4 text-[#C6A15B]" />
              <span>Fleet & Chauffeur</span>
            </Link>
            <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <Calendar className="w-4 h-4 text-[#C6A15B]" />
              <span>Reservations CRM</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#2C2B29]">
          <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C6A15B] transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Inventory Manager</span>
            <h1 className="font-serif text-3xl text-white font-normal mt-1">Suites & Rooms Catalog</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-xl transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Room</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((rm) => (
            <div key={rm.id} className="p-8 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-white">{rm.name}</h3>
                <span className="text-xs font-serif text-[#C6A15B] font-bold">₦{rm.pricePerNight.toLocaleString()} / night</span>
              </div>
              <div className="text-xs text-neutral-400">
                {rm.maxGuests} Guests • {rm.propertySize} m² • {rm.bedrooms} BR • 📍 {rm.address}
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{rm.description}</p>
              <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Published
                </span>
                <Link href={`/rooms/${rm.slug}`} className="text-white hover:text-[#C6A15B] underline">
                  View Suite →
                </Link>
              </div>
            </div>
          ))}
        </div>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 font-medium">Suite Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Emerald Penthouse"
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
                    placeholder="e.g. Skyline Presidential Sanctuary"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
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

              <div className="grid grid-cols-3 gap-3">
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
                <label className="text-neutral-300 font-medium">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                />
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
                  Publish Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
