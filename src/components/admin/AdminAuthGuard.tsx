'use client';

import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('stayconnect_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'stayconnect1') {
      sessionStorage.setItem('stayconnect_admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Administrator Password. Access Denied.');
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="text-xs uppercase tracking-widest text-[#C6A15B]">Authenticating Admin Session...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-white font-sans flex items-center justify-center p-4">
        <div className="bg-[#1A1918] border border-[#C6A15B]/30 p-8 sm:p-10 rounded-2xl max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] font-serif font-bold flex items-center justify-center text-xl mx-auto">
              SC
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold block">
              Executive PMS Portal
            </span>
            <h1 className="font-serif text-3xl text-white font-normal">Administrator Access</h1>
            <p className="text-xs text-neutral-400 font-light">
              Enter master access key for 14B Providence Street Property Management System.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Admin Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111111] border border-[#2C2B29] focus:border-[#C6A15B] rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl group active:scale-95"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#2C2B29] text-center text-[10px] text-neutral-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>256-Bit Encrypted Admin Session</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
