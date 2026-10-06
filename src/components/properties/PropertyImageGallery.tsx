"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
} from "lucide-react";

interface PropertyImageGalleryProps {
  propertyName: string;
  images: string[];
  heroImage?: string;
}

export default function PropertyImageGallery({
  propertyName,
  images = [],
  heroImage,
}: PropertyImageGalleryProps) {
  // Combine hero image and gallery, deduplicating
  const allImages = React.useMemo(() => {
    const list = [heroImage, ...images].filter(Boolean) as string[];
    return Array.from(new Set(list));
  }, [heroImage, images]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "ArrowLeft") {
      setLightboxIndex((prev) =>
        prev !== null ? (prev === 0 ? allImages.length - 1 : prev - 1) : null
      );
    } else if (e.key === "ArrowRight") {
      setLightboxIndex((prev) =>
        prev !== null ? (prev === allImages.length - 1 ? 0 : prev + 1) : null
      );
    } else if (e.key === "Escape") {
      setLightboxIndex(null);
    }
  };

  if (!allImages.length) return null;

  return (
    <div className="space-y-4">
      {/* Header Bar with Count and Scroll Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#00AEEF]" />
          <h3 className="font-serif text-xl sm:text-2xl text-[#111111] dark:text-white">
            Property Photo Gallery
          </h3>
          <span className="text-xs bg-[#00AEEF]/10 text-[#0077B6] dark:text-[#00AEEF] px-2.5 py-0.5 rounded-full font-mono font-medium ml-1">
            {allImages.length} {allImages.length === 1 ? "photo" : "photos"}
          </span>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1E1D1B] border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#00AEEF] hover:bg-[#00AEEF] hover:text-[#111111] text-slate-700 dark:text-neutral-200 flex items-center justify-center transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1E1D1B] border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#00AEEF] hover:bg-[#00AEEF] hover:text-[#111111] text-slate-700 dark:text-neutral-200 flex items-center justify-center transition-all shadow-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Smooth Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pt-1 -mx-2 px-2 scrollbar-thin scrollbar-thumb-[#00AEEF]/40"
        style={{ scrollbarWidth: "thin" }}
      >
        {allImages.map((url, idx) => (
          <div
            key={url + idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative flex-shrink-0 w-72 sm:w-88 md:w-96 h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer snap-start bg-neutral-900 border border-[#E8E5DF] dark:border-[#2C2B29] hover:border-[#00AEEF] transition-all shadow-md hover:shadow-xl"
          >
            <Image
              src={url}
              alt={`${propertyName} photo ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                {idx + 1} / {allImages.length}
              </span>
              <span className="bg-[#00AEEF] text-[#111111] font-semibold px-2.5 py-1 rounded-full text-[10px] flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                <span>Enlarge</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 outline-none"
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
            <div>
              <h4 className="font-serif text-lg sm:text-xl text-white">
                {propertyName}
              </h4>
              <p className="text-xs text-neutral-400 font-mono">
                Photo {lightboxIndex + 1} of {allImages.length}
              </p>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-[#00AEEF] hover:text-[#111111] transition-all"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Prev Button */}
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null
                    ? prev === 0
                      ? allImages.length - 1
                      : prev - 1
                    : null
                )
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-[#00AEEF] text-white hover:text-[#111111] backdrop-blur-md transition-all shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Displayed Image */}
            <div className="relative w-full max-w-5xl h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden">
              <Image
                src={allImages[lightboxIndex]}
                alt={`${propertyName} photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null
                    ? prev === allImages.length - 1
                      ? 0
                      : prev + 1
                    : null
                )
              }
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-[#00AEEF] text-white hover:text-[#111111] backdrop-blur-md transition-all shadow-lg active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex gap-2 overflow-x-auto justify-center py-2 max-w-4xl mx-auto scrollbar-thin">
            {allImages.map((thumb, i) => (
              <button
                key={thumb + i}
                onClick={() => setLightboxIndex(i)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  lightboxIndex === i
                    ? "border-[#00AEEF] scale-105 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
