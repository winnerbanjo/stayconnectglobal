import { Property, Room, Review, DiningVenue, ExperienceItem, EventVenue, Offer, Amenity, Booking } from '@/types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-lekki-1',
    slug: 'stay-connect-lekki',
    name: 'Stay Connect Lekki',
    tagline: 'Refined Sanctuary in Lekki Phase 1',
    address: '14B, Providence Street, Lekki Phase 1, Lagos, Nigeria',
    city: 'Lagos, Nigeria',
    coordinates: {
      lat: 6.4474,
      lng: 3.4723,
    },
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
  },
  {
    id: 'prop-ikoyi-2',
    slug: 'stay-connect-ikoyi-residences',
    name: 'Stay Connect Ikoyi Residences',
    tagline: 'Private Waterfront Living',
    address: '8 Bourdillon Road, Ikoyi, Lagos, Nigeria',
    city: 'Lagos, Nigeria',
    coordinates: {
      lat: 6.4520,
      lng: 3.4350,
    },
    description: 'An exclusive collection of waterfront penthouses and private residences overlooking Five Cowries Creek. Designed for ultra-private stays and extended retreats.',
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=90'
    ],
    amenities: [
      { id: 'wifi', name: 'High Speed Internet', category: 'general', icon: 'Wifi' },
      { id: 'ac', name: 'Air Conditioning', category: 'room', icon: 'Wind' },
      { id: 'boat', name: 'Private Jetty Access', category: 'general', icon: 'Anchor' }
    ],
    published: true,
    policies: {
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      cancellation: 'Flexible cancellation within 24 hours.',
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
  },
  {
    id: 'room-presidential-2',
    slug: 'presidential-suite',
    name: 'The Royal Lekki Penthouse',
    tagline: 'Presidential Penthouse Suite',
    propertyId: 'prop-lekki-1',
    type: 'Penthouse',
    address: '14B, Providence Street, Lekki, Lagos',
    city: 'Lagos, Nigeria',
    badge: 'TLC ⭐⭐⭐⭐⭐',
    maxGuests: 4,
    propertySize: 320,
    bedrooms: 2,
    bathrooms: 2.5,
    pricePerNight: 450000,
    weekendPricePerNight: 500000,
    holidayPricePerNight: 600000,
    rating: 5.0,
    reviewCount: 4,
    ratingBreakdown: {
      fiveStar: 4,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0
    },
    description: 'The pinnacle of luxury in Lagos. Featuring panoramic views of the Lekki peninsula, private terrace jacuzzi, personal butler service, and custom Italian marble finishes.',
    heroImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1800&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90'
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Private Jacuzzi',
      'Personal Butler',
      'Hair Dryer',
      'Refrigerator',
      'Cable',
      'Smart TV',
      'Netflix',
      'Coffee Machine',
      'Safe',
      'Room Service'
    ],
    features: {
      bedType: 'Custom Super King',
      view: '360° Lagos & Ocean Horizon',
      floor: 'Penthouse Level',
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
  },
  {
    id: 'room-deluxe-3',
    slug: 'deluxe-executive-suite',
    name: 'Azure Deluxe Suite',
    tagline: 'Executive Horizon Suite',
    propertyId: 'prop-lekki-1',
    type: 'Executive Deluxe',
    address: '14B, Providence Street, Lekki, Lagos',
    city: 'Lagos, Nigeria',
    badge: 'TLC ⭐⭐⭐⭐⭐',
    maxGuests: 2,
    propertySize: 180,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 240000,
    weekendPricePerNight: 270000,
    holidayPricePerNight: 310000,
    rating: 4.9,
    reviewCount: 3,
    ratingBreakdown: {
      fiveStar: 3,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0
    },
    description: 'An expansive light-filled sanctuary offering floor-to-ceiling glass windows, a dedicated workstation, plush velvet seating, and a freestanding soaking bathtub.',
    heroImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1800&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=90'
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Soaking Tub',
      'Hair Dryer',
      'Refrigerator',
      'Cable',
      'Smart TV',
      'Netflix'
    ],
    features: {
      bedType: 'King Size Plush',
      view: 'Providence Street Gardens',
      floor: '4th Floor',
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
  },
  {
    id: 'rev-2',
    guestName: 'Victoria Sterling',
    guestAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    date: 'June 12, 2026',
    title: 'Hospitality comparable to London & Dubai',
    comment: 'Stay Connect Hotels is bringing world-class luxury to Lekki. The privacy, silent climate control, uninterrupted power, and prompt room service made my stay exceptional.',
    roomType: 'Royal Lekki Penthouse',
    verified: true
  }
];

