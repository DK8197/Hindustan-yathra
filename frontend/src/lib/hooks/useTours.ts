'use client';

import { useQuery } from '@tanstack/react-query';
import type { Tour, TourCategory } from '@/types/tour';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function useFeaturedTours() {
  return useQuery({
    queryKey: ['tours', 'featured'],
    queryFn: () => fetchJson<Tour[]>('/api/tours?featured=true'),
  });
}

export function useToursByCategory(category: TourCategory) {
  return useQuery({
    queryKey: ['tours', 'category', category],
    queryFn: () => fetchJson<Tour[]>(`/api/tours?category=${category}`),
  });
}

export function useAllTours() {
  return useQuery({
    queryKey: ['tours', 'all'],
    queryFn: () => fetchJson<Tour[]>('/api/tours'),
  });
}
