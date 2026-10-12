"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Globe,
  Menu,
  Sun,
  Moon,
  Building2,
  Car,
  Compass,
  ConciergeBell,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  X,
  ShieldCheck,
  Zap,
  Phone,
  Crown,
  Ship,
  SlidersHorizontal,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface AirbnbHeaderProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  onSearch: (params: { location: string; checkIn: string; checkOut: string; guests: number }) => void;
}

export default function AirbnbHeader({
  activeCategory,
  onSelectCategory,
  selectedLocation,
  onSelectLocation,
  onSearch,
}: AirbnbHeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"where" | "when" | "who">("where");
  const [locationInput, setLocationInput] = useState(selectedLocation || "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  // User menu state
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click for desktop
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node) &&
        window.innerWidth >= 640
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile search modal is open
  useEffect(() => {
    if (searchOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const handleExecuteSearch = () => {
    onSearch({
      location: locationInput,
      checkIn,
      checkOut,
      guests: guestCount,
    });
    setSearchOpen(false);
  };

  const handleSelectQuickLocation = (loc: string) => {
    const val = loc === "all" ? "" : loc;
    setLocationInput(val);
    onSelectLocation(val);
    setActiveTab("when");
  };

  const quickLocations = [
    { name: "All Lagos & Abuja", sub: "Browse all locations", value: "" },
    { name: "Banana Island", sub: "Billionaire Row & Waterfront", value: "Banana Island" },
    { name: "Ikoyi", sub: "Diplomatic Residences", value: "Ikoyi" },
    { name: "Lekki Phase 1", sub: "Lifestyle, Beach & Cafes", value: "Lekki" },
    { name: "Victoria Island", sub: "Financial District Stays", value: "Victoria Island" },
    { name: "Abuja", sub: "Maitama & Asokoro", value: "Abuja" },
  ];

  const categories = [
    { id: "all", label: "Curated Stays", icon: Sparkles },
    { id: "homes", label: "Residences", icon: Building2 },
    { id: "experiences", label: "Yacht & Tours", icon: Ship },
    { id: "services", label: "Concierge", icon: ConciergeBell },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-[#E8E5DF] dark:border-[#2C2B29] transition-colors duration-200 shadow-sm">
      {/* BRAND SPIRIT TICKER (Desktop & Tablet) */}
      <div className="bg-[#111111] text-white py-1.5 px-4 text-center border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] uppercase tracking-widest font-medium">
          <div className="flex items-center gap-2 text-[#00AEEF]">
            <Crown className="w-3.5 h-3.5" />
            <span>Stay Connect Global Ecosystem</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#00AEEF]" />
              Guaranteed 24/7 Power
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#00AEEF]" />
              Protocol & Armed Escort
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Car className="w-3 h-3 text-[#00AEEF]" />
              Chauffeur on Request
            </span>
          </div>
          <a
            href="https://wa.me/2349042854834"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00AEEF] hover:underline flex items-center gap-1 font-semibold"
          >
            <Phone className="w-3 h-3" />
            <span>VIP Hotline: +234 904 285 4834</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* ROW 1: TOP BAR (Logo with Dark Contrast Background | Category Tabs | User Menu) */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* BRAND LOGO WITH DARK CONTRAST BACKGROUND */}
          <Link href="/" className="shrink-0 flex items-center group">
            <div className="relative h-9 sm:h-11 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#111111] border border-black/20 dark:border-white/10 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Stay Connect Global Logo"
                className="max-h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP CATEGORY TABS */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            {categories.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectCategory(tab.id)}
                  className={`relative flex items-center gap-2 py-2 text-sm font-medium transition-all group ${
                    isActive
                      ? "text-neutral-900 dark:text-white font-bold"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive
                        ? "text-[#00AEEF]"
                        : "text-neutral-500 dark:text-neutral-400 group-hover:text-[#00AEEF]"
                    }`}
                  />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-[22px] left-0 right-0 h-[2.5px] bg-[#00AEEF] rounded-full shadow-[0_0_8px_rgba(0,174,239,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center gap-2 shrink-0">
            {/* List Property / Host Button (Desktop only) */}
            <Link
              href="/list-your-property"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-[#FAF9F6] dark:hover:bg-[#1E1D1B] border border-transparent hover:border-[#00AEEF]/30 px-3.5 py-2 rounded-full transition-all"
            >
              <span>List Property</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
            </Link>

            {/* Quick WhatsApp button for mobile & desktop */}
            <a
              href="https://wa.me/2349042854834"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Concierge"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/30 flex items-center gap-1.5 hover:bg-[#00AEEF]/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Concierge
              </span>
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-neutral-700 hover:text-[#00AEEF]" />
              ) : (
                <Sun className="w-4 h-4 text-[#00AEEF]" />
              )}
            </button>

            {/* USER PROFILE MENU BUTTON */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 sm:gap-3 border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#00AEEF] rounded-full py-1 sm:py-1.5 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 hover:shadow-md transition-all bg-white dark:bg-[#1A1918]"
              >
                <Menu className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#111111] to-[#00AEEF] text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm">
                  SC
                </div>
              </button>

              {/* DROPDOWN MENU */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 max-w-[90vw] bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-left divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="px-4 py-3">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#00AEEF]">
                      Stay Connect Global
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Luxury hospitality, private residences & mobility
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Admin Portal
                    </Link>
                    <Link
                      href="/partner"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Partner Workspace
                    </Link>
                    <Link
                      href="/list-your-property"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      List Your Residence
                    </Link>
                    <Link
                      href="/booking-status"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Track Reservation Status
                    </Link>
                  </div>

                  <div className="py-1">
                    <a
                      href="https://wa.me/2349042854834?text=Hello%2C%20I%20would%20like%20to%20request%20executive%20chauffeur%20car%20rental%20services%20(Range%20Rover%20%2F%20G-Wagon)"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Chauffeur Fleet (Request on WhatsApp)
                    </a>
                    <Link
                      href="/transfers"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Airport VIP Tarmac Transfers
                    </Link>
                    <Link
                      href="/experiences"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Yacht Charters & Private Island Cruises
                    </Link>
                    <Link
                      href="/concierge"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-[#FAF9F6] dark:hover:bg-[#252422] transition-colors"
                    >
                      Private Chefs & Protocol Security
                    </Link>
                  </div>

                  <div className="px-4 py-2.5 bg-neutral-50 dark:bg-[#141414]">
                    <a
                      href="https://wa.me/2349042854834"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00AEEF] font-semibold flex items-center gap-1.5 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Support: +234 904 285 4834</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ROW 2: SEARCH PILL (Responsive Desktop Pill + Mobile Touch Pill) */}
        <div className="pb-3 sm:pb-5 pt-0.5 sm:pt-1 relative" ref={searchBarRef}>
          {/* MOBILE SEARCH PILL (< 640px) */}
          <div className="sm:hidden w-full">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setActiveTab("where");
              }}
              className="w-full flex items-center justify-between rounded-full border border-[#E8E5DF] dark:border-[#2C2B29] shadow-md bg-white dark:bg-[#1A1918] p-2 hover:border-[#00AEEF]/50 transition-all text-left"
            >
              <div className="flex items-center gap-3 pl-1 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-[#00AEEF] text-[#111111] flex items-center justify-center shrink-0 shadow-sm font-bold">
                  <Search className="w-4 h-4 stroke-[2.8]" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {locationInput || "Where to in Nigeria?"}
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    {checkIn ? `${checkIn} · ${guestCount} Guests` : "Banana Island · Ikoyi · Lekki · 24/7 Power"}
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 shrink-0 ml-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* DESKTOP SEARCH PILL (>= 640px) */}
          <div className="hidden sm:block max-w-2xl sm:max-w-3xl mx-auto">
            <div
              onClick={() => setSearchOpen(true)}
              className="flex items-center rounded-full border border-[#E8E5DF] dark:border-[#2C2B29] shadow-md hover:shadow-xl hover:border-[#00AEEF]/50 transition-all duration-300 bg-white dark:bg-[#1A1918] p-1.5 cursor-pointer divide-x divide-neutral-200 dark:divide-neutral-800"
            >
              {/* WHERE */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("where");
                  setSearchOpen(true);
                }}
                className={`flex-1 text-left px-4 sm:px-6 py-2 rounded-full transition-colors ${
                  searchOpen && activeTab === "where"
                    ? "bg-[#FAF9F6] dark:bg-[#252422]"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                }`}
              >
                <div className="text-[11px] sm:text-[12px] font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#00AEEF]" />
                  <span>Where</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 truncate font-medium">
                  {locationInput || "Lekki, Banana Island, Ikoyi..."}
                </div>
              </button>

              {/* WHEN */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("when");
                  setSearchOpen(true);
                }}
                className={`flex-1 text-left px-4 sm:px-6 py-2 rounded-full transition-colors ${
                  searchOpen && activeTab === "when"
                    ? "bg-[#FAF9F6] dark:bg-[#252422]"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                }`}
              >
                <div className="text-[11px] sm:text-[12px] font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#00AEEF]" />
                  <span>When</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 truncate font-medium">
                  {checkIn && checkOut ? `${checkIn} → ${checkOut}` : "Choose dates"}
                </div>
              </button>

              {/* WHO */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("who");
                  setSearchOpen(true);
                }}
                className={`flex-1 text-left px-4 sm:px-6 py-2 rounded-full transition-colors ${
                  searchOpen && activeTab === "who"
                    ? "bg-[#FAF9F6] dark:bg-[#252422]"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                }`}
              >
                <div className="text-[11px] sm:text-[12px] font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#00AEEF]" />
                  <span>Who</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 truncate font-medium">
                  {guestCount > 1 ? `${guestCount} Guests` : "Add guests"}
                </div>
              </button>

              {/* SEARCH BUTTON */}
              <div className="pl-2 pr-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExecuteSearch();
                  }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#00AEEF] hover:bg-[#0090C8] text-[#111111] flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(0,174,239,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold"
                  aria-label="Search stays"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE CATEGORY SCROLLER (< 768px) */}
          <div className="md:hidden pt-2 pb-1 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-4 px-1 min-w-max">
              {categories.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectCategory(tab.id)}
                    className={`flex items-center gap-1.5 pb-1.5 text-xs font-semibold transition-all relative ${
                      isActive
                        ? "text-[#00AEEF]"
                        : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00AEEF] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEARCH MODAL (Full-screen on Mobile, Popover on Desktop) */}
          {searchOpen && (
            <>
              {/* MOBILE FULL-SCREEN MODAL */}
              <div className="sm:hidden fixed inset-0 z-50 bg-white dark:bg-[#121212] flex flex-col p-4 overflow-y-auto animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    aria-label="Close search"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="text-sm font-bold text-[#00AEEF] uppercase tracking-wider">
                    Find Your Stay
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLocationInput("");
                      setCheckIn("");
                      setCheckOut("");
                      setGuestCount(1);
                      onSelectLocation("");
                    }}
                    className="text-xs font-semibold text-neutral-500 underline"
                  >
                    Reset
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 py-4 space-y-6">
                  {/* Location Section */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />
                      <span>Where to in Nigeria?</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickLocations.map((loc) => (
                        <button
                          key={loc.name}
                          type="button"
                          onClick={() => {
                            const val = loc.value;
                            setLocationInput(val);
                            onSelectLocation(val);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            locationInput === loc.value
                              ? "border-[#00AEEF] bg-[#00AEEF]/10 text-neutral-900 dark:text-white ring-1 ring-[#00AEEF]"
                              : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          <div className="font-bold text-xs">{loc.name}</div>
                          <div className="text-[10px] text-neutral-400 truncate mt-0.5">{loc.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Pickers */}
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00AEEF]" />
                      <span>When are you staying?</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guest Controls */}
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#00AEEF]" />
                        <span>Guests</span>
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Serviced residence capacity
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm w-4 text-center">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Sticky Action Button */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 pb-2">
                  <button
                    type="button"
                    onClick={handleExecuteSearch}
                    className="w-full py-3.5 rounded-2xl bg-[#00AEEF] hover:bg-[#0090C8] text-[#111111] font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Search className="w-4 h-4 stroke-[2.8]" />
                    <span>Search Stays</span>
                  </button>
                </div>
              </div>

              {/* DESKTOP POPOVER MODAL (>= 640px) */}
              <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-full mt-3 w-full max-w-2xl bg-white dark:bg-[#1A1918] border border-[#E8E5DF] dark:border-[#2C2B29] rounded-3xl shadow-2xl p-5 sm:p-6 z-50 animate-fade-in">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#00AEEF]">
                      Curated Stay Finder
                    </span>
                    <span className="text-[11px] text-neutral-400">· 100% 24/7 Power Guaranteed</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* TAB 1: WHERE */}
                {activeTab === "where" && (
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Select Elite Hotspot
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {quickLocations.map((loc) => (
                        <button
                          key={loc.name}
                          type="button"
                          onClick={() => handleSelectQuickLocation(loc.value)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            locationInput === loc.value
                              ? "border-[#00AEEF] bg-[#00AEEF]/10 text-neutral-900 dark:text-white shadow-sm ring-1 ring-[#00AEEF]"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-[#00AEEF]/50 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          <MapPin className="w-4 h-4 text-[#00AEEF] mb-1.5" />
                          <div className="font-bold text-xs">{loc.name}</div>
                          <div className="text-[10px] text-neutral-400 truncate mt-0.5">{loc.sub}</div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                        Or search by street / property name
                      </label>
                      <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="e.g. Banana Island Road, Providence St Lekki, Ikoyi..."
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: WHEN */}
                {activeTab === "when" && (
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Reservation Dates
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm focus:border-[#00AEEF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm focus:border-[#00AEEF]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: WHO */}
                {activeTab === "who" && (
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Guest Capacity
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800">
                      <div>
                        <div className="font-semibold text-sm text-neutral-900 dark:text-white">
                          Guests
                        </div>
                        <div className="text-xs text-neutral-500">
                          Serviced residence capacity
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold hover:border-[#00AEEF] hover:text-[#00AEEF]"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm w-4 text-center">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(guestCount + 1)}
                          className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold hover:border-[#00AEEF] hover:text-[#00AEEF]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ACTION FOOTER */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => {
                      setLocationInput("");
                      setCheckIn("");
                      setCheckOut("");
                      setGuestCount(1);
                      onSelectLocation("");
                    }}
                    className="text-xs font-semibold underline text-neutral-600 dark:text-neutral-400 hover:text-[#00AEEF]"
                  >
                    Clear all
                  </button>

                  <div className="flex items-center gap-2">
                    {activeTab !== "where" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(activeTab === "who" ? "when" : "where")
                        }
                        className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400"
                      >
                        Back
                      </button>
                    )}
                    {activeTab !== "who" ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(activeTab === "where" ? "when" : "who")
                        }
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#111111] dark:bg-white text-white dark:text-black hover:opacity-90 transition"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleExecuteSearch}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00AEEF] hover:bg-[#0090C8] text-[#111111] shadow-lg shadow-[#00AEEF]/20 transition"
                      >
                        <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Explore Stays</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
