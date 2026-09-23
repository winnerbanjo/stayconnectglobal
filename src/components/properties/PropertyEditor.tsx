"use client";
import { useState } from "react";
import { uploadImages, type ImageUploadProgress } from "@/lib/upload-images";
import ImageUploadStatus from "./ImageUploadStatus";
const field =
  "block w-full mt-2 p-3 rounded-lg bg-[var(--editor-input,#111111)] border border-[var(--editor-border,#444)] text-[var(--editor-text,white)] text-sm";
export default function PropertyEditor({
  property,
  endpoint = "/api/properties",
  token,
  onSaved,
}: {
  property: any;
  endpoint?: string;
  token?: string;
  onSaved: () => void;
}) {
  const [data, setData] = useState({
    ...property,
    amenities: property.amenities
      .map((a: any) => (typeof a === "string" ? a : a.name))
      .join(", "),
  });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<ImageUploadProgress | null>(null);
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...data,
          amenities: data.amenities
            .split(",")
            .map((a: string) => a.trim())
            .filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      onSaved();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="space-y-4 bg-[var(--editor-panel,#1A1918)] rounded-xl p-5 border border-[var(--editor-border,#444)] text-[var(--editor-text,white)]"
    >
      <h3 className="font-serif text-2xl">Edit property details</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          ["name", "Property name"],
          ["address", "Address"],
          ["city", "City"],
          ["area", "Area / neighbourhood"],
        ].map(([key, label]) => (
          <label key={key} className="text-xs text-[var(--editor-muted,#d4d4d4)]">
            {label}
            <input
              required={key !== "area"}
              className={field}
              value={data[key] || ""}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
            />
          </label>
        ))}
        <label className="text-xs">
          Rooms / units
          <input
            type="number"
            required
            min="1"
            step="1"
            className={field}
            value={data.numberOfUnits || 1}
            onChange={(e) =>
              setData({ ...data, numberOfUnits: Number(e.target.value) })
            }
          />
        </label>
        <label className="text-xs">
          Starting nightly price (₦)
          <input
            type="number"
            required
            min="1"
            className={field}
            value={data.pricingStartingFrom}
            onChange={(e) =>
              setData({ ...data, pricingStartingFrom: Number(e.target.value) })
            }
          />
        </label>
      </div>
      <label className="block text-xs">
        Description
        <textarea
          required
          minLength={20}
          className={field}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </label>
      <label className="block text-xs">
        Amenities (separate with commas)
        <textarea
          className={field}
          value={data.amenities}
          onChange={(e) => setData({ ...data, amenities: e.target.value })}
        />
      </label>
      <p className="text-xs text-neutral-400">
        Select a cover image. Add room, property and facility photos below.
      </p>
      <div className="flex flex-wrap gap-3">
        {data.gallery.map((url: string, i: number) => (
          <div key={url} className="w-24 space-y-1">
            <button
              type="button"
              onClick={() => setData({ ...data, heroImage: url })}
              className={`border-2 rounded-lg overflow-hidden ${data.heroImage === url ? "border-[#C6A15B]" : "border-transparent"}`}
            >
              <img
                src={url}
                alt={`Select photo ${i + 1} as cover`}
                className="h-20 w-24 object-cover"
              />
            </button>
            <button
              type="button"
              className="text-xs text-[var(--editor-error,#fda4af)]"
              onClick={() =>
                setData({
                  ...data,
                  gallery: data.gallery.filter((v: string) => v !== url),
                  heroImage:
                    data.heroImage === url
                      ? data.gallery.find((v: string) => v !== url) || ""
                      : data.heroImage,
                })
              }
            >
              Remove
            </button>
            {data.heroImage === url && (
              <p className="text-xs text-[#C6A15B]">Cover</p>
            )}
          </div>
        ))}
      </div>
      <label className="block text-xs">
        Add photos — JPEG, PNG, WebP, up to 25 MB each (large photos are optimized automatically)
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          className={field}
          onChange={async (e) => {
            const input = e.currentTarget;
            const files = Array.from(input.files || []);
            if (!files.length || busy) return;
            setError("");
            setUploadProgress(null);
            if (data.gallery.length + files.length > 40) { setError("Attach no more than 40 photos."); input.value = ""; return; }
            setBusy(true);
            setUploading(true);
            try {
              await uploadImages(files, {
                onProgress: setUploadProgress,
                onUploaded: url => setData((d: any) => ({ ...d, gallery: [...d.gallery, url], heroImage: d.heroImage || url })),
              });
            } catch (e: any) {
              setError(e.message);
            } finally {
              setBusy(false);
              setUploading(false);
              input.value = "";
            }
          }}
        />
      </label>
      <ImageUploadStatus progress={uploadProgress} uploading={uploading} />
      {error && (
        <p role="alert" className="text-[var(--editor-error,#fda4af)] text-sm">
          {error}
        </p>
      )}
      {token && (
        <p className="text-xs text-neutral-400">
          Saving changes returns this listing to Draft. Submit it again when
          ready for review.
        </p>
      )}
      <button
        disabled={busy}
        className="bg-[#C6A15B] text-black rounded-lg px-5 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {busy ? "Saving / uploading…" : "Save property"}
      </button>
    </form>
  );
}
