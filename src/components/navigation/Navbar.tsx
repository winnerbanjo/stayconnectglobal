'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Phone, MapPin, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Suites', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Offers', href: '/offers' },
  ];

  const propertiesList = [
    { name: 'Stay Connect Lekki (Flagship)', href: '/rooms/saffron', address: '14B Providence St, Lekki Phase 1' },
    { name: 'Stay Connect Ikoyi Residences', href: '/properties/stay-connect-ikoyi-residences', address: '8 Bourdillon Rd, Ikoyi' },
  ];

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#111111]/95 backdrop-blur-xl border-b border-[#2C2B29] py-3 sm:py-4 shadow-2xl'
            : isHome
            ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-6'
            : 'bg-[#111111] py-4 sm:py-5 border-b border-[#2C2B29]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Bigger Logo */}
          <Link href="/" className="group flex items-center shrink-0">
            <div className="relative h-11 sm:h-14 md:h-16 w-44 sm:w-56 md:w-64 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Stay Connect Hotels Logo"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {/* Property Selector */}
            <div className="relative">
              <button
                onClick={() => setPropertiesOpen(!propertiesOpen)}
                onBlur={() => setTimeout(() => setPropertiesOpen(false), 200)}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] hover:text-white transition-colors font-medium py-2"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Properties</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${propertiesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {propertiesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-80 bg-[#1A1918] border border-[#2C2B29] rounded-xl shadow-2xl p-4 mt-3 z-50"
                  >
                    <div className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 px-3 py-1.5 font-semibold border-b border-[#2C2B29] mb-2">
                      Hotel Locations
                    </div>
                    {propertiesList.map((prop, i) => (
                      <Link
                        key={i}
                        href={prop.href}
                        className="block px-3 py-3 rounded-lg hover:bg-[#252422] transition-colors group"
                      >
                        <div className="text-xs font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                          {prop.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-light mt-0.5">{prop.address}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-px bg-[#2C2B29]" />

            {/* Nav Items */}
            <div className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 font-medium py-1 ${
                      active ? 'text-[#C6A15B]' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A15B]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+2347041008351"
              className="text-[11px] tracking-[0.2em] text-neutral-300 hover:text-[#C6A15B] transition-colors flex items-center gap-2 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="hidden xl:inline">+234 704 100 8351</span>
            </a>

            <Link
              href="/book"
              className="relative inline-flex items-center gap-2 px-5 py-3 rounded border border-[#C6A15B] text-[11px] uppercase tracking-[0.25em] font-medium text-white hover:bg-[#C6A15B] hover:text-[#111111] transition-all duration-300 group shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C6A15B] group-hover:text-[#111111] transition-colors" />
              <span>Book Your Stay</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C6A15B] transition-colors focus:outline-none shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7 text-[#C6A15B]" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#111111] pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                <div className="relative h-10 w-44">
                  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain filter brightness-110" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">Directory</span>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl text-white hover:text-[#C6A15B] transition-colors py-1 border-b border-[#2C2B29]/40"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2">
                <div className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold mb-3">
                  Flagship Executive Suite
                </div>
                <Link
                  href="/rooms/saffron"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-4 rounded-xl bg-[#1A1918] border border-[#2C2B29]"
                >
                  <div className="text-white font-serif text-lg">Saffron Suite (Executive Single Room)</div>
                  <div className="text-xs text-neutral-400 mt-1">14B Providence St, Lekki, Lagos</div>
                  <div className="text-xs text-[#C6A15B] mt-2 font-medium">Explore Room Specs & Book →</div>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2C2B29] flex flex-col gap-3">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
              >
                Book Your Stay Online
              </Link>
              <a
                href="https://wa.me/2347041008351"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded border border-[#C6A15B] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-transform"
              >
                Chat Concierge (+234 704 100 8351)
              </a>
              <div className="text-center text-[10px] text-neutral-500 tracking-wider font-light mt-1">
                14B Providence Street, Lekki Phase 1, Lagos, Nigeria
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
