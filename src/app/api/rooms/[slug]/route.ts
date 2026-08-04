import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import RoomModel from '@/lib/models/Room';
import { INITIAL_ROOMS } from '@/lib/data/seedData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const room = await RoomModel.findOne({ slug }).lean();
      if (room) {
        return NextResponse.json({ success: true, data: room });
      }
    }

    const room = INITIAL_ROOMS.find((r) => r.slug === slug || r.id === slug);
    if (room) {
      return NextResponse.json({ success: true, data: room });
    }

    return NextResponse.json(
      { success: false, error: 'Room not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching room detail:', error);
    const room = INITIAL_ROOMS.find((r) => r.slug === slug);
    if (room) {
      return NextResponse.json({ success: true, data: room });
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
