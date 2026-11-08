import type { Tour, TourCategory } from '@/types/tour';

// Tour repository: connects directly to the backend API for all tour data.
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

export type TourLookupResult =
  | { status: 'found'; tour: Tour }
  | { status: 'not-found' }
  | { status: 'unavailable' };

function parseTourPayload(input: unknown): Record<string, unknown> | null {
  let data = input;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const rec = { ...(data as Record<string, unknown>) };
    if ('slug' in rec) {
      if (!rec.heroImage && typeof rec.hero_image === 'string') {
        rec.heroImage = rec.hero_image;
      }
      return rec;
    }
  }
  return null;
}

export async function lookupTourBySlug(
  slug: string
): Promise<TourLookupResult> {
  const headers = {
    'X-App-Key': process.env.API_SECRET!,
  };

  let primaryTour: Record<string, unknown> | null = null;

  // 1. Fetch tour by slug from /api/v1/details/<slug>
  try {
    const response = await fetch(
      `${API_URL}/api/v1/details/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 86400 },
        headers,
      }
    );

    if (response.ok) {
      primaryTour = parseTourPayload(await response.json());
    }
  } catch {
    // continue to fallback
  }

  // 2. If primaryTour doesn't have an itinerary or was not found, check the /details index
  const hasItinerary =
    primaryTour && Array.isArray(primaryTour.itinerary) && primaryTour.itinerary.length > 0;

  if (!hasItinerary) {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/details`,
        {
          next: { revalidate: 86400 },
          headers,
        }
      );

      if (response.ok) {
        let listData: unknown = await response.json();
        if (typeof listData === 'string') {
          try {
            listData = JSON.parse(listData);
          } catch {
            // ignore
          }
        }
        if (Array.isArray(listData)) {
          const matched = listData
            .map(parseTourPayload)
            .find((item) => item?.slug === slug);

          if (matched) {
            primaryTour = { ...(primaryTour || {}), ...matched };
          }
        }
      }
    } catch {
      // continue
    }
  }

  // 3. Fallback to /api/v1/tours/slug/<slug>
  if (!primaryTour) {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/tours/slug/${encodeURIComponent(slug)}`,
        {
          next: { revalidate: 86400 },
          headers,
        }
      );

      if (response.ok) {
        primaryTour = parseTourPayload(await response.json());
      }
    } catch {
      // ignore
    }
  }

  if (primaryTour && primaryTour.slug) {
    return { status: 'found', tour: primaryTour as unknown as Tour };
  }

  return { status: 'unavailable' };
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
