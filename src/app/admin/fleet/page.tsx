'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, Plus, CheckCircle, BarChart3, Building, BedDouble, Calendar, LogOut, X, Anchor, Shield } from 'lucide-react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  driverName: string;
  dailyRate: number;
  status: 'Available' | 'On Chauffeur Duty' | 'Maintenance';
  image: string;
}

export default function AdminFleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'car-1',
      name: 'Range Rover Autograph Long Wheelbase',
      category: 'VIP Chauffeur & Airport Escort',
      driverName: 'Mr. Emmanuel Okafor',
      dailyRate: 150000,
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=90',
    },
    {
      id: 'car-2',
      name: 'Mercedes-Benz S-Class (Maybach Executive)',
      category: 'Presidential Suite Chauffeur',
      driverName: 'Mr. Tunde Bakare',
      dailyRate: 200000,
      status: 'On Chauffeur Duty',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90',
    },
    {
      id: 'boat-3',
      name: '65-Foot Sunseeker Luxury Private Yacht',
      category: 'Lagos Lagoon & Ocean Cruise',
      driverName: 'Captain Segun Lawson',
      dailyRate: 850000,
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=90',
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    category: 'VIP Airport Chauffeur',
    driverName: '',
    dailyRate: 150000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=90',
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Vehicle = {
      id: `car-${Date.now()}`,
      name: newVehicle.name,
      category: newVehicle.category,
      driverName: newVehicle.driverName || 'Stay Connect Concierge Driver',
      dailyRate: Number(newVehicle.dailyRate),
      status: 'Available',
      image: newVehicle.image,
    };
    setVehicles([created, ...vehicles]);
    setIsModalOpen(false);
    setNewVehicle({
      name: '',
      category: 'VIP Airport Chauffeur',
      driverName: '',
      dailyRate: 150000,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=90',
    });
  };

  return (
    <AdminAuthGuard>
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
                <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest font-semibold">Admin Fleet Panel</div>
              </div>
            </div>

            <nav className="space-y-2">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
                <BarChart3 className="w-4 h-4 text-[#C6A15B]" />
                <span>PMS Dashboard</span>
              </Link>
              <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
                <Building className="w-4 h-4 text-[#C6A15B]" />
                <span>Properties</span>
              </Link>
              <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918] transition-colors text-xs uppercase tracking-widest font-medium">
                <BedDouble className="w-4 h-4 text-[#C6A15B]" />
                <span>Rooms Inventory</span>
              </Link>
              <Link href="/admin/fleet" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest">
                <Car className="w-4 h-4" />
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
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Chauffeur & Yacht Concierge</span>
              <h1 className="font-serif text-3xl text-white font-normal mt-1">Fleet & Luxury Vehicle Manager</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Vehicle / Yacht</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((v) => (
              <div key={v.id} className="bg-[#1A1918] border border-[#2C2B29] rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
                <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#C6A15B] uppercase font-semibold">{v.category}</span>
                  <h3 className="font-serif text-xl text-white">{v.name}</h3>
                  <div className="text-xs text-neutral-400">Driver: {v.driverName}</div>
                </div>

                <div className="pt-3 border-t border-[#2C2B29] flex items-center justify-between text-xs">
                  <span className="font-serif text-base font-bold text-white">₦{v.dailyRate.toLocaleString()} / day</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                    v.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {v.status}
                  </span>
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
                <h3 className="font-serif text-2xl text-white">Add Luxury Fleet Vehicle</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddVehicle} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-300 font-medium">Vehicle / Yacht Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cadillac Escalade ESV Platinum"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Driver Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Chidi Nnamdi"
                      value={newVehicle.driverName}
                      onChange={(e) => setNewVehicle({ ...newVehicle, driverName: e.target.value })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Daily Rate (₦)</label>
                    <input
                      type="number"
                      required
                      value={newVehicle.dailyRate}
                      onChange={(e) => setNewVehicle({ ...newVehicle, dailyRate: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-medium">Vehicle Image URL</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.image}
                    onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2C2B29]">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-neutral-400 hover:text-white">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold uppercase tracking-widest rounded-lg">
                    Save Vehicle
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
