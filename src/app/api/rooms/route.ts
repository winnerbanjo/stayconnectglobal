import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import RoomModel from '@/lib/models/Room';
import { INITIAL_ROOMS } from '@/lib/data/seedData';
import { Room } from '@/types';

let memoryRooms: Room[] = [...INITIAL_ROOMS];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const rooms = await RoomModel.find({}).sort({ createdAt: -1 }).lean();
      if (rooms.length > 0) {
        return NextResponse.json({ success: true, data: rooms });
      }
    }
    return NextResponse.json({ success: true, data: memoryRooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ success: true, data: memoryRooms });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newRoomData: Room = {
      id: `room-${Date.now()}`,
      slug,
      name: body.name,
      tagline: body.tagline || 'Luxury Executive Suite',
      propertyId: body.propertyId || 'prop-lekki-1',
      type: body.type || 'Executive',
      address: body.address || '14B, Providence Street, Lekki, Lagos',
      city: 'Lagos, Nigeria',
      badge: 'TLC ⭐⭐⭐⭐⭐',
      maxGuests: Number(body.maxGuests) || 2,
      propertySize: Number(body.propertySize) || 150,
      bedrooms: Number(body.bedrooms) || 1,
      bathrooms: Number(body.bathrooms) || 1,
      pricePerNight: Number(body.pricePerNight) || 185000,
      weekendPricePerNight: Number(body.weekendPricePerNight) || 210000,
      holidayPricePerNight: Number(body.holidayPricePerNight) || 250000,
      rating: 5.0,
      reviewCount: 0,
      ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
      description: body.description || '',
      heroImage: body.heroImage || '/images/saffron/saffron-1.jpg',
      gallery: body.gallery || [body.heroImage || '/images/saffron/saffron-1.jpg'],
      amenities: body.amenities || ['WiFi', 'Air Conditioning', 'Smart TV', 'Coffee Machine'],
      features: {
        bedType: 'King Size Pillow-top',
        view: 'Lekki Skyline View',
        floor: 'Executive Level',
        balcony: true,
        workspace: true,
        miniBar: true,
        coffeeMachine: true,
        smartTV: true,
        netflix: true,
        wifi: true,
        safe: true,
        closet: true,
        hairDryer: true,
        refrigerator: true,
        cable: true,
        roomService: true,
        housekeeping: true,
      },
      published: true,
      featured: true,
    };

    const conn = await connectToDatabase();
    if (conn) {
      const created = await RoomModel.create(newRoomData);
      return NextResponse.json({ success: true, data: created });
    }

    memoryRooms.unshift(newRoomData);
    return NextResponse.json({ success: true, data: newRoomData });
  } catch (error: any) {
    console.error('Error creating room:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
