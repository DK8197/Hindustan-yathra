import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { requireAdmin } from '@/lib/auth';

/**
 * POST /api/admin/upload-excel
 * multipart/form-data with field "file" = Tours.xlsx
 *
 * In production this should:
 *  1. Validate the workbook against the sheet contract documented in
 *     scripts/parse-excel.ts (Tours / Itinerary / FAQs / Gallery sheets).
 *  2. Write parsed rows to the database in a transaction.
 *  3. Trigger ISR revalidation (revalidateTag('tours')) so public pages
 *     reflect the new content without a redeploy.
 *
 * This scaffold validates structure and returns a parsed preview so the
 * admin UI can show "X tours will be updated" before committing.
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const formData = await req.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!file.name.endsWith('.xlsx')) {
    return NextResponse.json({ error: 'File must be .xlsx' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  const requiredSheets = ['Tours', 'Itinerary', 'FAQs', 'Gallery'];
  const missing = requiredSheets.filter((s) => !workbook.SheetNames.includes(s));
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required sheet(s): ${missing.join(', ')}` },
      { status: 422 },
    );
  }

  const tourRows = XLSX.utils.sheet_to_json(workbook.Sheets['Tours']!);

  // TODO(prod): call the shared parse+validate function, persist to DB,
  // then revalidateTag('tours'). Kept as a preview response here.
  return NextResponse.json({
    ok: true,
    toursFound: tourRows.length,
    message: `Parsed ${tourRows.length} tour rows. Review below, then confirm to publish.`,
    preview: tourRows.slice(0, 5),
  });
}
