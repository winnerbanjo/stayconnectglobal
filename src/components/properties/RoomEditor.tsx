"use client";
import { useState } from "react";
import { uploadImages } from "@/lib/upload-images";
export default function RoomEditor({
  room,
  onSaved,
}: {
  room: any;
  onSaved: () => void;
}) {
  const [units, setUnits] = useState(room.numberOfUnits || 1);
  const [price, setPrice] = useState(room.pricePerNight);
  const [gallery, setGallery] = useState<string[]>(room.gallery);
  const [cover, setCover] = useState(room.heroImage);
  const [amenities, setAmenities] = useState(room.amenities.join(", "));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const field =
    "block w-full p-3 mt-2 bg-black border border-[#444] rounded-lg";
  return (
    <form
      className="space-y-4 text-xs"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          const res = await fetch("/api/rooms", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: room.id,
              numberOfUnits: units,
              pricePerNight: price,
              heroImage: cover,
              gallery,
              amenities: amenities
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
      }}
    >
      <label className="block">
        Units available for this room type
        <input
          type="number"
          min="1"
          step="1"
          required
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
          className={field}
        />
      </label>
      <label className="block">
        Nightly rate (₦)
        <input
          type="number"
          min="1"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className={field}
        />
      </label>
      <label className="block">
        Amenities (comma separated)
        <textarea
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          className={field}
        />
      </label>
      <p>Select the cover photo</p>
      <div className="flex flex-wrap gap-2">
        {gallery.map((url, i) => (
          <div key={url}>
            <button
              type="button"
              onClick={() => setCover(url)}
              className={`border-2 ${cover === url ? "border-[#C6A15B]" : "border-transparent"}`}
            >
              <img
                src={url}
                alt={`Room photo ${i + 1}`}
                className="w-20 h-16 object-cover"
              />
            </button>
            <button
              type="button"
              className="block text-rose-300"
              onClick={() => {
                setGallery(gallery.filter((u) => u !== url));
                if (cover === url)
                  setCover(gallery.find((u) => u !== url) || "");
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <label className="block">
        Add room photos
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          className={field}
          onChange={async (e) => {
            if (!e.target.files) return;
            setBusy(true);
            try {
              const urls = await uploadImages(e.target.files);
              setGallery((prev) => [...prev, ...urls]);
              if (!cover) setCover(urls[0]);
            } catch (e: any) {
              setError(e.message);
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      {error && (
        <p role="alert" className="text-rose-300">
          {error}
        </p>
      )}
      <button
        disabled={busy}
        className="bg-[#C6A15B] text-black p-3 rounded-lg"
      >
        {busy ? "Saving / uploading…" : "Save room"}
      </button>
    </form>
  );
}
