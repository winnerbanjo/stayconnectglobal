import mongoose, { Schema } from "mongoose";

const options = { timestamps: true };
const base = { id: { type: String, required: true, unique: true } };
export const Fleet = mongoose.models.Fleet || mongoose.model("Fleet", new Schema({
  ...base, name: String, category: String, driverName: String, dailyRate: Number, image: String,
  status: { type: String, enum: ["Available", "On Chauffeur Duty", "Maintenance"] },
}, options));
export const Dining = mongoose.models.Dining || mongoose.model("Dining", new Schema({
  ...base, name: String, category: String, price: Number, description: String, available: Boolean,
}, options));
export const Housekeeping = mongoose.models.Housekeeping || mongoose.model("Housekeeping", new Schema({
  ...base, roomId: String, unit: String, assignedHousekeeper: String,
  cleaningStatus: { type: String, enum: ["Not inspected", "Clean & Inspected", "Turnover In Progress", "Dirty / Needs Cleaning", "Out of Service"] },
  lastCleaned: String,
}, options));
