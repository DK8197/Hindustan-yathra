import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getAllToursAdmin } from '@/lib/tours-repository';
import TourStatusButton from '@/components/admin/TourStatusButton';
import AddTourButton from '@/components/admin/HandleUploads';

export default async function AdminToursPage() {
  const toursResponse: any = await getAllToursAdmin();

  const tours = Array.isArray(toursResponse)
    ? toursResponse
    : toursResponse?.items ?? [];

  const pagination = toursResponse?.pagination;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Tour Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage activation, itinerary uploads and
            tour content.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Total Tours:{' '}
            {pagination?.total ?? tours.length}
          </p>
        </div>
          <AddTourButton />
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="font-medium text-amber-900">
          Tour Activation Workflow
        </h3>

        <p className="mt-1 text-sm text-amber-800">
          When activating a deactivated tour,
          admins must upload a fresh Excel workbook
          for that specific tour before it becomes
          active on the website.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {tours.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No tours found
                </td>
              </tr>
            ) : (
              tours.map((tour: any) => (
                <tr key={tour.id}>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">
                        {tour.title?.en ||
                          'Untitled Tour'}
                      </p>

                      <p className="text-xs text-gray-500">
                        {tour.slug}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {tour.category}
                  </td>

                  <td className="px-4 py-3">
                    {tour.durationDays
                      ? `${tour.durationDays}D / ${
                          tour.durationNights ?? 0
                        }N`
                      : '-'}
                  </td>

                  <td className="px-4 py-3">
                    ₹
                    {(tour.priceFrom ?? 0).toLocaleString(
                      'en-IN'
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        tour.isDomestic
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {tour.isDomestic
                        ? 'Domestic'
                        : 'International'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        tour.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {tour.active
                        ? 'Active'
                        : 'Deactivated'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <TourStatusButton
                        tourId={tour.id}
                        active={tour.active}
                        slug={tour.slug}
                      />

                      <Link
                        href={`/admin/tours/${tour.slug}`}
                        className="text-himalaya-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}