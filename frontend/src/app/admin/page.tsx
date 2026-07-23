export default function AdminHome() {
  const stats = [
    { label: 'Active tours', value: '24' },
    { label: 'New leads (7d)', value: '38' },
    { label: 'Registered users', value: '1,204' },
    { label: 'Avg. review rating', value: '4.7' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Wire this page to Recharts (already in the stack) for booking trends,
        lead-source breakdown, and revenue-by-category once the DB is connected.
      </p>
    </div>
  );
}
