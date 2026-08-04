import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  partnerId: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  propertyType: 'Hotel' | 'Serviced Apartment' | 'Luxury Residence' | 'Villa' | 'Shortlet' | 'Corporate Housing' | 'Boutique Hotel' | 'Resort';
  propertyName: string;
  address: string;
  city: string;
  numberOfUnits: number;
  description: string;
  amenities: string[];
  verificationDocuments?: string[];
  status: 'Pending' | 'Approved' | 'Rejected' | 'Suspended';
  commissionRate: number;
  payoutDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

const PartnerSchema = new Schema<IPartner>(
  {
    partnerId: { type: String, required: true, unique: true },
    businessName: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ['Hotel', 'Serviced Apartment', 'Luxury Residence', 'Villa', 'Shortlet', 'Corporate Housing', 'Boutique Hotel', 'Resort'],
      default: 'Serviced Apartment',
    },
    propertyName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    numberOfUnits: { type: Number, default: 1 },
    description: { type: String, default: '' },
    amenities: [{ type: String }],
    verificationDocuments: [{ type: String }],
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Suspended'],
      default: 'Pending',
    },
    commissionRate: { type: Number, default: 12 },
    payoutDetails: {
      bankName: { type: String },
      accountNumber: { type: String },
      accountName: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);
