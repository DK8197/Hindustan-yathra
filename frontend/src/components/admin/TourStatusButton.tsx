'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

interface Props {
  tourId: number;
  active: boolean;
  slug?: string;
}

export default function TourStatusButton({
  tourId,
  active,
  slug,
}: Props) {
  const router = useRouter();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleDeactivate() {
    try {
      setLoading(true);

      const response = await fetch(
        '/api/admin/tours/update/status',
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            tourId,
            active: false,
          }),
        }
      );

      if (!response.ok) {
        const error =
          await response.text();
        throw new Error(error);
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        'Failed to deactivate tour'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleExcelUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append('file', file);
      formData.append(
        'tourId',
        String(tourId)
      );
      formData.append(
        'slug',
        String(slug)
      );

      const uploadResponse =
        await fetch(
          '/api/admin/upload-excel',
          {
            method: 'POST',
            body: formData,
          }
        );

      if (!uploadResponse.ok) {
        const error =
          await uploadResponse.text();
        throw new Error(error);
      }

      const activateResponse =
        await fetch(
          '/api/admin/tours/update/status',
          {
            method: 'PATCH',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              tourId,
              active: true,
            }),
          }
        );

      if (!activateResponse.ok) {
        const error =
          await activateResponse.text();
        throw new Error(error);
      }

      alert(
        'Tour updated and activated successfully'
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        'Excel upload failed\n\n1. Slug in the TOURS sheet must be unique.\n\n2. Verify that the Excel file matches the required template.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleActivate() {
    const confirmed =
      window.confirm(
        'Before activating this tour, upload the latest itinerary Excel file.\n\nClick OK to choose the file.'
      );

    if (!confirmed) {
      return;
    }

    fileInputRef.current?.click();
  }

  async function handleClick() {
    if (active) {
      await handleDeactivate();
    } else {
      await handleActivate();
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          active
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {loading
          ? 'Updating...'
          : active
          ? 'Deactivate'
          : 'Activate'}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={
          handleExcelUpload
        }
      />
    </>
  );
}