export interface Amenity {
  id: string;
  name: string;
  category: 'general' | 'room' | 'wellness' | 'business' | 'dining';
  icon: string;
  description?: string;
}

export interface Review {
  id: string;
  guestName: string;
  guestAvatar?: string;
  rating: number; // e.g. 5.0
  date: string;
  title: string;
  comment: string;
  roomType?: string;
  verified: boolean;
}

export interface Room {
  id: string;
  slug: string;
  name: string; // e.g., "Saffron"
  tagline: string; // e.g., "Executive Single Suite"
  propertyId: string;
  type: 'Standard' | 'Superior' | 'Executive' | 'Deluxe' | 'Executive Deluxe' | 'Junior Suite' | 'Luxury Suite' | 'Presidential Suite' | 'Penthouse';
  address: string; // e.g., "14B, Providence Street, Lekki, Lagos"
  city: string; // e.g., "Lagos, Nigeria"
  badge?: string; // e.g., "TLC ⭐⭐⭐⭐⭐"
  maxGuests: number; // e.g., 2 GUESTS
  propertySize: number; // e.g., 150 m²
  bedrooms: number; // e.g., 1 BR
  bathrooms: number; // e.g., 1 BA
  pricePerNight: number; // Base Price in NGN (e.g. 185000)
  weekendPricePerNight?: number; // e.g. 210000
  holidayPricePerNight?: number; // e.g. 250000
  rating: number; // e.g., 5.0
  reviewCount: number; // e.g., 1
  ratingBreakdown: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
  description: string;
  heroImage: string;
  gallery: string[];
  amenities: string[]; // List of amenity names or IDs
  features: {
    bedType: string;
    view: string;
    floor?: string;
    balcony: boolean;
    workspace: boolean;
    miniBar: boolean;
    coffeeMachine: boolean;
    smartTV: boolean;
    netflix: boolean;
    wifi: boolean;
    safe: boolean;
    closet: boolean;
    hairDryer: boolean;
    refrigerator: boolean;
    cable: boolean;
    roomService: boolean;
    housekeeping: boolean;
  };
  published: boolean;
  featured: boolean;
}

export interface Property {
  id: string;
  slug: string;
  name: string; // e.g., "Stay Connect Lekki"
  tagline: string;
  category: 'Luxury Hotel' | 'Serviced Apartment' | 'Luxury Residence' | 'Villa' | 'Shortlet' | 'Corporate Housing' | 'Resort' | 'Boutique Hotel';
  partnerId?: string;
  hostName?: string;
  isVerified?: boolean;
  pricingStartingFrom?: number;
  address: string; // "14B, Providence Street, Lekki Phase 1, Lagos, Nigeria"
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  heroImage: string;
  heroVideo?: string;
  logoUrl?: string;
  themeColor?: string;
  gallery: string[];
  amenities: Amenity[];
  published: boolean;
  policies: {
    checkInTime: string;
    checkOutTime: string;
    cancellation: string;
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };
}

export interface Partner {
  id: string;
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
  status: 'Pending' | 'Approved' | 'Rejected' | 'Suspended';
  commissionRate: number;
  createdAt: string;
}

export interface MobilityVehicle {
  id: string;
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
}

export interface ConciergeRequest {
  id?: string;
  requestId: string;
  serviceType: 'Airport Pickup' | 'Airport Drop-off' | 'Restaurant Reservation' | 'Birthday Setup' | 'Proposal Setup' | 'Private Chef' | 'Laundry' | 'Shopping Assistance' | 'VIP Security' | 'Personal Driver' | 'Translator';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  priceEstimate?: number;
}

export interface DiningVenue {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  cuisine: string;
  hours: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: 'Boat Cruise' | 'Spa & Wellness' | 'Private Dinner' | 'Photography' | 'City Tour' | 'Cooking Class' | 'Water Sports' | 'VIP Event';
  tagline?: string;
  description: string;
  image: string;
  duration: string;
  priceTag?: string;
  pricePerPerson?: number;
  location?: string;
  hostName?: string;
}

export interface EventVenue {
  id: string;
  title: string;
  capacity: string;
  description: string;
  image: string;
  suitableFor: string[];
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  description: string;
  validUntil: string;
  image: string;
  tag: string;
}

export interface Booking {
  id: string;
  bookingRef: string; // e.g., SC-2026-8891
  propertyId: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  country: string;
  specialRequests?: string;
  arrivalTime?: string;
  promoCode?: string;
  subtotal: number;
  taxesAndFees: number; // 7.5% VAT + 5% Consumption Tax
  discountAmount: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'Refunded';
  paymentMethod: 'Bank Transfer' | 'Paystack' | 'Stripe' | 'Pay at Hotel';
  paymentStatus: 'Paid' | 'Unpaid' | 'Pending Verification';
  createdAt: string;
}
