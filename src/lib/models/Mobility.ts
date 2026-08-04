import mongoose, { Schema, Document } from 'mongoose';

export interface IMobilityVehicle extends Document {
  vehicleId: string;
  name: string;
  category: 'SUV' | 'Luxury Sedan' | 'Executive Bus' | 'Van' | 'Sports Car' | 'Yacht' | 'Boat';
  capacity: number;
  hourlyRate: number;
  dailyRate: number;
  airportTransferRate: number;
  image: string;
  features: string[];
  includesChauffeur: boolean;
  availableCities: string[];
  partnerId?: string;
  hostName?: string;
  published: boolean;
}

const MobilityVehicleSchema = new Schema<IMobilityVehicle>(
  {
    vehicleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['SUV', 'Luxury Sedan', 'Executive Bus', 'Van', 'Sports Car', 'Yacht', 'Boat'],
      required: true,
    },
    capacity: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    airportTransferRate: { type: Number, required: true },
    image: { type: String, required: true },
    features: [{ type: String }],
    includesChauffeur: { type: Boolean, default: true },
    availableCities: [{ type: String }],
    partnerId: { type: String },
    hostName: { type: String, default: 'Stay Connect Mobility Fleet' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.MobilityVehicle || mongoose.model<IMobilityVehicle>('MobilityVehicle', MobilityVehicleSchema);
