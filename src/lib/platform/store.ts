import "server-only";
import { AsyncLocalStorage } from "node:async_hooks";
import type { ClientSession } from "mongoose";
import fs from "node:fs/promises";
import path from "node:path";
import { connectToDatabase } from "@/lib/db";
import Property from "@/lib/models/Property";
import Room from "@/lib/models/Room";
import Booking from "@/lib/models/Booking";
import Partner from "@/lib/models/Partner";
import { INITIAL_PROPERTIES, INITIAL_ROOMS } from "@/lib/data/seedData";

export const localPreview = process.env.STAYCONNECT_LOCAL_PREVIEW === "true";
type Collection = "properties" | "rooms" | "bookings" | "partners";
const models = {
  properties: Property,
  rooms: Room,
  bookings: Booking,
  partners: Partner,
};
const dir = path.join(process.cwd(), ".local-data");
const file = path.join(dir, "platform.json");
const initial = () => ({
  properties: INITIAL_PROPERTIES,
  rooms: INITIAL_ROOMS,
  bookings: [],
  partners: [],
});
// Serialize local mutations, including the read-modify-write cycle.
const globalStore = globalThis as typeof globalThis & {
  stayStoreQueue?: Promise<unknown>;
};
const sessions = new AsyncLocalStorage<ClientSession>();
export async function transaction<T>(action: () => Promise<T>): Promise<T> {
  if (!localPreview) {
    if (sessions.getStore()) return action();
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database unavailable. Changes were not saved.");
    const session = await conn.startSession();
    try { return await session.withTransaction(() => sessions.run(session, action)) as T; }
    finally { await session.endSession(); }
  }
  const run = (globalStore.stayStoreQueue || Promise.resolve()).then(action);
  globalStore.stayStoreQueue = run.catch(() => {});
  return run;
}
async function readLocal(): Promise<Record<Collection, any[]>> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (error: any) {
    if (error.code !== "ENOENT") throw error;
    return structuredClone(initial());
  }
}
export function normalize(item: any, collection?: Collection): any {
  const value = JSON.parse(JSON.stringify(item));
  const legacy = [...INITIAL_PROPERTIES, ...INITIAL_ROOMS].find(p => p.slug === value.slug);
  value.id = value.id || legacy?.id || value._id || value.partnerId;
  if (collection === 'properties') {
    const defaults = INITIAL_PROPERTIES.find(p => p.slug === value.slug);
    value.category ||= defaults?.category || 'Luxury Hotel';
    value.area ||= defaults?.area || '';
    value.hostName ||= defaults?.hostName;
    value.coordinates ||= defaults?.coordinates || { lat: 0, lng: 0 };
    value.policies = { checkInTime: '3:00 PM', checkOutTime: '12:00 PM', cancellation: 'Contact the property for cancellation terms.', petsAllowed: false, smokingAllowed: false, ...(defaults?.policies || {}), ...(value.policies || {}) };
    value.gallery ||= value.heroImage ? [value.heroImage] : [];
    value.amenities = (value.amenities || defaults?.amenities || []).map((a: any, i: number) => typeof a === 'string' ? { id: `amenity-${i}`, name: a, category: 'general', icon: 'CheckCircle2' } : a);
    value.verificationStatus ||= value.isVerified !== false && value.published ? 'Approved' : 'Draft';
    if (defaults && ['Stay Connect Lekki', 'Stay Connect Sanctuary Lekki'].includes(value.name)) value.name = defaults.name;
  }
  if (collection === 'bookings' && value.status === 'Confirmed' && ['Unpaid', 'Pending Verification'].includes(value.paymentStatus)) value.status = 'Pending';
  if (collection === 'rooms') {
    value.features ||= {};
    value.gallery ||= value.heroImage ? [value.heroImage] : [];
    value.amenities ||= [];
    value.ratingBreakdown ||= { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 };
  }
  return value;
}
export async function list(collection: Collection): Promise<any[]> {
  if (localPreview) return (await readLocal())[collection].map(item => normalize(item, collection));
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Database unavailable. Please try again shortly.");
  return (await models[collection].find({}).session(sessions.getStore() || null).lean()).map(item => normalize(item, collection));
}
export async function save(collection: Collection, item: any): Promise<any> {
  if (localPreview) {
    const db = await readLocal();
    const index = db[collection].findIndex(
      (p) => (p.id || p._id || p.partnerId) === item.id,
    );
    if (index < 0) db[collection].unshift(item);
    else db[collection][index] = item;
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(`${file}.tmp`, JSON.stringify(db, null, 2));
    await fs.rename(`${file}.tmp`, file);
    return normalize(item, collection);
  }
  if (!(await connectToDatabase()))
    throw new Error("Database unavailable. Changes were not saved.");
  const data = { ...item };
  delete data._id; delete data.__v; delete data.inventoryVersion;
  if (collection === "properties")
    data.amenities = data.amenities.map((a: any) =>
      typeof a === "string" ? a : a.name,
    );
  const filter = item._id ? { _id: item._id } : { id: item.id };
  const result = await models[collection].findOneAndUpdate(
    filter,
    { $set: data },
    { upsert: true, new: true, runValidators: true, session: sessions.getStore() },
  );
  return normalize(result, collection);
}
export const visible = (p: any) =>
  p.published &&
  (p.verificationStatus === "Approved" ||
    (!p.verificationStatus && p.isVerified !== false));
export const belongsTo = (room: any, property: any) => [property.id, property._id, property.slug].filter(Boolean).includes(String(room.propertyId));
export async function publicProperties() {
  const properties = (await list('properties')).filter(visible);
  const rooms = (await list('rooms')).filter(r => r.published);
  return properties.map(p => {
    const rates = rooms.filter(r => belongsTo(r,p)).map(r => r.pricePerNight).filter(n => Number.isFinite(n) && n > 0);
    return { ...p, pricingStartingFrom: rates.length ? Math.min(...rates) : p.pricingStartingFrom };
  });
}
export async function publicRooms() {
  const properties = (await list('properties')).filter(visible);
  return (await list('rooms')).filter(r => r.published && properties.some(p => belongsTo(r,p))).map(r => ({ ...r, propertyId: properties.find(p => belongsTo(r,p))!.id }));
}
// The room document acts as a per-room write lock inside the MongoDB transaction.
// Conflicting confirmations retry with a fresh snapshot before counting occupied nights.
export async function lockRoomInventory(room: any) {
  if (localPreview) return;
  const session = sessions.getStore();
  if (!session) throw new Error('Inventory changes require a database transaction');
  const result = await Room.updateOne(room._id ? { _id: room._id } : { id: room.id }, { $inc: { inventoryVersion: 1 } }, { session });
  if (!result.matchedCount) throw new Error('Room inventory not found');
}
// Preserve links created by the former single-property booking page.
export function roomMatches(room: any, value: string) {
  return [room.id, room._id, room.slug].filter(Boolean).includes(value) ||
    (['standard-room', 'room-standard-1'].includes(value) && room.slug === 'executive-single-suite' && room.propertyId === 'prop-lekki-1');
}
export async function findPublicRoom(value: string) { return (await publicRooms()).find(room => roomMatches(room, value)); }
