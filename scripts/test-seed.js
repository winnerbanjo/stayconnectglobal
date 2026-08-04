const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://nileagencyafrica_db_user:jf2y0dLmetfak6GI@cluster0.fl2ppdk.mongodb.net/nile_booking_2026';

const PropertySchema = new mongoose.Schema({
  slug: String,
  name: String,
  tagline: String,
  address: String,
  city: String,
  description: String,
  heroImage: String,
  gallery: [String],
  published: Boolean
}, { timestamps: true });

const RoomSchema = new mongoose.Schema({
  slug: String,
  name: String,
  tagline: String,
  propertyId: String,
  type: String,
  address: String,
  city: String,
  badge: String,
  maxGuests: Number,
  propertySize: Number,
  bedrooms: Number,
  bathrooms: Number,
  pricePerNight: Number,
  weekendPricePerNight: Number,
  holidayPricePerNight: Number,
  rating: Number,
  reviewCount: Number,
  description: String,
  heroImage: String,
  gallery: [String],
  amenities: [String],
  published: Boolean,
  featured: Boolean
}, { timestamps: true });

const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);
const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);

async function runSeed() {
  console.log('Connecting to MongoDB Atlas nile_booking_2026...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB Atlas!');

  // Drop old collections
  try {
    await mongoose.connection.db.dropCollection('properties');
  } catch (e) {}
  try {
    await mongoose.connection.db.dropCollection('rooms');
  } catch (e) {}
  try {
    await mongoose.connection.db.dropCollection('bookings');
  } catch (e) {}

  // Seed Property
  const prop = await Property.create({
    slug: 'stay-connect-lekki',
    name: 'Stay Connect Lekki',
    tagline: 'Refined Sanctuary in Lekki Phase 1',
    address: '14B, Providence Street, Lekki Phase 1, Lagos, Nigeria',
    city: 'Lagos, Nigeria',
    description: 'Stay Connect Lekki defines quiet luxury in the prestigious Lekki enclave of Lagos. Blending editorial design, timeless architecture, and personalized Nigerian hospitality.',
    heroImage: '/images/saffron/saffron-1.jpg',
    gallery: [
      '/images/saffron/saffron-1.jpg',
      '/images/saffron/saffron-2.jpg',
      '/images/saffron/saffron-3.jpg',
      '/images/saffron/saffron-4.jpg'
    ],
    published: true
  });

  // Seed Saffron Room
  const saffron = await Room.create({
    slug: 'saffron',
    name: 'Saffron',
    tagline: 'Executive Single Suite',
    propertyId: prop._id.toString(),
    type: 'Executive',
    address: '14B, Providence Street, Lekki, Lagos',
    city: 'Lagos, Nigeria',
    badge: 'TLC ⭐⭐⭐⭐⭐',
    maxGuests: 2,
    propertySize: 150,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 185000,
    weekendPricePerNight: 210000,
    holidayPricePerNight: 250000,
    rating: 5.0,
    reviewCount: 1,
    description: 'Experience elevated living in Saffron, an elegantly designed executive suite located at 14B, Providence Street, Lekki, Lagos. This premium apartment combines comfort, convenience, and modern sophistication.',
    heroImage: '/images/saffron/saffron-1.jpg',
    gallery: [
      '/images/saffron/saffron-1.jpg',
      '/images/saffron/saffron-2.jpg',
      '/images/saffron/saffron-3.jpg',
      '/images/saffron/saffron-4.jpg'
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Hair Dryer', 'Refrigerator', 'Cable', 'Smart TV', 'Netflix', 'Coffee Machine'],
    published: true,
    featured: true
  });

  console.log('Successfully seeded MongoDB Atlas!');
  console.log('Property ID:', prop._id);
  console.log('Saffron Room ID:', saffron._id);

  process.exit(0);
}

runSeed().catch(err => {
  console.error('Atlas seed error:', err);
  process.exit(1);
});
