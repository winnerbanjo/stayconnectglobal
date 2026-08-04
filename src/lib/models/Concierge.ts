import mongoose, { Schema, Document } from 'mongoose';

export interface IConciergeRequest extends Document {
  requestId: string;
  serviceType: 'Airport Pickup' | 'Airport Drop-off' | 'Restaurant Reservation' | 'Birthday Setup' | 'Proposal Setup' | 'Private Chef' | 'Laundry' | 'Shopping Assistance' | 'VIP Security' | 'Personal Driver' | 'Translator';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  priceEstimate?: number;
}

const ConciergeRequestSchema = new Schema<IConciergeRequest>(
  {
    requestId: { type: String, required: true, unique: true },
    serviceType: {
      type: String,
      enum: ['Airport Pickup', 'Airport Drop-off', 'Restaurant Reservation', 'Birthday Setup', 'Proposal Setup', 'Private Chef', 'Laundry', 'Shopping Assistance', 'VIP Security', 'Personal Driver', 'Translator'],
      required: true,
    },
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestPhone: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    location: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    priceEstimate: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.ConciergeRequest || mongoose.model<IConciergeRequest>('ConciergeRequest', ConciergeRequestSchema);
