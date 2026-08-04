import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import PropertyModel from '@/lib/models/Property';
import { INITIAL_PROPERTIES } from '@/lib/data/seedData';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const properties = await PropertyModel.find({ published: true }).lean();
      if (properties.length > 0) {
        return NextResponse.json({ success: true, data: properties });
      }
    }
    return NextResponse.json({ success: true, data: INITIAL_PROPERTIES });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ success: true, data: INITIAL_PROPERTIES });
  }
}
