'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Utensils, Plus, CheckCircle, BarChart3, Building, BedDouble, Calendar, Car, RefreshCw, LogOut, X, Wine } from 'lucide-react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

interface MenuItem {
  id: string;
  name: string;
  category: 'Fine Dining' | 'Breakfast' | 'Room Service Bar' | 'Artisanal Cocktails';
  price: number;
  description: string;
  available: boolean;
}

export default function AdminDiningPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 'm-1',
      name: 'Pan-Seared Atlantic Seabass & Yam Fondant',
      category: 'Fine Dining',
      price: 32000,
      description: 'Fresh Atlantic seabass served with grilled asparagus and saffron reduction.',
      available: true,
    },
    {
      id: 'm-2',
      name: 'Lekki Royal Champagne High Tea Experience',
      category: 'Breakfast',
      price: 45000,
      description: 'Artisanal pastries, caviar tartlets, and chilled Moët & Chandon champagne.',
      available: true,
    },
    {
      id: 'm-3',
      name: 'Aura Signature Smoked Hibiscus Old Fashioned',
      category: 'Artisanal Cocktails',
      price: 18000,
      description: 'Single malt scotch infused with Nigerian Zobo spices and Angostura bitters.',
      available: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Fine Dining',
    price: 25000,
    description: '',
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MenuItem = {
      id: `m-${Date.now()}`,
      name: newItem.name,
      category: newItem.category as any,
      price: Number(newItem.price),
      description: newItem.description || 'Special Chef creation.',
      available: true,
    };
    setMenuItems([created, ...menuItems]);
    setIsModalOpen(false);
    setNewItem({
      name: '',
      category: 'Fine Dining',
      price: 25000,
      description: '',
    });
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
                <div className="text-[10px] text-[#C6A15B] uppercase tracking-widest font-semibold">PMS Operations</div>
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
              <Link href="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <BedDouble className="w-4 h-4 text-[#C6A15B]" />
                <span>Rooms Inventory</span>
              </Link>
              <Link href="/admin/housekeeping" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1918]">
                <RefreshCw className="w-4 h-4 text-[#C6A15B]" />
                <span>Housekeeping Ops</span>
              </Link>
              <Link href="/admin/dining" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C6A15B] text-[#111111] font-semibold">
                <Utensils className="w-4 h-4" />
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
        <main className="flex-1 p-4 sm:p-8 lg:p-12 space-y-8 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2B29] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">Gastronomy & Bar</span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">Aura Fine Dining & Room Service Menu</h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Menu Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="p-6 bg-[#1A1918] border border-[#2C2B29] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#C6A15B] uppercase font-semibold">{item.category}</span>
                  <span className="font-serif text-lg font-bold text-white">₦{item.price.toLocaleString()}</span>
                </div>
                <h3 className="font-serif text-xl text-white">{item.name}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.description}</p>
                <div className="pt-3 border-t border-[#2C2B29] text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Available in Room Service & Lounge
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                <h3 className="font-serif text-2xl text-white">Add Culinary Dish / Cocktail</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-300 font-medium">Dish / Cocktail Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grilled Jumbo Prawns with Jollof Risotto"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-medium">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    >
                      <option value="Fine Dining">Fine Dining</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Room Service Bar">Room Service Bar</option>
                      <option value="Artisanal Cocktails">Artisanal Cocktails</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-300 font-medium">Price (₦)</label>
                    <input
                      type="number"
                      required
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                      className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-medium">Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ingredients and culinary presentation..."
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="w-full bg-[#1A1918] border border-[#2C2B29] rounded-lg px-3.5 py-2.5 text-white mt-1"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2C2B29]">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-neutral-400 hover:text-white">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-[#C6A15B] text-[#111111] font-semibold uppercase tracking-widest rounded-lg">
                    Save Dish to Menu
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
