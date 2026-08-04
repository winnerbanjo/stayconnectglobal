import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  slug: string;
  name: string;
  tagline: string;
  propertyId: string;
  type: string;
  address: string;
  city: string;
  badge?: string;
  maxGuests: number;
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  weekendPricePerNight?: number;
  holidayPricePerNight?: number;
  rating: number;
  reviewCount: number;
  description: string;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  features: Record<string, boolean | string>;
  published: boolean;
  featured: boolean;
}

const RoomSchema = new Schema<IRoom>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    propertyId: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    badge: { type: String },
    maxGuests: { type: Number, required: true, default: 2 },
    propertySize: { type: Number, required: true },
    bedrooms: { type: Number, required: true, default: 1 },
    bathrooms: { type: Number, required: true, default: 1 },
    pricePerNight: { type: Number, required: true },
    weekendPricePerNight: { type: Number },
    holidayPricePerNight: { type: Number },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    gallery: [{ type: String }],
    amenities: [{ type: String }],
    features: { type: Schema.Types.Mixed, default: {} },
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
