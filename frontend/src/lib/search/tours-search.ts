import type { Tour } from '@/types/tour';

export async function searchTours(
  query: string
): Promise<Tour[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
}