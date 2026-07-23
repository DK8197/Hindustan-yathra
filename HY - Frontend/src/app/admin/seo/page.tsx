export default function AdminSeoPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">SEO</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage per-page meta titles, descriptions, and OG images for both locales.
        Backs the alternates/openGraph metadata already wired into every page in app/[locale].
      </p>
      {/* TODO(prod): form list keyed by route + locale, backed by /api/admin/seo. */}
    </div>
  );
}
