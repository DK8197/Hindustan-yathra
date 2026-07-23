export type TourCategory =
  | 'pilgrimage'
  | 'adventure'
  | 'family'
  | 'customized'
  | 'school'
  | 'honeymoon'
  | 'international';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string[]; // e.g. ["Breakfast", "Dinner"]
  stayLocation?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO
  avatarUrl?: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Tour {
  id: string;
  slug: string; // e.g. "chardham-yatra" -> /en/tour/chardham-yatra
  category: TourCategory;
  title: { en: string; kn: string };
  summary: { en: string; kn: string };
  heroImage: string;
  gallery: GalleryImage[];
  durationDays: number;
  durationNights: number;
  destinations: string[]; // destination slugs covered
  priceFrom: number; // INR, per person
  currency: 'INR';
  highlights: { en: string[]; kn: string[] };
  inclusions: { en: string[]; kn: string[] };
  exclusions: { en: string[]; kn: string[] };
  itinerary: ItineraryDay[];
  faqs: FAQItem[];
  reviews: Review[];
  mapCenter: { lat: number; lng: number };
  seo: {
    title: { en: string; kn: string };
    description: { en: string; kn: string };
    ogImage: string;
  };
  featured: boolean;
  isDomestic: boolean;
  active: boolean; // toggled from admin without deleting the record
}

export interface Destination {
  id: string;
  slug: string;
  name: { en: string; kn: string };
  region: string;
  isDomestic: boolean;
  heroImage: string;
  description: { en: string; kn: string };
  tourSlugs: string[]; // tours that visit this destination
  coordinates: { lat: number; lng: number };
}
