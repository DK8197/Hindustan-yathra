import type { Tour, TourCategory } from '@/types/tour';
import toursData from '@/data/tours.generated.json';

// This module is the single seam between "data comes from the Excel-driven
// JSON file" (today) and "data comes from Postgres/Mongo" (production).
// Every page and API route should import from here, never from the JSON
// file directly, so migrating the data source later is a one-file change.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


const tours = toursData as unknown as Tour[];

// export async function getAllTours(): Promise<Tour[]> {
//   return tours.filter((t) => t.active);
// }

export async function getAllTours(): Promise<Tour[]> {
  const response = await fetch(
    `${API_URL}/api/v1/tours`,
    {
      next: { revalidate: 3600 },
      headers: {
        'X-App-Key': process.env.API_SECRET!,
      },
    }
  );

  return response.json();
}

export async function getAllToursAdmin() {
  const response = await fetch(
    `${API_URL}/api/v1/admin/tours`,
    {
      headers: {
        'X-App-Key': process.env.API_SECRET!,
        },
      cache: 'no-store',
    }
  );

  return response.json();
}

// export async function getFeaturedTours(): Promise<Tour[]> {
//   return tours.filter((t) => t.active && t.featured);
// }

export async function getFeaturedTours(): Promise<Tour[]> {
  const result = await getFeaturedToursResult();
  return result.tours;
}

export async function getFeaturedToursResult(): Promise<{
  tours: Tour[];
  loadFailed: boolean;
}> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/tours/featured`,
      {
        headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return { tours: [], loadFailed: true };
    }

    const data: unknown = await response.json();
    return Array.isArray(data)
      ? { tours: data as Tour[], loadFailed: false }
      : { tours: [], loadFailed: true };
  } catch {
    return { tours: [], loadFailed: true };
  }
}

// export async function getToursByCategory(category: TourCategory): Promise<Tour[]> {
//   return tours.filter((t) => t.active && t.category === category);
// }

export async function getToursByCategory(
  category: TourCategory
): Promise<Tour[]> {

  const response = await fetch(
    `${API_URL}/api/v1/tours/category/${category}`,
    {
      headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
      next: { revalidate: 3600 }
    }
  );

  return response.json();
}

// export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
//   return tours.find((t) => t.slug === slug && t.active);
// }

export type TourLookupResult =
  | { status: 'found'; tour: Tour }
  | { status: 'not-found' }
  | { status: 'unavailable' };

export async function lookupTourBySlug(
  slug: string
): Promise<TourLookupResult> {
  const headers = {
    'X-App-Key': process.env.API_SECRET!,
  };

  try {
    const response = await fetch(
      `${API_URL}/api/v1/details/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
        headers,
      }
    );

    if (response.ok) {
      const data: unknown = await response.json();
      if (data && typeof data === 'object' && 'slug' in data) {
        return { status: 'found', tour: data as Tour };
      }
    }
  } catch {
    // Try the active-tour index below; transient detail-endpoint failures
    // should not immediately turn a known tour URL into a permanent 404.
  }

  try {
    const response = await fetch(
      `${API_URL}/api/v1/details`,
      {
        next: { revalidate: 60 },
        headers,
      }
    );

    if (!response.ok) {
      return { status: 'unavailable' };
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) return { status: 'unavailable' };

    const tour = (data as Tour[]).find((item) => item.slug === slug);
    return tour ? { status: 'found', tour } : { status: 'not-found' };
  } catch {
    return { status: 'unavailable' };
  }
}

export async function getAllTours_details(): Promise<Tour[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/details`,
      {
        headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return [];
    const data: unknown = await response.json();
    return Array.isArray(data) ? data as Tour[] : [];
  } catch {
    return [];
  }
}

export async function getAllTourSlugs(): Promise<string[]> {

  const tours = await getAllTours_details();

  return tours.map(
    (tour) => tour.slug
  );
}
