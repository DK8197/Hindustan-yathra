/**
 * Excel-Driven CMS — core ingestion script.
 *
 * Non-technical admins upload `Tours.xlsx` from the Admin Dashboard
 * (see /admin/tours -> "Upload Excel"). That upload hits
 * POST /api/admin/upload-excel, which calls the same parsing logic
 * as this script and writes the result to the tours data store
 * (src/data/tours.generated.json in this scaffold; swap for a DB in prod).
 *
 * This standalone script lets the team run the same pipeline locally:
 *   npm run parse:excel -- ./Tours.xlsx
 *
 * Expected sheet structure (one row per tour):
 *   slug | category | title_en | title_kn | summary_en | summary_kn |
 *   duration_days | duration_nights | price_from | destinations |
 *   hero_image | featured | is_domestic | active
 *
 * Itinerary, FAQs, gallery and reviews live on separate sheets
 * ("Itinerary", "FAQs", "Gallery", "Reviews") keyed by `tour_slug`,
 * because a single flat row can't hold day-by-day detail cleanly.
 * This keeps the file something a tour-desk employee can maintain
 * in Excel without touching JSON directly.
 */
import * as XLSX from 'xlsx';
import fs from 'node:fs';
import path from 'node:path';
import type { Tour, ItineraryDay, FAQItem, GalleryImage } from '../src/types/tour';

const INPUT_PATH = process.argv[2] ?? path.join(process.cwd(), 'Tours.xlsx');
const OUTPUT_PATH = path.join(process.cwd(), 'src/data/tours.generated.json');

type Row = Record<string, string | number | boolean | undefined>;

function readSheet(workbook: XLSX.WorkBook, name: string): Row[] {
  const sheet = workbook.Sheets[name];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json<Row>(sheet, { defval: '' });
}

function splitList(value: string | number | boolean | undefined): string[] {
  if (!value) return [];
  return String(value)
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);
}

function toBool(value: string | number | boolean | undefined): boolean {
  if (typeof value === 'boolean') return value;
  return String(value).trim().toUpperCase() === 'TRUE' || value === 1;
}

function buildTours(): Tour[] {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Tours.xlsx not found at ${INPUT_PATH}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(INPUT_PATH);
  const tourRows = readSheet(workbook, 'Tours');
  const itineraryRows = readSheet(workbook, 'Itinerary');
  const faqRows = readSheet(workbook, 'FAQs');
  const galleryRows = readSheet(workbook, 'Gallery');

  const tours: Tour[] = tourRows.map((row) => {
    const slug = String(row.slug).trim();

    const itinerary: ItineraryDay[] = itineraryRows
      .filter((r) => String(r.tour_slug).trim() === slug)
      .map((r) => ({
        day: Number(r.day),
        title: String(r.title ?? ''),
        description: String(r.description ?? ''),
        meals: splitList(r.meals),
        stayLocation: r.stay_location ? String(r.stay_location) : undefined,
      }))
      .sort((a, b) => a.day - b.day);

    const faqs: FAQItem[] = faqRows
      .filter((r) => String(r.tour_slug).trim() === slug)
      .map((r) => ({ question: String(r.question ?? ''), answer: String(r.answer ?? '') }));

    const gallery: GalleryImage[] = galleryRows
      .filter((r) => String(r.tour_slug).trim() === slug)
      .map((r) => ({
        url: String(r.url ?? ''),
        alt: String(r.alt ?? ''),
        width: Number(r.width ?? 1600),
        height: Number(r.height ?? 1067),
      }));

    return {
      id: slug,
      slug,
      category: String(row.category) as Tour['category'],
      title: { en: String(row.title_en ?? ''), kn: String(row.title_kn ?? '') },
      summary: { en: String(row.summary_en ?? ''), kn: String(row.summary_kn ?? '') },
      heroImage: String(row.hero_image ?? ''),
      gallery,
      durationDays: Number(row.duration_days ?? 0),
      durationNights: Number(row.duration_nights ?? 0),
      destinations: splitList(row.destinations),
      priceFrom: Number(row.price_from ?? 0),
      currency: 'INR',
      highlights: { en: splitList(row.highlights_en), kn: splitList(row.highlights_kn) },
      inclusions: { en: splitList(row.inclusions_en), kn: splitList(row.inclusions_kn) },
      exclusions: { en: splitList(row.exclusions_en), kn: splitList(row.exclusions_kn) },
      itinerary,
      faqs,
      reviews: [], // reviews are collected in-app, not via Excel
      mapCenter: { lat: Number(row.map_lat ?? 0), lng: Number(row.map_lng ?? 0) },
      seo: {
        title: { en: String(row.seo_title_en ?? row.title_en ?? ''), kn: String(row.seo_title_kn ?? row.title_kn ?? '') },
        description: { en: String(row.seo_desc_en ?? ''), kn: String(row.seo_desc_kn ?? '') },
        ogImage: String(row.og_image ?? row.hero_image ?? ''),
      },
      featured: toBool(row.featured),
      isDomestic: toBool(row.is_domestic),
      active: toBool(row.active),
    };
  });

  return tours;
}

function main() {
  const tours = buildTours();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(tours, null, 2));
  // console.log(`✅ Parsed ${tours.length} tours -> ${OUTPUT_PATH}`);
}

main();
