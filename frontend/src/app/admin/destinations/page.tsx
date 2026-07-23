import destinations from '@/data/destinations.json';

export default function AdminDestinationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Destinations</h1>
      <p className="mt-1 text-sm text-gray-500">
        Sourced from src/data/destinations.json today; migrate to the same
        Excel/DB pipeline as Tours when ready.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {destinations.map((d) => (
          <div key={d.slug} className="rounded-xl border bg-white p-4">
            <p className="font-medium">{d.name.en}</p>
            <p className="text-xs text-gray-400">{d.region}</p>
            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${d.isDomestic ? 'bg-himalaya-100 text-himalaya-700' : 'bg-saffron-100 text-saffron-700'}`}>
              {d.isDomestic ? 'Domestic' : 'International'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
