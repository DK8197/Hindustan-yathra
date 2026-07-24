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
  const response = await fetch(
    `${API_URL}/api/v1/tours/featured`,
    {
       headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
      next: { revalidate: 3600 }
    }
  );
  return response.json();
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

export async function getTourBySlug(
  slug: string
): Promise<Tour | undefined> {

  const response = await fetch(
    `${API_URL}/api/v1/details/${slug}`,
    {
      next: { revalidate: 3600 },
      headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
    }
  );

  if (!response.ok) {
    return undefined;
  }

  return response.json();
}

export async function getAllTours_details(): Promise<Tour[]> {
  const response = await fetch(
    `${API_URL}/api/v1/details`,
    {
      headers: {
          'X-App-Key': process.env.API_SECRET!,
        },
      next: { revalidate: 3600 }
    }
  );

  return response.json();
}

export async function getAllTourSlugs(): Promise<string[]> {

  const tours = await getAllTours_details();

  return tours.map(
    (tour) => tour.slug
  );
}
