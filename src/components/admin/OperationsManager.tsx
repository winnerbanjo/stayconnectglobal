"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminAuthGuard from "./AdminAuthGuard";
import AdminMobileNav from "./AdminMobileNav";

type Section = "fleet" | "dining" | "housekeeping";
type Field = { key: string; label: string; type?: string; choices?: string[]; optional?: boolean };
const configuration: Record<Section, { title: string; fields: Field[]; defaults: Record<string, any> }> = {
  fleet: { title: "Fleet Logistics", defaults: { name: "", category: "", driverName: "", dailyRate: "", image: "", status: "Available" }, fields: [
    { key: "name", label: "Vehicle or yacht name" }, { key: "category", label: "Category" }, { key: "driverName", label: "Driver / captain" },
    { key: "dailyRate", label: "Daily rate (₦)", type: "number" }, { key: "image", label: "Vehicle image URL", type: "url" },
    { key: "status", label: "Status", choices: ["Available", "On Chauffeur Duty", "Maintenance"] },
  ] },
  dining: { title: "Dining & Menu", defaults: { name: "", category: "Fine Dining", price: "", description: "", available: true }, fields: [
    { key: "name", label: "Menu item" }, { key: "category", label: "Category", choices: ["Fine Dining", "Breakfast", "Room Service Bar", "Artisanal Cocktails"] },
    { key: "price", label: "Price (₦)", type: "number" }, { key: "description", label: "Description", optional: true }, { key: "available", label: "Available", type: "checkbox" },
  ] },
  housekeeping: { title: "Housekeeping", defaults: { roomId: "", unit: "", assignedHousekeeper: "", cleaningStatus: "Not inspected" }, fields: [
    { key: "roomId", label: "Room type", type: "room" }, { key: "unit", label: "Unit / room number" }, { key: "assignedHousekeeper", label: "Assigned housekeeper", optional: true },
    { key: "cleaningStatus", label: "Cleaning status", choices: ["Not inspected", "Clean & Inspected", "Turnover In Progress", "Dirty / Needs Cleaning", "Out of Service"] },
  ] },
};
const links = [["", "Dashboard"], ["properties", "Properties"], ["rooms", "Rooms"], ["bookings", "Reservations"], ["housekeeping", "Housekeeping"], ["dining", "Dining"], ["fleet", "Fleet"]];
export default function OperationsManager({ section }: { section: Section }) {
  return <AdminAuthGuard><OperationsContent section={section} /></AdminAuthGuard>;
}
function OperationsContent({ section }: { section: Section }) {
  const config = configuration[section];
  const [records, setRecords] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, any> | null>(null);
  async function load() {
    setLoading(true); setError("");
    try {
      const urls = [`/api/admin/operations/${section}`, ...(section === "housekeeping" ? ["/api/rooms?manage=true"] : [])];
      const data = await Promise.all(urls.map(async url => {
        const res = await fetch(url, { cache: "no-store" }); const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Unable to load saved records"); return json.data;
      }));
      setRecords(data[0]); if (data[1]) setRooms(data[1]);
    } catch (e: any) { setError(e.message); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [section]);
  async function remove(id: string) {
    if (!window.confirm("Delete this saved record?")) return;
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/admin/operations/${section}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const json = await res.json(); if (!res.ok) throw new Error(json.error || "Unable to delete record");
      setRecords(prev => prev.filter(record => record.id !== id));
      if (form?.id === id) setForm(null);
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (!form || saving) return;
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/admin/operations/${section}`, { method: form.id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json(); if (!res.ok) throw new Error(json.error || "Record was not saved");
      setRecords(prev => form.id ? prev.map(r => r.id === form.id ? json.data : r) : [json.data, ...prev]);
      setForm(null);
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }
  return <div className="min-h-screen bg-white text-slate-900">
    <AdminMobileNav />
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-8 space-y-8">
      <nav className="flex flex-wrap gap-4 text-sm text-[#0077B6]" aria-label="Admin navigation">{links.map(([path, label]) => <Link key={path} href={`/admin${path ? `/${path}` : ""}`} aria-current={path === section ? "page" : undefined}>{label}</Link>)}</nav>
      <header className="flex items-center justify-between gap-4"><h1 className="font-serif text-3xl">{config.title}</h1><button disabled={loading || saving} onClick={() => { setError(""); setForm({ ...config.defaults }); }} className="bg-[#00AEEF] text-black rounded-lg px-5 py-3">Add record</button></header>
      {error && <div role="alert" className="text-rose-700 border border-rose-200 rounded-lg p-4">{error} {!form && <button onClick={load} className="underline ml-4">Retry</button>}</div>}
      {loading ? <p role="status">Loading saved records…</p> : records.length === 0 ? <p className="text-slate-600">No saved records yet. Add your first {section === "fleet" ? "vehicle" : section === "dining" ? "menu item" : "room cleaning record"}.</p> : <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{records.map(record => <article key={record.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
        {config.fields.map(field => <div key={field.key}><div className="text-xs text-slate-600">{field.label}</div><div className="break-words">{field.type === "checkbox" ? record[field.key] ? "Yes" : "No" : field.type === "room" ? rooms.find(room => room.id === record.roomId)?.name || "Room no longer available" : field.type === "number" ? `₦${Number(record[field.key]).toLocaleString()}` : record[field.key] || "Not assigned"}</div></div>)}
        {section === "housekeeping" && <p className="text-xs text-slate-600">Last inspected: {record.lastCleaned ? new Date(record.lastCleaned).toLocaleString() : "Not recorded"}</p>}
        <button onClick={() => { setError(""); setForm({ ...record }); }} className="text-[#0077B6] underline">Edit record</button>
        <button disabled={saving} onClick={() => remove(record.id)} className="text-rose-700 underline ml-5">Delete record</button>
      </article>)}</div>}
      {form && <section className="bg-slate-50 border border-[#00AEEF]/40 rounded-xl p-6 max-w-2xl" aria-label="Record editor"><h2 className="text-xl mb-5">{form.id ? "Edit" : "Add"} record</h2><form onSubmit={submit} className="space-y-4">
        {config.fields.map(field => <label key={field.key} className="block text-sm">{field.label}{field.choices || field.type === "room" ? <select required value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} className="block w-full bg-white border border-slate-300 rounded p-3 mt-1">{field.type === "room" ? <><option value="">Choose a room type</option>{rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}</> : field.choices?.map(value => <option key={value}>{value}</option>)}</select> : <input required={!field.optional && field.type !== "checkbox"} type={field.type || "text"} min={field.type === "number" ? 0 : undefined} step={field.type === "number" ? "0.01" : undefined} checked={field.type === "checkbox" ? form[field.key] : undefined} value={field.type === "checkbox" ? undefined : form[field.key]} onChange={e => setForm({ ...form, [field.key]: field.type === "checkbox" ? e.target.checked : e.target.value })} className={field.type === "checkbox" ? "ml-3" : "block w-full bg-white border border-slate-300 rounded p-3 mt-1"} />}</label>)}
        <div className="flex gap-4"><button disabled={saving} className="bg-[#00AEEF] text-black rounded px-5 py-3">{saving ? "Saving…" : "Save record"}</button><button type="button" disabled={saving} onClick={() => setForm(null)}>Cancel</button></div>
      </form></section>}
    </div>
  </div>;
}
