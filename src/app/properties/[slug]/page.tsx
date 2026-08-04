import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { MapPin, CheckCircle2, ArrowRight, Shield, Anchor, Wind, Wifi } from 'lucide-react';
import { INITIAL_PROPERTIES, INITIAL_ROOMS } from '@/lib/data/seedData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prop = INITIAL_PROPERTIES.find((p) => p.slug === slug) || INITIAL_PROPERTIES[0];
  return {
    title: `${prop.name} | Stay Connect Hotels`,
    description: prop.description,
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prop = INITIAL_PROPERTIES.find((p) => p.slug === slug) || INITIAL_PROPERTIES[0];
  const propertyRooms = INITIAL_ROOMS.filter((r) => r.propertyId === prop.id || prop.slug === 'stay-connect-lekki');

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C6A15B] font-semibold">
              Hotel Destination • {prop.city}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#111111] font-normal">
              {prop.name}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 font-light">
              <MapPin className="w-4 h-4 text-[#C6A15B]" />
              <span>📍 {prop.address}</span>
            </div>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              {prop.description}
            </p>
          </div>

          {/* Hero Gallery */}
          <div className="relative h-[440px] md:h-[560px] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-[#E8E5DF]">
            <Image
              src={prop.heroImage}
              alt={prop.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="font-serif text-3xl">{prop.name}</div>
                <div className="text-xs text-[#C6A15B] uppercase tracking-widest mt-1">{prop.tagline}</div>
              </div>
              <Link
                href={`/book?propertyId=${prop.id}`}
                className="px-8 py-3.5 bg-[#C6A15B] hover:bg-[#B08C46] text-[#111111] font-medium text-xs uppercase tracking-widest rounded shadow-xl inline-flex items-center gap-2 self-start md:self-auto"
              >
                <span>Book This Property</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Amenities & Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-[#111111]">Property Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {prop.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>{am.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E8E5DF] shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-[#111111]">Guest Policies & Hours</h3>
              <div className="space-y-3 text-xs text-neutral-700 font-light">
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span>Check-In Time</span>
                  <span className="font-medium text-[#111111]">{prop.policies.checkInTime}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span>Check-Out Time</span>
                  <span className="font-medium text-[#111111]">{prop.policies.checkOutTime}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DF] pb-2">
                  <span>Cancellation Policy</span>
                  <span className="font-medium text-[#111111]">{prop.policies.cancellation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Rooms in Property */}
          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-[#111111]">Available Suites in {prop.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {propertyRooms.map((rm) => (
                <div key={rm.id} className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden shadow-md space-y-4 p-6">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-neutral-900">
                    <Image src={rm.heroImage} alt={rm.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#111111]">{rm.name}</h3>
                  <div className="text-xs text-neutral-500 font-light">{rm.maxGuests} Guests • {rm.propertySize} m²</div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DF]">
                    <div className="font-serif text-xl font-bold text-[#111111]">₦{rm.pricePerNight.toLocaleString()} / night</div>
                    <Link href={`/rooms/${rm.slug}`} className="text-xs text-[#C6A15B] font-semibold uppercase tracking-widest">
                      View Suite →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
