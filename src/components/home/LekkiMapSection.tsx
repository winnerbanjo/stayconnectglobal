'use client';

import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function LekkiMapSection() {
  const attractions = [
    { name: 'Admiralty Way Dining & Shopping District', distance: '2 mins (800 m)' },
    { name: 'Lekki Conservation Centre', distance: '12 mins (6.5 km)' },
    { name: 'Nike Art Gallery', distance: '8 mins (4.2 km)' },
    { name: 'Ikoyi Waterfront & Admiralty Bridge', distance: '6 mins (3.1 km)' },
    { name: 'Murtala Muhammed International Airport (LOS)', distance: '45 mins via VIP Chauffeur' }
  ];

  return (
    <section className="py-24 bg-[#1A1918] text-white border-t border-[#2C2B29]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Location Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
                Location & Accessibility
              </span>
              <h2 className="font-serif text-4xl text-white font-normal mt-2">
                In the Heart of Lekki Phase 1
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-[#111111] border border-[#C6A15B]/30 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif text-lg text-white">Flagship Address</div>
                  <div className="text-xs text-neutral-300 font-light mt-0.5">
                    14B, Providence Street, Lekki Phase 1, Lagos, Nigeria
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2C2B29] flex items-center justify-between text-xs text-[#C6A15B]">
                <span>Coordinates: 6.4474° N, 3.4723° E</span>
                <a
                  href="https://maps.google.com/?q=14B+Providence+Street+Lekki+Lagos"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C6A15B]" />
                <span>Nearby Destinations</span>
              </div>
              <ul className="space-y-2.5">
                {attractions.map((item, i) => (
                  <li key={i} className="flex items-center justify-between p-3 rounded bg-[#111111] border border-[#2C2B29] text-xs">
                    <span className="text-neutral-200 font-light">{item.name}</span>
                    <span className="text-[#C6A15B] font-medium shrink-0 ml-2">{item.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="lg:col-span-7 h-[480px] rounded-2xl overflow-hidden border border-[#2C2B29] relative shadow-2xl bg-neutral-900">
            <iframe
              title="Stay Connect Hotels Lekki Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.717627443834!2d3.4723!3d6.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf42d0a000000%3A0x0!2zNsKwMjYnNTAuNiJOIDPCsDI4JzIwLjMiRQ!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) opacity(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 right-4 bg-[#111111]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[#C6A15B]/40 text-xs text-[#C6A15B] flex items-center gap-2 shadow-xl">
              <Navigation className="w-4 h-4 text-[#C6A15B] animate-pulse" />
              <span>14B Providence St, Lekki</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
