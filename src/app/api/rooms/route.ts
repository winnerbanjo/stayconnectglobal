import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import RoomModel from '@/lib/models/Room';
import { INITIAL_ROOMS } from '@/lib/data/seedData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    const featured = searchParams.get('featured');

    const conn = await connectToDatabase();
    if (conn) {
      const query: Record<string, unknown> = { published: true };
      if (propertyId) query.propertyId = propertyId;
      if (featured === 'true') query.featured = true;

      const rooms = await RoomModel.find(query).lean();
      if (rooms.length > 0) {
        return NextResponse.json({ success: true, data: rooms });
      }
    }

    let filtered = INITIAL_ROOMS.filter(r => r.published);
    if (propertyId) filtered = filtered.filter(r => r.propertyId === propertyId);
    if (featured === 'true') filtered = filtered.filter(r => r.featured);

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ success: true, data: INITIAL_ROOMS });
  }
}
