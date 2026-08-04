import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  experienceId: string;
  title: string;
  category: 'Boat Cruise' | 'Spa & Wellness' | 'Private Dinner' | 'Photography' | 'City Tour' | 'Cooking Class' | 'Water Sports' | 'VIP Event';
  tagline: string;
  description: string;
  duration: string;
  pricePerPerson: number;
  location: string;
  city: string;
  image: string;
  inclusions: string[];
  partnerId?: string;
  hostName?: string;
  published: boolean;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    experienceId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Boat Cruise', 'Spa & Wellness', 'Private Dinner', 'Photography', 'City Tour', 'Cooking Class', 'Water Sports', 'VIP Event'],
      required: true,
    },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    pricePerPerson: { type: Number, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    inclusions: [{ type: String }],
    partnerId: { type: String },
    hostName: { type: String, default: 'Stay Connect Experiences' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
