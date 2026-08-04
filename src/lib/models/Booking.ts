import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingRef: string;
  propertyId: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  country: string;
  specialRequests?: string;
  arrivalTime?: string;
  promoCode?: string;
  subtotal: number;
  taxesAndFees: number;
  discountAmount: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'Refunded';
  paymentMethod: 'Bank Transfer' | 'Paystack' | 'Stripe' | 'Pay at Hotel';
  paymentStatus: 'Paid' | 'Unpaid' | 'Pending Verification';
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingRef: { type: String, required: true, unique: true },
    propertyId: { type: String, required: true },
    roomId: { type: String, required: true },
    roomName: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    nights: { type: Number, required: true },
    adults: { type: Number, required: true, default: 1 },
    children: { type: Number, default: 0 },
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestPhone: { type: String, required: true },
    country: { type: String, required: true, default: 'Nigeria' },
    specialRequests: { type: String },
    arrivalTime: { type: String },
    promoCode: { type: String },
    subtotal: { type: Number, required: true },
    taxesAndFees: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled', 'Refunded'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Bank Transfer', 'Paystack', 'Stripe', 'Pay at Hotel'],
      default: 'Bank Transfer',
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Unpaid', 'Pending Verification'],
      default: 'Pending Verification',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
