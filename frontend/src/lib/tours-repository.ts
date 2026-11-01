import type { Tour, TourCategory } from '@/types/tour';

// This module is the single seam between "data comes from the Excel-driven
// JSON file" (today) and "data comes from Postgres/Mongo" (production).
// Every page and API route should import from here, never from the JSON
// file directly, so migrating the data source later is a one-file change.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


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


export interface AdminTourSummary {
  id: number;
  slug: string;
  title?: { en?: string };
  category?: string;
  durationDays?: number | null;
  durationNights?: number | null;
  priceFrom?: number | null;
  isDomestic?: boolean;
  active: boolean;
}

export async function getAllToursAdmin(): Promise<{
  items: AdminTourSummary[];
  pagination: { total: number };
}> {
  const limit = 100;
  let page = 1;
  const allTours: AdminTourSummary[] = [];
  let total: number | undefined;

  while (true) {
    const response = await fetch(
      `${API_URL}/api/v1/admin/tours?page=${page}&limit=${limit}`,
      {
        headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch admin tours: ${response.status}`
      );
    }

    const data: unknown = await response.json();

    // Support both paginated and array responses.
    if (Array.isArray(data)) {
      allTours.push(...(data as AdminTourSummary[]));
      break;
    }

    if (!data || typeof data !== 'object') break;
    const payload = data as {
      items?: unknown;
      pagination?: { total?: unknown };
    };

    const items = Array.isArray(payload.items)
      ? payload.items as AdminTourSummary[]
      : [];

    if (items.length === 0) {
      total = typeof payload.pagination?.total === 'number'
        ? payload.pagination.total
        : undefined;
      break;
    }

    allTours.push(...items);
    total = typeof payload.pagination?.total === 'number'
      ? payload.pagination.total
      : undefined;

    // Stop when all records reported by the API are fetched.
    if (
      typeof total === 'number' &&
      allTours.length >= total
    ) {
      break;
    }

    // If pagination metadata is missing, avoid looping forever.
    if (typeof total !== 'number') {
      break;
    }

    page += 1;
  }

  return {
    items: allTours,
    pagination: {
      total: total ?? allTours.length,
    },
  };
}


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
        next: { revalidate: 86400  },
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

export async function getToursByCategory(
  category: TourCategory
): Promise<Tour[]> {

  const response = await fetch(
    `${API_URL}/api/v1/tours/category/${category}`,
    {
      headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
      next: { revalidate: 86400 }
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
        next: { revalidate: 86400 },
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
        next: { revalidate: 86400  },
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
        next: { revalidate: 86400  },
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
