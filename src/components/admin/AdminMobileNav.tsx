'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BarChart3, Building, BedDouble, RefreshCw, Utensils, Car, Calendar, LogOut, Lock } from 'lucide-react';

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem('stayconnect_admin_auth');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Properties', href: '/admin/properties', icon: Building },
    { name: 'Rooms Inventory', href: '/admin/rooms', icon: BedDouble },
    { name: 'Housekeeping Ops', href: '/admin/housekeeping', icon: RefreshCw },
    { name: 'Dining & Menu', href: '/admin/dining', icon: Utensils },
    { name: 'Fleet Logistics', href: '/admin/fleet', icon: Car },
    { name: 'Reservations CRM', href: '/admin/bookings', icon: Calendar },
  ];

  return (
    <div className="md:hidden border-b border-[#2C2B29] bg-[#111111] px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-xs">
            SC
          </div>
          <div>
            <div className="font-serif text-sm text-white font-medium">Stay Connect</div>
            <div className="text-[9px] text-[#C6A15B] uppercase tracking-widest font-semibold">PMS Portal</div>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-white hover:text-[#C6A15B] focus:outline-none"
          aria-label="Toggle Admin Menu"
        >
          {open ? <X className="w-6 h-6 text-[#C6A15B]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-[#2C2B29] space-y-2 pb-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-colors ${
                  active ? 'bg-[#C6A15B] text-[#111111] font-semibold' : 'text-neutral-300 hover:bg-[#1A1918]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#111111]' : 'text-[#C6A15B]'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#2C2B29] flex flex-col gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-rose-400 px-3.5 py-2 w-full text-left"
            >
              <Lock className="w-4 h-4" />
              <span>Lock & Log Out</span>
            </button>
            <Link href="/" className="flex items-center gap-2 text-xs text-neutral-400 px-3.5 py-2">
              <LogOut className="w-4 h-4" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
