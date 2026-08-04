'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, MapPin, ChevronDown, Sun, Moon, Car, Plane, ConciergeBell, Compass, Gift, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [mobilityOpen, setMobilityOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);

  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF9F6]/95 dark:bg-[#111111]/95 backdrop-blur-xl border-b border-[#E8E5DF] dark:border-[#2C2B29] py-3 sm:py-4 shadow-xl'
            : isHome
            ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5'
            : 'bg-[#FAF9F6] dark:bg-[#111111] py-4 sm:py-5 border-b border-[#E8E5DF] dark:border-[#2C2B29]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center shrink-0">
            <div className="relative h-10 sm:h-12 w-40 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Stay Connect Global Logo"
                className={`w-full h-full object-contain ${
                  !scrolled && isHome ? 'filter brightness-110' : 'dark:filter dark:brightness-110'
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation - 3 Streamlined Luxury Dropdowns */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {/* Dropdown 1: Stay Collection */}
            <div className="relative">
              <button
                onClick={() => {
                  setCollectionOpen(!collectionOpen);
                  setMobilityOpen(false);
                  setExperiencesOpen(false);
                }}
                onBlur={() => setTimeout(() => setCollectionOpen(false), 200)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition-colors ${
                  !scrolled && isHome
                    ? 'text-white hover:text-[#C6A15B]'
                    : 'text-neutral-800 dark:text-neutral-200 hover:text-[#C6A15B]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Collection</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${collectionOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {collectionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-72 bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-2xl shadow-2xl p-3 mt-2 z-50"
                  >
                    <div className="text-[9px] uppercase tracking-widest text-neutral-400 px-3 py-1 font-bold">
                      Accommodation Types
                    </div>
                    {[
                      { name: 'Luxury Hotels', href: '/rooms?category=Luxury+Hotel', desc: 'Directly operated flagships' },
                      { name: 'Serviced Apartments', href: '/rooms?category=Serviced+Apartment', desc: 'Short & extended stays' },
                      { name: 'Luxury Residences', href: '/rooms?category=Luxury+Residence', desc: 'Penthouses & private homes' },
                      { name: 'Browse All Stays', href: '/rooms', desc: 'View complete collection' },
                    ].map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-3 py-2.5 rounded-xl hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                      >
                        <div className="text-xs font-semibold text-[#111111] dark:text-white hover:text-[#C6A15B]">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 font-light">{item.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 2: Mobility & Transfers */}
            <div className="relative">
              <button
                onClick={() => {
                  setMobilityOpen(!mobilityOpen);
                  setCollectionOpen(false);
                  setExperiencesOpen(false);
                }}
                onBlur={() => setTimeout(() => setMobilityOpen(false), 200)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition-colors ${
                  !scrolled && isHome
                    ? 'text-white hover:text-[#C6A15B]'
                    : 'text-neutral-800 dark:text-neutral-200 hover:text-[#C6A15B]'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Mobility</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${mobilityOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mobilityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-72 bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-2xl shadow-2xl p-3 mt-2 z-50"
                  >
                    <div className="text-[9px] uppercase tracking-widest text-neutral-400 px-3 py-1 font-bold">
                      Executive Chauffeur Logistics
                    </div>
                    {[
                      { name: 'Chauffeur & Car Rentals', href: '/car-rentals', desc: 'Range Rovers, G-Wagons & Maybachs', icon: Car },
                      { name: 'Airport VIP Transfers', href: '/transfers', desc: 'MMIA & ABV tarmac escorts', icon: Plane },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          href={item.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                        >
                          <Icon className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-[#111111] dark:text-white">{item.name}</div>
                            <div className="text-[11px] text-neutral-500 font-light">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 3: Experiences & Services */}
            <div className="relative">
              <button
                onClick={() => {
                  setExperiencesOpen(!experiencesOpen);
                  setCollectionOpen(false);
                  setMobilityOpen(false);
                }}
                onBlur={() => setTimeout(() => setExperiencesOpen(false), 200)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition-colors ${
                  !scrolled && isHome
                    ? 'text-white hover:text-[#C6A15B]'
                    : 'text-neutral-800 dark:text-neutral-200 hover:text-[#C6A15B]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Experiences & Network</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${experiencesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {experiencesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-80 bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-2xl shadow-2xl p-3 mt-2 z-50"
                  >
                    <div className="text-[9px] uppercase tracking-widest text-neutral-400 px-3 py-1 font-bold">
                      Concierge & Ecosystem
                    </div>
                    {[
                      { name: 'Concierge Services', href: '/concierge', desc: 'Private chefs, VIP security & dining', icon: ConciergeBell },
                      { name: 'Curated Experiences', href: '/experiences', desc: 'Private yacht cruises & spa packages', icon: Compass },
                      { name: 'Stay & Drive Packages', href: '/packages', desc: 'Bundled accommodation & mobility', icon: Gift },
                      { name: 'Hospitality Network', href: '/network', desc: 'Partner ecosystem & multi-city stays', icon: Globe },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          href={item.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                        >
                          <Icon className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-[#111111] dark:text-white">{item.name}</div>
                            <div className="text-[11px] text-neutral-500 font-light">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold text-xs transition-all duration-300 shadow-sm ${
                !scrolled && isHome
                  ? 'border-white/40 text-white bg-black/40 hover:bg-black/60'
                  : 'border-[#C6A15B]/50 bg-white dark:bg-[#1A1918] text-[#111111] dark:text-white hover:border-[#C6A15B]'
              }`}
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span className="uppercase tracking-wider">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span className="uppercase tracking-wider text-[#C6A15B]">Dark</span>
                </>
              )}
            </button>

            {/* List Property */}
            <Link
              href="/list-your-property"
              className={`text-xs uppercase tracking-wider font-bold py-2 px-3.5 border rounded-xl transition-all ${
                !scrolled && isHome
                  ? 'border-white/40 text-white hover:border-[#C6A15B] hover:text-[#C6A15B]'
                  : 'border-[#E8E5DF] dark:border-[#2C2B29] text-neutral-800 dark:text-neutral-200 hover:border-[#C6A15B] hover:text-[#C6A15B]'
              }`}
            >
              List Property
            </Link>

            {/* Explore Stays */}
            <Link
              href="/rooms"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C6A15B] text-xs uppercase tracking-wider font-bold text-[#111111] hover:bg-[#d8b46e] transition-all shadow-md group shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#111111]" />
              <span>Explore Stays</span>
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#2C2B29] pb-4">
                <div className="relative h-10 w-44">
                  <img src="/images/logo.png" alt="Stay Connect Global Logo" className="w-full h-full object-contain filter brightness-110" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">Global Platform</span>
              </div>

              {[
                { name: 'Places to Stay', href: '/rooms' },
                { name: 'Car Rentals & Mobility', href: '/car-rentals' },
                { name: 'Airport VIP Transfers', href: '/transfers' },
                { name: 'Concierge Services', href: '/concierge' },
                { name: 'Curated Experiences', href: '/experiences' },
                { name: 'Stay & Mobility Packages', href: '/packages' },
                { name: 'Hospitality Network', href: '/network' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-xl text-white hover:text-[#C6A15B] transition-colors py-1.5 border-b border-[#2C2B29]/40"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  href="/list-your-property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-4 rounded-xl bg-[#1A1918] border border-[#C6A15B]/50 hover:border-[#C6A15B]"
                >
                  <div className="text-[#C6A15B] font-serif text-lg">List Your Property</div>
                  <div className="text-xs text-neutral-400 mt-1">Join Stay Connect Global as a partner & host guests.</div>
                  <div className="text-xs text-white mt-2 font-medium">Get Started →</div>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2C2B29] flex flex-col gap-3">
              <Link
                href="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded bg-[#C6A15B] text-[#111111] font-semibold text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
              >
                Explore Stays
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
