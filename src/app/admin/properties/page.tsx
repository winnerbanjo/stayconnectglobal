'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building, Plus, MapPin, CheckCircle, BarChart3, BedDouble, Calendar, LogOut, X, Car, Image as ImageIcon, Loader2, RefreshCw, Utensils } from 'lucide-react';
import { INITIAL_PROPERTIES } from '@/lib/data/seedData';
import { Property } from '@/types';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: 'Refined Sanctuary in Victoria Island',
    address: '25 Adetokunbo Ademola Street, Victoria Island, Lagos',
    city: 'Lagos, Nigeria',
    description: 'An ultra-exclusive collection of luxury suites and dining lounges.',
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90',
  });

  const fetchLiveProperties = async () => {
    try {
      setLoadingProps(true);
      const res = await fetch('/api/properties');
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setProperties(json.data);
      }
    } catch (e) {
      console.warn('Fallback to local properties:', e);
    } finally {
      setLoadingProps(false);
    }
  };

  useEffect(() => {
    fetchLiveProperties();
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
      console.error('Property image upload error:', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, heroImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newPropPayload = {
      slug,
      name: formData.name,
      tagline: formData.tagline,
      address: formData.address,
      city: formData.city,
      description: formData.description,
      heroImage: formData.heroImage,
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPropPayload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setProperties([json.data, ...properties]);
      } else {
        const localProp: Property = {
          id: `prop-${Date.now()}`,
          ...newPropPayload,
          coordinates: { lat: 6.4281, lng: 3.4219 },
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
        setProperties([localProp, ...properties]);
      }
    } catch (e) {
      console.error('Create property error:', e);
    } finally {
      setIsModalOpen(false);
      setFormData({
        name: '',
        tagline: 'Refined Sanctuary in Victoria Island',
        address: '25 Adetokunbo Ademola Street, Victoria Island, Lagos',
        city: 'Lagos, Nigeria',
        description: 'An ultra-exclusive collection of luxury suites and dining lounges.',
        heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90',
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
              <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold">
                <Building className="w-4 h-4" />
                <span>Properties</span>
              </Link>
              <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <BedDouble className="w-4 h-4 text-[#C6A15B]" />
                <span>Rooms Inventory</span>
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
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Multi-Hotel Portfolio</span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">Properties Manager</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Property</span>
            </button>
          </div>

          {loadingProps ? (
            <div className="flex items-center justify-center p-12 text-[#C6A15B] gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs uppercase tracking-widest">Loading Live MongoDB Properties...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {properties.map((prop, idx) => (
                <div
                  key={(prop as any)._id || prop.id || prop.slug || `prop-${idx}`}
                  className="p-6 sm:p-8 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900 mb-2">
                    <img src={prop.heroImage} alt={prop.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-white">{prop.name}</h3>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-[10px] uppercase font-bold rounded-full border border-emerald-800 self-start sm:self-auto">
                      Active Atlas Property
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>{prop.address}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">{prop.description}</p>
                  <div className="pt-4 border-t border-[#2C2B29] flex items-center justify-between text-xs">
                    <span className="text-[#C6A15B]">ID: {prop.slug}</span>
                    <Link href={`/properties/${prop.slug}`} className="text-white hover:text-[#C6A15B] underline">
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
            <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
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

                {/* Direct Image File Upload Field */}
                <div className="space-y-2">
                  <label className="text-neutral-300 font-medium block">Property Cover Photo (Direct Image Upload)</label>
                  <div className="p-4 bg-[#1A1918] border-2 border-dashed border-[#2C2B29] hover:border-[#C6A15B] rounded-xl text-center space-y-3 transition-colors relative">
                    {formData.heroImage ? (
                      <div className="relative h-36 rounded-lg overflow-hidden border border-[#C6A15B]">
                        <img src={formData.heroImage} alt="Uploaded Property Preview" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] text-[#C6A15B]">
                          Ready to Publish
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 space-y-2">
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
                    Publish Property Live
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
