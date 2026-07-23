export default function AdminTestimonialsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Testimonials</h1>
      <p className="mt-1 text-sm text-gray-500">
        Approve, feature, or hide customer reviews surfaced on tour pages and the homepage.
      </p>
      {/* TODO(prod): CRUD table backed by /api/admin/testimonials, same pattern as Leads. */}
    </div>
  );
}
