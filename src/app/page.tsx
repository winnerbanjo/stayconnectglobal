import React from "react";
import AirbnbHomeView from "@/components/airbnb/AirbnbHomeView";
import { publicProperties } from "@/lib/platform/store";
import { Property, Amenity } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stay Connect Global | Luxury Serviced Apartments, Suites & Experiences",
  description:
    "Discover verified luxury apartments and suites across Lagos & Nigeria. Direct reservations, 24/7 power, high-speed Wi-Fi, and protocol security.",
};

const createAmenity = (name: string, id: string): Amenity => ({
  id,
  name,
  category: "general",
  icon: "CheckCircle2",
});

const defaultPolicies = {
  checkInTime: "3:00 PM",
  checkOutTime: "12:00 PM",
  cancellation: "Contact the property for cancellation terms.",
  petsAllowed: false,
  smokingAllowed: false,
};

const defaultCoordinates = { lat: 6.4474, lng: 3.4723 };

// Fallback catalog if storage is temporarily initializing
const FALLBACK_PROPERTIES: Property[] = [
  {
    id: "prop-lekki-suites",
    slug: "stay-connect-suites-executive--472005",
    name: "Stay Connect Suites (Executive)",
    category: "Serviced Apartment",
    address: "14B, Providence Street, Lekki Phase 1, Lagos",
    city: "Lagos",
    area: "Lekki Phase 1",
    tagline: "Prime Serviced Suite in Lekki",
    description: "Executive luxury suite with uninterrupted 24/7 power, high-speed Wi-Fi, and protocol concierge in Lekki Phase 1.",
    pricingStartingFrom: 120000,
    numberOfUnits: 2,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    coordinates: defaultCoordinates,
    policies: defaultPolicies,
    heroImage: "https://res.cloudinary.com/do4mbqgjn/image/upload/v1790126922/stayconnect_hotels/caxrexanh1enjbvnvutc.jpg",
    gallery: [
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1790126922/stayconnect_hotels/caxrexanh1enjbvnvutc.jpg",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      createAmenity("24/7 Power", "a1"),
      createAmenity("High-speed Wi-Fi", "a2"),
      createAmenity("Air Conditioning", "a3"),
      createAmenity("Armed Protocol Security", "a4"),
    ],
    published: true,
    isVerified: true,
  },
  {
    id: "prop-almond",
    slug: "almond-d214c1",
    name: "Almond Residence (3-Bedroom)",
    category: "Serviced Apartment",
    address: "Banana Island Road, Ikoyi, Lagos",
    city: "Lagos",
    area: "Ikoyi",
    tagline: "Waterfront Suite on Banana Island Road",
    description: "Exclusive 3-bedroom suite with modern interior architecture, chef-ready kitchen, and 24/7 armed security.",
    pricingStartingFrom: 400000,
    numberOfUnits: 1,
    bedrooms: 3,
    bathrooms: 4,
    maxGuests: 6,
    coordinates: defaultCoordinates,
    policies: defaultPolicies,
    heroImage: "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791320414/stayconnect_hotels/xzpazdzoxczbpqrwrsdm.jpg",
    gallery: [
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791320414/stayconnect_hotels/xzpazdzoxczbpqrwrsdm.jpg",
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791320416/stayconnect_hotels/zgcr081h4zuhgfccsvvd.jpg",
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791320418/stayconnect_hotels/cwr7ppajqs7ggi763cqy.jpg",
    ],
    amenities: [
      createAmenity("24/7 Power", "a1"),
      createAmenity("Swimming Pool", "a2"),
      createAmenity("High-speed Wi-Fi", "a3"),
      createAmenity("Private Chef Service", "a4"),
    ],
    published: true,
    isVerified: true,
  },
  {
    id: "prop-marion",
    slug: "marion-apartment-11dac3",
    name: "Marion Apartment",
    category: "Serviced Apartment",
    address: "Banana Island Road, Ikoyi, Lagos",
    city: "Lagos",
    area: "Ikoyi",
    tagline: "Panoramic Executive Apartment",
    description: "Spacious premium residence in Ikoyi featuring waterfront vistas, contemporary art styling, and chauffeur access.",
    pricingStartingFrom: 300000,
    numberOfUnits: 1,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    coordinates: defaultCoordinates,
    policies: defaultPolicies,
    heroImage: "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791325309/stayconnect_hotels/ijoehxp6jo2hgnv8vj9q.jpg",
    gallery: [
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791325309/stayconnect_hotels/ijoehxp6jo2hgnv8vj9q.jpg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      createAmenity("24/7 Power", "a1"),
      createAmenity("Wi-Fi", "a2"),
      createAmenity("Concierge", "a3"),
      createAmenity("Fitness Gym", "a4"),
    ],
    published: true,
    isVerified: true,
  },
  {
    id: "prop-burdock",
    slug: "burdock-b80883",
    name: "Burdock Executive Suite",
    category: "Serviced Apartment",
    address: "Ikoyi, Lagos",
    city: "Lagos",
    area: "Ikoyi",
    tagline: "Modern 3-Bed Executive Penthouse",
    description: "Designed for international executives and discerning guests. Full protocol security and 24-hour backup energy.",
    pricingStartingFrom: 400000,
    numberOfUnits: 1,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    coordinates: defaultCoordinates,
    policies: defaultPolicies,
    heroImage: "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791323613/stayconnect_hotels/u1lmykggmhsxsdkyvksa.webp",
    gallery: [
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791323613/stayconnect_hotels/u1lmykggmhsxsdkyvksa.webp",
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791323615/stayconnect_hotels/rqtuzhcklszkshtoyj27.webp",
    ],
    amenities: [
      createAmenity("24/7 Power", "a1"),
      createAmenity("Wi-Fi", "a2"),
      createAmenity("Private Parking", "a3"),
      createAmenity("Security", "a4"),
    ],
    published: true,
    isVerified: true,
  },
  {
    id: "prop-filbert",
    slug: "filbert-58a5d5",
    name: "Filbert Residence",
    category: "Serviced Apartment",
    address: "Banana Island Road, Ikoyi, Lagos",
    city: "Lagos",
    area: "Ikoyi",
    tagline: "Private Sanctuary in Ikoyi",
    description: "Peaceful luxury residence with dedicated housekeeping, smart home entertainment, and high-speed fibre connectivity.",
    pricingStartingFrom: 250000,
    numberOfUnits: 1,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    coordinates: defaultCoordinates,
    policies: defaultPolicies,
    heroImage: "https://res.cloudinary.com/do4mbqgjn/image/upload/v1790128441/stayconnect_hotels/dwdtagg2taw90n4vybpi.jpg",
    gallery: [
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1790128441/stayconnect_hotels/dwdtagg2taw90n4vybpi.jpg",
    ],
    amenities: [
      createAmenity("24/7 Power", "a1"),
      createAmenity("Wi-Fi", "a2"),
      createAmenity("Smart TV", "a3"),
      createAmenity("Air Conditioning", "a4"),
    ],
    published: true,
    isVerified: true,
  },
  {
    id: "prop-oregano",
    slug: "oregano-81956e",
    name: "Oregano Suite",
    category: "Serviced Apartment",
    address: "Ikoyi, Lagos",
    city: "Lagos",
    area: "Ikoyi",
    tagline: "Exclusive Ikoyi Retreat",
    description: "Premium serviced accommodation with bespoke concierge services, serene ambiance, and top-tier amenities.",
    pricingStartingFrom: 400000,
    numberOfUnits: 1,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    coordinates: defaultCoordinates,
    policies: defaultPolicies,
    heroImage: "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791324555/stayconnect_hotels/f27jnjxw7yf5k36lvab5.jpg",
    gallery: [
      "https://res.cloudinary.com/do4mbqgjn/image/upload/v1791324555/stayconnect_hotels/f27jnjxw7yf5k36lvab5.jpg",
    ],
    amenities: [
      createAmenity("24/7 Power", "a1"),
      createAmenity("Wi-Fi", "a2"),
      createAmenity("Swimming Pool", "a3"),
      createAmenity("Security", "a4"),
    ],
    published: true,
    isVerified: true,
  },
];

export default async function HomePage() {
  let properties: Property[] = [];
  try {
    properties = await publicProperties();
  } catch (error) {
    console.error("Error fetching properties for homepage:", error);
  }

  // If database returned no records, use the catalog fallback
  const finalProperties =
    properties && properties.length > 0 ? properties : FALLBACK_PROPERTIES;

  return <AirbnbHomeView initialProperties={finalProperties} />;
}
