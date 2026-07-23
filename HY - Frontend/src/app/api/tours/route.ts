import { NextRequest, NextResponse } from 'next/server';
import { getAllTours, getFeaturedTours, getToursByCategory } from '@/lib/tours-repository';
import type { TourCategory } from '@/types/tour';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category') as TourCategory | null;

  if (featured === 'true') {
    return NextResponse.json(await getFeaturedTours());
  }
  if (category) {
    return NextResponse.json(await getToursByCategory(category));
  }
  return NextResponse.json(await getAllTours());
}
