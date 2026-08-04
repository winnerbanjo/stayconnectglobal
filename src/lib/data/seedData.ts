import { Property, Room, Review, DiningVenue, ExperienceItem, EventVenue, Offer, Amenity, Booking, MobilityVehicle, Partner } from '@/types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-lekki-1',
    slug: 'stay-connect-lekki',
    name: 'Stay Connect Sanctuary Lekki',
    tagline: 'Refined Sanctuary & Executive Suites',
    category: 'Luxury Hotel',
    hostName: 'Stay Connect Global',
    isVerified: true,
    pricingStartingFrom: 185000,
    address: '14B, Providence Street, Lekki Phase 1, Lagos, Nigeria',
    city: 'Lagos',
    coordinates: { lat: 6.4474, lng: 3.4723 },
    description: 'Stay Connect Lekki defines quiet luxury in the prestigious Lekki enclave of Lagos. Blending editorial design, timeless architecture, and personalized Nigerian hospitality, each suite provides an elevated urban retreat for elite travelers, executives, and couples.',
    heroImage: '/images/saffron/saffron-1.jpg',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-luxury-hotel-pool-42885-large.mp4',
    logoUrl: '/logo.svg',
    themeColor: '#C6A15B',
    gallery: [
      '/images/saffron/saffron-1.jpg',
      '/images/saffron/saffron-2.jpg',
      '/images/saffron/saffron-3.jpg',
      '/images/saffron/saffron-4.jpg'
    ],
    amenities: [
      { id: 'wifi', name: 'High Speed Internet', category: 'general', icon: 'Wifi', description: 'Ultra-fast complimentary fiber optic internet' },
      { id: 'ac', name: 'Air Conditioning', category: 'room', icon: 'Wind', description: 'Multi-zone climate control' },
      { id: 'pool', name: 'Infinity Pool', category: 'wellness', icon: 'Waves', description: 'Rooftop heated infinity pool & cabanas' },
      { id: 'gym', name: 'Fitness Center', category: 'wellness', icon: 'Dumbbell', description: 'Technogym equipped 24/7 fitness studio' },
      { id: 'spa', name: 'Holistic Spa & Massage', category: 'wellness', icon: 'HeartPulse', description: 'Bespoke therapeutic massages & skincare' },
      { id: 'restaurant', name: 'Aura Fine Dining', category: 'dining', icon: 'Utensils', description: 'Pan-African & Mediterranean gastronomy' },
      { id: 'security', name: '24/7 Security & Patrol', category: 'general', icon: 'ShieldCheck', description: 'Guarded access & CCTV coverage' },
      { id: 'generator', name: 'Uninterrupted Power', category: 'general', icon: 'Zap', description: 'Dual redundant industrial power generators' }
    ],
    published: true,
    policies: {
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      cancellation: 'Complimentary cancellation up to 48 hours prior to check-in.',
      petsAllowed: false,
      smokingAllowed: false
    }
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-saffron-1',
    slug: 'saffron',
    name: 'Saffron',
    tagline: 'Executive Single Suite',
    propertyId: 'prop-lekki-1',
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
    ratingBreakdown: {
      fiveStar: 1,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0
    },
    description: 'Experience elevated living in Saffron, an elegantly designed executive suite located at 14B, Providence Street, Lekki, Lagos. This premium apartment combines comfort, convenience, and modern sophistication—perfect for professionals, couples, or anyone seeking a luxurious city lifestyle.',
    heroImage: '/images/saffron/saffron-1.jpg',
    gallery: [
      '/images/saffron/saffron-1.jpg',
      '/images/saffron/saffron-2.jpg',
      '/images/saffron/saffron-3.jpg',
      '/images/saffron/saffron-4.jpg'
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Hair Dryer',
      'Refrigerator',
      'Cable',
      'Smart TV',
      'Netflix',
      'Coffee Machine',
      'Safe',
      'Closet',
      'Room Service',
      'Housekeeping'
    ],
    features: {
      bedType: 'King Pillow-top Mattress',
      view: 'Lekki Skyline View',
      floor: '3rd Floor',
      balcony: true,
      workspace: true,
      miniBar: true,
      coffeeMachine: true,
      smartTV: true,
      netflix: true,
      wifi: true,
      safe: true,
      closet: true,
      hairDryer: true,
      refrigerator: true,
      cable: true,
      roomService: true,
      housekeeping: true
    },
    published: true,
    featured: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-saffron-1',
    guestName: 'Dr. Babatunde Alabi',
    guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    date: 'July 24, 2026',
    title: 'An Oasis of Tranquility in Lekki',
    comment: 'Saffron exceeded all my expectations. The subtle luxury, immaculate cleanliness, 150m² of thoughtful spatial design, and flawless customer care made my business trip to Lagos unforgettable. 14B Providence Street is unmatched.',
    roomType: 'Saffron (Executive Single Room)',
    verified: true
  }
];

export const INITIAL_DINING: DiningVenue[] = [];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [];

export const INITIAL_OFFERS: Offer[] = [];

export const INITIAL_MOBILITY: MobilityVehicle[] = [];

export const INITIAL_PARTNERS: Partner[] = [];

export const INITIAL_BOOKINGS: Booking[] = [];
