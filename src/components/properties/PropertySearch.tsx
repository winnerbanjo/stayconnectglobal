"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Search, ArrowRight, Building2 } from "lucide-react";
import { Property } from "@/types";
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
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialLocation);
  const filtered = properties.filter(
    (p) =>
      (!category || p.category === category) &&
      [p.city, p.area, p.address, p.name]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const areas = [...new Set(properties.map((p) => p.area || p.city))].sort();
  const groups = [...new Set(filtered.map((p) => p.area || p.city))].sort();
  function update(value: string, clearCategory = false) {
    setSearch(value);
    setLocation(value);
    const params = new URLSearchParams(window.location.search);
    if (clearCategory) params.delete("category");
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
        className="bg-white border border-[#E8E5DF] rounded-2xl p-5 shadow-sm grid gap-4 md:grid-cols-[1fr_240px_auto]"
      >
        <label className="text-xs font-medium text-neutral-600">
          City, area or property name
          <div className="flex items-center gap-2 mt-2">
            <MapPin size={18} className="text-[#C6A15B]" />
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
        <label className="text-xs font-medium text-neutral-600">
          Accommodation type
          <select
            aria-label="Accommodation type"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const params = new URLSearchParams(window.location.search);
              params.set("category", e.target.value);
              window.history.replaceState(
                null,
                "",
                `${window.location.pathname}?${params}`,
              );
            }}
            className="w-full mt-2 bg-[#FAF9F6] rounded-lg p-3 text-sm text-black"
          >
            <option value="">All accommodation</option>
            {[
              "Luxury Hotel",
              "Serviced Apartment",
              "Luxury Residence",
              "Villa",
              "Shortlet",
              "Corporate Housing",
              "Resort",
              "Boutique Hotel",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <button className="self-end flex items-center justify-center gap-2 bg-[#C6A15B] text-black px-6 py-3 rounded-lg text-sm font-semibold">
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
        {filtered.length} {filtered.length === 1 ? "property" : "properties"}
        {search ? ` matching “${search}”` : " to explore"}. Select a room and
        dates to request a reservation.
      </p>
      {!filtered.length && (
        <div className="bg-white border rounded-2xl p-12 text-center space-y-4">
          <Building2 className="mx-auto text-[#C6A15B]" size={36} />
          <h2 className="font-serif text-3xl">No properties found here yet</h2>
          <p className="text-sm text-neutral-500">
            Try another location or browse all available properties.
          </p>
          <button
            className="underline text-sm"
            onClick={() => {
              setCategory("");
              update("", true);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      {groups.map((area) => (
        <section key={area} className="space-y-5">
          <h2 className="font-serif text-3xl">Stays in {area}</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered
              .filter((p) => (p.area || p.city) === area)
              .map((p) => (
                <article
                  key={p.id}
                  className="bg-white border border-[#E8E5DF] rounded-2xl overflow-hidden shadow-sm"
                >
                  <Link
                    href={`/properties/${p.slug}${query ? `?${query}` : ""}`}
                  >
                    <div className="relative h-64">
                      <img
                        src={p.heroImage}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                      {!p.partnerId && (
                        <span className="absolute top-4 left-4 bg-[#111111] text-[#E6C98C] text-xs px-3 py-2 rounded-full">
                          Stay Connect operated
                        </span>
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-[10px] uppercase tracking-widest text-[#947137]">
                        {p.category}
                      </p>
                      <h3 className="font-serif text-3xl">{p.name}</h3>
                      <p className="text-xs text-neutral-500 flex gap-2">
                        <MapPin size={15} className="shrink-0" />
                        {p.address}
                      </p>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.amenities.slice(0, 3).map((a) => (
                          <span
                            key={a.id}
                            className="bg-[#FAF9F6] px-2 py-1 text-[11px] rounded"
                          >
                            {a.name}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4 border-t flex justify-between items-center">
                        <p className="text-xs text-neutral-500">
                          From{" "}
                          <strong className="text-lg text-black">
                            {p.pricingStartingFrom ? `₦${p.pricingStartingFrom.toLocaleString()}` : "Contact for price"}
                          </strong>{" "}
                          / night
                        </p>
                        <ArrowRight size={19} />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
