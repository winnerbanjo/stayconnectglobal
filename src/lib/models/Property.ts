import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  slug: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  description: string;
  heroImage: string;
  heroVideo?: string;
  logoUrl?: string;
  themeColor?: string;
  gallery: string[];
  published: boolean;
  policies: {
    checkInTime: string;
    checkOutTime: string;
    cancellation: string;
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };
}

const PropertySchema = new Schema<IProperty>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    heroVideo: { type: String },
    logoUrl: { type: String },
    themeColor: { type: String, default: '#C6A15B' },
    gallery: [{ type: String }],
    published: { type: Boolean, default: true },
    policies: {
      checkInTime: { type: String, default: '3:00 PM' },
      checkOutTime: { type: String, default: '12:00 PM' },
      cancellation: { type: String },
      petsAllowed: { type: Boolean, default: false },
      smokingAllowed: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
