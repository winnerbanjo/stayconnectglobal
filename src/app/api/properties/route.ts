import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import PropertyModel from '@/lib/models/Property';
import { INITIAL_PROPERTIES } from '@/lib/data/seedData';
import { Property } from '@/types';

let memoryProperties: Property[] = [...INITIAL_PROPERTIES];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const properties = await PropertyModel.find({}).sort({ createdAt: -1 }).lean();
      if (properties.length > 0) {
        return NextResponse.json({ success: true, data: properties });
      }
    }
    return NextResponse.json({ success: true, data: memoryProperties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ success: true, data: memoryProperties });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newPropData: Property = {
      id: `prop-${Date.now()}`,
      slug,
      name: body.name,
      tagline: body.tagline || 'Luxury Hotel & Residences',
      address: body.address || 'Lagos, Nigeria',
      city: body.city || 'Lagos, Nigeria',
      coordinates: { lat: 6.4474, lng: 3.4723 },
      description: body.description || '',
      heroImage: body.heroImage || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90',
      gallery: [body.heroImage || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90'],
      amenities: [
        { id: 'wifi', name: 'High Speed Internet', category: 'general', icon: 'Wifi' },
        { id: 'ac', name: 'Air Conditioning', category: 'room', icon: 'Wind' },
      ],
      published: true,
      policies: {
        checkInTime: '3:00 PM',
        checkOutTime: '12:00 PM',
        cancellation: 'Flexible cancellation within 48 hours.',
        petsAllowed: false,
        smokingAllowed: false,
      },
    };

    const conn = await connectToDatabase();
    if (conn) {
      const created = await PropertyModel.create(newPropData);
      return NextResponse.json({ success: true, data: created });
    }

    memoryProperties.unshift(newPropData);
    return NextResponse.json({ success: true, data: newPropData });
  } catch (error: any) {
    console.error('Error creating property:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
