import type { Tour } from '@/types/tour';

export async function searchTours(
  query: string,
  signal?: AbortSignal
): Promise<Tour[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
    {
      cache: 'no-store',
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`Tour search failed with status ${response.status}`);
  }

  return response.json();
}