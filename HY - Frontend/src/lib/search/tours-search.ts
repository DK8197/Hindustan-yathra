import type { Tour } from "@/types/tour";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function searchTours(
  query: string
): Promise<Tour[]> {

  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/api/v1/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
}