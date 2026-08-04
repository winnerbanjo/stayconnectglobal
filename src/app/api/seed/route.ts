import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import PropertyModel from '@/lib/models/Property';
import RoomModel from '@/lib/models/Room';
import BookingModel from '@/lib/models/Booking';
import { INITIAL_PROPERTIES, INITIAL_ROOMS, INITIAL_BOOKINGS } from '@/lib/data/seedData';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        message: 'Could not connect to MongoDB Atlas. Check MONGODB_URI.',
      }, { status: 500 });
    }

    // Drop legacy collections / indexes to prevent index mismatch issues
    try {
      await mongoose.connection.db?.dropCollection('bookings');
    } catch (e) {
      console.log('Collection bookings drop skipped or clean');
    }

    try {
      await mongoose.connection.db?.dropCollection('properties');
    } catch (e) {
      console.log('Collection properties drop skipped or clean');
    }

    try {
      await mongoose.connection.db?.dropCollection('rooms');
    } catch (e) {
      console.log('Collection rooms drop skipped or clean');
    }

    const properties = await PropertyModel.insertMany(INITIAL_PROPERTIES);
    const rooms = await RoomModel.insertMany(INITIAL_ROOMS);
    const bookings = await BookingModel.insertMany(INITIAL_BOOKINGS);

    return NextResponse.json({
      success: true,
      message: 'Successfully populated MongoDB Atlas nile_booking_2026 database!',
      seeded: {
        propertiesCount: properties.length,
        roomsCount: rooms.length,
        bookingsCount: bookings.length,
        saffronSuite: rooms.find(r => r.slug === 'saffron'),
      },
    });
  } catch (error: any) {
    console.error('MongoDB Atlas Seed Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Seeding failed',
    }, { status: 500 });
  }
}
