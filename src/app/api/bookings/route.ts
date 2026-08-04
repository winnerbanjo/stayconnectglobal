import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import BookingModel from '@/lib/models/Booking';
import { INITIAL_BOOKINGS } from '@/lib/data/seedData';
import { Booking } from '@/types';
import { sendBookingConfirmationEmail } from '@/lib/mailtrap';

let memoryBookings: Booking[] = [...INITIAL_BOOKINGS];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const bookings = await BookingModel.find({}).sort({ createdAt: -1 }).lean();
      if (bookings.length > 0) {
        return NextResponse.json({ success: true, data: bookings });
      }
    }
    return NextResponse.json({ success: true, data: memoryBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ success: true, data: memoryBookings });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      propertyId,
      roomId,
      roomName,
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      guestName,
      guestEmail,
      guestPhone,
      country,
      specialRequests,
      arrivalTime,
      promoCode,
      subtotal,
      taxesAndFees,
      discountAmount,
      totalPrice,
      paymentMethod,
    } = body;

    const bookingRef = `SC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBookingData = {
      bookingRef,
      propertyId: propertyId || 'prop-lekki-1',
      roomId: roomId || 'room-saffron-1',
      roomName: roomName || 'Saffron (Executive Single Room)',
      checkIn: checkIn || '',
      checkOut: checkOut || '',
      nights: Number(nights) || 1,
      adults: Number(adults) || 1,
      children: Number(children) || 0,
      guestName: guestName || '',
      guestEmail: guestEmail || '',
      guestPhone: guestPhone || '+234 704 100 8351',
      country: country || 'Nigeria',
      specialRequests: specialRequests || '',
      arrivalTime: arrivalTime || '15:00',
      promoCode: promoCode || '',
      subtotal: Number(subtotal) || 0,
      taxesAndFees: Number(taxesAndFees) || 0,
      discountAmount: Number(discountAmount) || 0,
      totalPrice: Number(totalPrice) || 0,
      status: 'Confirmed' as const,
      paymentMethod: (paymentMethod || 'Bank Transfer') as 'Bank Transfer' | 'Paystack' | 'Stripe' | 'Pay at Hotel',
      paymentStatus: 'Pending Verification' as const,
      createdAt: new Date().toISOString(),
    };

    // Synchronously send reservation voucher email
    let emailResult = null;
    try {
      emailResult = await sendBookingConfirmationEmail({
        bookingRef: newBookingData.bookingRef,
        guestName: newBookingData.guestName,
        guestEmail: newBookingData.guestEmail || 'winnerbanjo@gmail.com',
        guestPhone: newBookingData.guestPhone,
        roomName: newBookingData.roomName,
        checkIn: newBookingData.checkIn,
        checkOut: newBookingData.checkOut,
        nights: newBookingData.nights,
        totalPrice: newBookingData.totalPrice,
        paymentMethod: newBookingData.paymentMethod,
      });
    } catch (mailErr) {
      console.warn('Email dispatch warning:', mailErr);
    }

    const conn = await connectToDatabase();
    if (conn) {
      const created = await BookingModel.create(newBookingData);
      return NextResponse.json({ success: true, data: created, emailSent: true, emailResult });
    }

    const createdInMemory: Booking = {
      id: `book-${Date.now()}`,
      ...newBookingData
    };
    memoryBookings.unshift(createdInMemory);

    return NextResponse.json({ success: true, data: createdInMemory, emailSent: true, emailResult });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}
