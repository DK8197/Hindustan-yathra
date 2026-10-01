export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-medium text-slate-900">Dashboard metrics are not connected yet.</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Use Tours to manage tour content and Leads to review customer enquiries. This overview will show live totals when an authenticated metrics endpoint is available.
        </p>
      </div>
    </div>
  );
}
