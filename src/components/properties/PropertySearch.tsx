"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Search, ArrowRight, Building2 } from "lucide-react";
import { Property } from "@/types";
import AirbnbPropertyCard from "@/components/airbnb/AirbnbPropertyCard";

function cleanDescription(desc: string = ""): string {
  if (!desc) return "";
  if (desc.includes("•")) {
    const parts = desc.split("•");
    const last = parts[parts.length - 1]?.trim();
    if (last && last.length > 30) {
      const sentenceMatch = last.match(/(?:(?:Hairdryer|Iron|Fridge|Toaster|Oven)\s+)?([A-Z].*)/);
      if (sentenceMatch && sentenceMatch[1]) {
        return sentenceMatch[1];
      }
      return last;
    }
  }
  return desc;
}

export default function PropertySearch({
  properties,
  initialLocation = "",
  initialCategory = "",
  query = "",
}: {
  properties: Property[];
  initialLocation?: string;
  initialCategory?: string;
  query?: string;
}) {
  const [location, setLocation] = useState(initialLocation);
  const [search, setSearch] = useState(initialLocation);
  const filtered = properties.filter(
    (p) =>
      [p.city, p.area, p.address, p.name]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const areas = [...new Set(properties.map((p) => p.area || p.city))].sort();
  const groups = [...new Set(filtered.map((p) => p.area || p.city))].sort();
  function update(value: string) {
    setSearch(value);
    setLocation(value);
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    if (value) params.set("location", value);
    else {
      params.delete("location");
      params.delete("city");
    }
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params}`,
    );
  }
  return (
    <div className="space-y-9">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update(location);
        }}
        className="bg-white border border-[#E8E5DF] rounded-2xl p-5 shadow-sm grid gap-4 md:grid-cols-[1fr_auto]"
      >
        <label className="text-xs font-medium text-neutral-600">
          City, area or property name
          <div className="flex items-center gap-2 mt-2">
            <MapPin size={18} className="text-[#00AEEF]" />
            <input
              aria-label="Search location"
              list="locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Try Lekki, Ikoyi or Abuja"
              className="w-full bg-[#FAF9F6] rounded-lg p-3 text-sm text-black"
            />
            <datalist id="locations">
              {areas.map((a) => (
                <option key={a} value={a} />
              ))}
            </datalist>
          </div>
        </label>
        <button className="self-end flex items-center justify-center gap-2 bg-[#00AEEF] text-black px-6 py-3 rounded-lg text-sm font-semibold">
          <Search size={17} />
          Search stays
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => update("")}
          className={`rounded-full border px-4 py-2 text-xs ${!search ? "bg-[#111111] text-white" : "bg-white"}`}
        >
          All locations
        </button>
        {areas.map((a) => (
          <button
            key={a}
            onClick={() => update(a)}
            className={`rounded-full border px-4 py-2 text-xs ${search === a ? "bg-[#111111] text-white" : "bg-white"}`}
          >
            {a}
          </button>
        ))}
      </div>
      <p role="status" className="text-sm text-neutral-600">
        {filtered.length} {filtered.length === 1 ? "stay" : "stays"}
        {search ? ` matching “${search}”` : " available in Nigeria"}. Select a stay and
        dates to request a reservation.
      </p>
      {!filtered.length && (
        <div className="bg-white border rounded-2xl p-12 text-center space-y-4">
          <Building2 className="mx-auto text-[#00AEEF]" size={36} />
          <h2 className="font-serif text-3xl">No stays found here yet</h2>
          <p className="text-sm text-neutral-500">
            Try another location or browse all available stays.
          </p>
          <button
            className="underline text-sm"
            onClick={() => {
              update("");
            }}
          >
            View all stays
          </button>
        </div>
      )}
      {groups.map((area) => (
        <section key={area} className="space-y-5">
          <div className="flex items-baseline justify-between border-b border-[#E8E5DF] dark:border-[#2C2B29] pb-3">
            <h2 className="font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">
              Stays in {area}
            </h2>
            <span className="text-xs text-neutral-500 font-medium">
              {filtered.filter((p) => (p.area || p.city) === area).length} properties
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered
              .filter((p) => (p.area || p.city) === area)
              .map((p) => (
                <AirbnbPropertyCard
                  key={p.id}
                  property={p}
                  showFeeTotal={true}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
