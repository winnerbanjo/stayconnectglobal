"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((j) => setIsAuthenticated(j.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unable to sign in. Please try again.");
      setIsAuthenticated(true);
      setError("");
      window.location.reload();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="text-xs uppercase tracking-widest text-[#0077B6]">
          Authenticating Admin Session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans flex items-center justify-center p-4">
        <div className="bg-slate-50 border border-[#00AEEF]/30 p-8 sm:p-10 rounded-2xl max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF] text-[#0077B6] font-serif font-bold flex items-center justify-center text-xl mx-auto">
              SC
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#0077B6] font-semibold block">
              Executive PMS Portal
            </span>
            <h1 className="font-serif text-3xl text-slate-900 font-normal">
              Administrator Access
            </h1>
            <p className="text-xs text-slate-600 font-light">
              Enter your administrator password to manage Stay Connect.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="admin-password" className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#0077B6]" />
                <span>Admin Password</span>
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#00AEEF] rounded-lg px-4 py-3 text-xs text-slate-900 placeholder-neutral-500 focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 text-rose-700 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#00AEEF] hover:bg-[#0088CC] text-[#111111] font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl group active:scale-95"
            >
              <span>{isSubmitting ? "Signing in…" : "Unlock Admin Panel"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0077B6]" />
            <span>Protected administrator session</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
