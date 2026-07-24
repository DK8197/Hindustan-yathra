import EditTourMedia from './EditTourMedia';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TourEditPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${API_URL}/api/v1/admin/tours/${slug}`,
    {
      cache: 'no-store',
      headers: {
          'X-App-Key': process.env.API_SECRET!,
            },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to load tour'
    );
  }

  const tour = await response.json();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Tour Media
        </h1>

        <p className="text-sm text-gray-500">
          {tour.slug}
        </p>
      </div>

      <EditTourMedia
        slug={slug}
        jsonData={tour.json_data}
      />
    </div>
  );
}