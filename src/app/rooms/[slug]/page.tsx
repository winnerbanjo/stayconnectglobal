import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import RoomDetailClient from "./RoomDetailClient";
import { publicRooms, findPublicRoom } from "@/lib/platform/store";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await findPublicRoom(slug);
  if (!room) return { title: "Room not found | Stay Connect" };
  return {
    title: `${room.name} | Stay Connect Global Lekki`,
    description: room.description,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await findPublicRoom(slug);

  if (!room) notFound();

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
