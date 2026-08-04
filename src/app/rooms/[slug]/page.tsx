import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import RoomDetailClient from './RoomDetailClient';
import { INITIAL_ROOMS } from '@/lib/data/seedData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = INITIAL_ROOMS.find((r) => r.slug === slug || r.id === slug) || INITIAL_ROOMS[0];
  return {
    title: `${room.name} (${room.type} Suite) | Stay Connect Hotels Lekki`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = INITIAL_ROOMS.find((r) => r.slug === slug || r.id === slug);

  if (!room) {
    // Default to Saffron if slug matches saffron or isn't found
    const saffron = INITIAL_ROOMS[0];
    return (
      <div className="min-h-screen bg-[#FAF9F6]">
        <Navbar />
        <main className="pt-20">
          <RoomDetailClient room={saffron} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans selection:bg-[#C6A15B] selection:text-[#111111]">
      <Navbar />
      <main className="pt-24 pb-20">
        <RoomDetailClient room={room} />
      </main>
      <Footer />
    </div>
  );
}
