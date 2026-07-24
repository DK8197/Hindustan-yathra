'use client';

import Image from 'next/image';
import { useState } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

interface Props {
  slug: string;
  jsonData: any;
}

interface ImageItem {
  path: string;
  value: string;
  fileName: string;
}

function findImages(
  obj: any,
  path = ''
): ImageItem[] {
  const results: ImageItem[] = [];

  if (typeof obj === 'string') {
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.svg',
      '.webp',
      '.gif',
      '.avif',
    ];

    const urls = obj
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);

    urls.forEach((url, idx) => {
      if (
        imageExtensions.some((ext) =>
          url.toLowerCase().includes(ext)
        )
      ) {
        const fileName =
          url.split('/').pop() || '';

        results.push({
          path:
            urls.length > 1
              ? `${path}.${idx}`
              : path,
          value: url,
          fileName,
        });
      }
    });
  }

  if (
    obj &&
    typeof obj === 'object'
  ) {
    Object.entries(obj).forEach(
      ([key, value]) => {
        results.push(
          ...findImages(
            value,
            path
              ? `${path}.${key}`
              : key
          )
        );
      }
    );
  }

  return results;
}

export default function EditTourMedia({
  slug,
  jsonData,
}: Props) {
  const [loadingPath, setLoadingPath] =
    useState('');

  const [
    itineraryUploading,
    setItineraryUploading,
  ] = useState(false);

  const images = findImages(
    jsonData
  );

  async function uploadImage(
    file: File,
    image: ImageItem
  ) {
    try {
      setLoadingPath(image.path);

      const formData =
        new FormData();

      formData.append(
        'file',
        file
      );

      formData.append(
        'slug',
        slug
      );

      formData.append(
        'fileName',
        image.fileName
      );

      const uploadResponse =
        await fetch(
          '/api/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

      const uploadData =
        await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.error ||
            'Failed to upload image'
        );
      }

      const updateResponse =
        await fetch(
          `${API_URL}/api/v1/admin/tours/${slug}/media`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type':
                'application/json',
                'X-App-Key': process.env.API_SECRET!,
            },
            body: JSON.stringify({
              path: image.path,
              value:
                uploadData.url,
            }),
          }
        );

      if (!updateResponse.ok) {
        const errorText =
          await updateResponse.text();

        throw new Error(
          errorText ||
            'Failed to update tour JSON'
        );
      }

      alert(
        'Image updated successfully'
      );

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : 'Upload failed'
      );
    } finally {
      setLoadingPath('');
    }
  }

  async function uploadItinerary(
    file: File
  ) {
    try {
      setItineraryUploading(
        true
      );

      const formData =
        new FormData();

      formData.append(
        'file',
        file
      );

      formData.append(
        'slug',
        slug
      );

      formData.append(
        'fileName',
        'itinerary.pdf'
      );

      const response =
        await fetch(
          '/api/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Failed to upload itinerary'
        );
      }

      alert(
        'Itinerary uploaded successfully'
      );

      // console.log(
      //   'Itinerary URL:',
      //   data.url
      // );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : 'Failed to upload itinerary'
      );
    } finally {
      setItineraryUploading(
        false
      );
    }
  }

  return (
    <div className="grid gap-6">
      {/* ITINERARY SECTION */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Tour Itinerary
        </h2>

        <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm">
          Uploads to:
          <div className="mt-1 font-mono text-blue-600">
            tours/{slug}/itinerary.txt
          </div>
        </div>

        <input
          type="file"
          accept=".txt,text/plain"
          disabled={
            itineraryUploading
          }
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) {
              return;
            }

            uploadItinerary(
              file
            );
          }}
        />

        {itineraryUploading && (
          <p className="mt-2 text-sm text-blue-600">
            Uploading itinerary...
          </p>
        )}
      </div>

      {/* IMAGES */}

      {!images.length ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          No images found in this
          tour JSON.
        </div>
      ) : (
        images.map((image) => (
          <div
            key={image.path}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="mb-3">
              <div className="font-medium">
                {image.path}
              </div>

              <div className="mt-1 break-all text-xs text-gray-500">
                {image.value}
              </div>

              <div className="mt-1 text-xs text-blue-600">
                R2 File:{' '}
                {image.fileName}
              </div>
            </div>

            <div className="mb-4">
              <Image
                src={image.value}
                alt={
                  image.fileName
                }
                width={400}
                height={250}
                className="rounded-lg border object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              disabled={
                loadingPath ===
                image.path
              }
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (!file) {
                  return;
                }

                uploadImage(
                  file,
                  image
                );
              }}
            />

            {loadingPath ===
              image.path && (
              <p className="mt-2 text-sm text-blue-600">
                Uploading and
                updating tour...
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}