export const INITIAL_DINING: DiningVenue[] = [
  {
    id: 'dine-1',
    name: 'Aura Fine Dining & Lounge',
    tagline: 'Pan-African & Mediterranean Fusion',
    description: 'Immerse your senses in curated culinary creations prepared by international Michelin-trained chefs. Featuring line-caught seafood, prime aged steaks, and artisanal Lagos cocktails.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90',
    cuisine: 'Pan-African Contemporary & Mediterranean',
    hours: {
      breakfast: '06:30 AM - 10:30 AM',
      lunch: '12:30 PM - 03:30 PM',
      dinner: '06:30 PM - 11:00 PM'
    },
    highlights: ['Chef’s Tasting Menu', 'Sommelier Wine Pairings', 'Private Dining Pods', 'Cocktail Masterclasses']
  },
  {
    id: 'dine-2',
    name: 'The Gold Leaf Coffee & Tea Lounge',
    tagline: 'Artisanal Coffee & Afternoon High Tea',
    description: 'A serene space for morning espresso, executive catch-ups, and afternoon champagne tea service in custom fine china.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=90',
    cuisine: 'Artisanal Bakery, High Tea & Coffee',
    hours: {
      breakfast: '07:00 AM - 11:00 AM',
      lunch: '11:30 AM - 05:00 PM',
      dinner: '05:00 PM - 09:00 PM'
    },
    highlights: ['Specialty Nigerian & Ethiopian Coffee', 'French Pastries', 'Champagne High Tea']
  }
];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Private Chauffeur & Airport Concierge',
    category: 'Chauffeur',
    description: 'Seamless arrival and departure service with our fleet of Range Rover Autograph & Mercedes S-Class vehicles, including VIP tarmac escort at Murtala Muhammed International Airport.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=90',
    duration: 'On Demand',
    priceTag: 'Included for Suite Guests'
  },
  {
    id: 'exp-2',
    title: 'Lagos Lagoon Private Yacht Charter',
    category: 'Cruise',
    description: 'Experience the Lekki coastline and Ikoyi waterways aboard a luxury 65-foot private yacht with personal chef and champagne setup.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=90',
    duration: '4 Hours',
    priceTag: 'Custom Package'
  },
  {
    id: 'exp-3',
    title: 'Curated Lekki Art & Cultural Excursion',
    category: 'Wellness',
    description: 'Private guided access to Nike Art Gallery, Lekki Conservation Centre canopy walks, and exclusive contemporary fashion ateliers.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=90',
    duration: 'Full Day',
    priceTag: 'Curated'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: 'The Lekki Weekend Escape',
    code: 'LEKKI20',
    discountPercentage: 20,
    description: 'Enjoy 20% off luxury weekend stays in the Saffron Executive Suite with complimentary champagne breakfast and late checkout.',
    validUntil: 'December 31, 2026',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=90',
    tag: 'Weekend Special'
  },
  {
    id: 'off-2',
    title: 'Extended Stay & Work Retreat (5+ Nights)',
    code: 'STAYLONG',
    discountPercentage: 25,
    description: 'Book 5 nights or more and receive 25% off, complimentary daily laundry, and private airport transfer.',
    validUntil: 'November 30, 2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=90',
    tag: 'Long Stay'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-1',
    bookingRef: 'SC-2026-8891',
    propertyId: 'prop-lekki-1',
    roomId: 'room-saffron-1',
    roomName: 'Saffron (Executive Single Room)',
    checkIn: '2026-08-10',
    checkOut: '2026-08-14',
    nights: 4,
    adults: 2,
    children: 0,
    guestName: 'Chief Oluwaseun Davies',
    guestEmail: 'o.davies@executivelink.ng',
    guestPhone: '+234 803 123 4567',
    country: 'Nigeria',
    specialRequests: 'High floor preference and late check-in at 8 PM.',
    arrivalTime: '20:00',
    subtotal: 740000,
    taxesAndFees: 92500,
    discountAmount: 0,
    totalPrice: 832500,
    status: 'Confirmed',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    createdAt: '2026-08-01T14:22:00Z'
  },
  {
    id: 'book-2',
    bookingRef: 'SC-2026-9042',
    propertyId: 'prop-lekki-1',
    roomId: 'room-presidential-2',
    roomName: 'The Royal Lekki Penthouse',
    checkIn: '2026-08-18',
    checkOut: '2026-08-20',
    nights: 2,
    adults: 2,
    children: 0,
    guestName: 'Sarah Jenkins',
    guestEmail: 'sarah.j@globalholdings.co.uk',
    guestPhone: '+44 7700 900077',
    country: 'United Kingdom',
    specialRequests: 'Private airport chauffeur pick up needed.',
    arrivalTime: '15:30',
    subtotal: 900000,
    taxesAndFees: 112500,
    discountAmount: 90000,
    totalPrice: 922500,
    status: 'Pending',
    paymentMethod: 'Paystack',
    paymentStatus: 'Pending Verification',
    createdAt: '2026-08-03T09:10:00Z'
  }
];
