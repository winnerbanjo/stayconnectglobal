'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, Plus, MapPin, CheckCircle, BarChart3, BedDouble, Calendar, LogOut, X } from 'lucide-react';
import { INITIAL_PROPERTIES } from '@/lib/data/seedData';
import { Property } from '@/types';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagline: 'Refined Sanctuary in Victoria Island',
    address: '25 Adetokunbo Ademola Street, Victoria Island, Lagos',
    city: 'Lagos, Nigeria',
    description: 'An ultra-exclusive collection of luxury suites and dining lounges.',
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90',
  });

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProp: Property = {
      id: `prop-${Date.now()}`,
      slug,
      name: formData.name,
      tagline: formData.tagline,
      address: formData.address,
      city: formData.city,
      coordinates: { lat: 6.4281, lng: 3.4219 },
      description: formData.description,
      heroImage: formData.heroImage,
      gallery: [formData.heroImage],
      amenities: [
        { id: 'wifi', name: 'High Speed Internet', category: 'general', icon: 'Wifi' },
        { id: 'ac', name: 'Air Conditioning', category: 'room', icon: 'Wind' },
      ],
      published: true,
      policies: {
        checkInTime: '3:00 PM',
        checkOutTime: '12:00 PM',
        cancellation: 'Flexible cancellation.',
        petsAllowed: false,
        smokingAllowed: false,
      },
    };
    setProperties([newProp, ...properties]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      tagline: 'Refined Sanctuary in Victoria Island',
      address: '25 Adetokunbo Ademola Street, Victoria Island, Lagos',
      city: 'Lagos, Nigeria',
      description: 'An ultra-exclusive collection of luxury suites and dining lounges.',
      heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90',
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
            <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest">
              <Building className="w-4 h-4" />
              <span>Properties</span>
            </Link>
            <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
              <BedDouble className="w-4 h-4 text-[#C6A15B]" />
              <span>Rooms Inventory</span>
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
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Multi-Hotel Portfolio</span>
            <h1 className="font-serif text-3xl text-white font-normal mt-1">Properties Manager</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((prop) => (
            <div key={prop.id} className="p-8 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-white">{prop.name}</h3>
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-[10px] uppercase font-bold rounded-full border border-emerald-800">
                  Active Property
                </span>
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C6A15B]" />
                <span>{prop.address}</span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{prop.description}</p>
              <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between text-xs">
                <span className="text-[#C6A15B]">ID: {prop.slug}</span>
                <Link href={`/properties/${prop.slug}`} className="text-white hover:text-[#C6A15B] underline">
                  View Public Page →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
              <h3 className="font-serif text-2xl text-white">Add New Hotel / Residence</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-medium">Property Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stay Connect Eko Atlantic Residences"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-medium">Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Eko Boulevard, Eko Atlantic, Lagos"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-medium">Hero Image URL</label>
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
                  Publish Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
