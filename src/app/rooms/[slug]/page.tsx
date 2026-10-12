import React from "react";
import { notFound } from "next/navigation";
import RoomDetailClient from "./RoomDetailClient";
import { findPublicRoom } from "@/lib/platform/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await findPublicRoom(slug);
  if (!room) return { title: "Room not found | Stay Connect Global" };
  return {
    title: `${room.name} | Stay Connect Global`,
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

  return <RoomDetailClient room={room} />;
}
