'use client';

import { useRouter } from 'next/navigation';
import { useState,useRef } from 'react';



interface Props {
  tourId: number;
  active: boolean;
  slug?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

export default function TourStatusButton({
  tourId,
  active,
  slug,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

        async function handleDeactivate() {
          try {
            setLoading(true);

            const response = await fetch(
              `${API_URL}/api/v1/admin/tours/update/status`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tourId,
                  active: false,
                }),
              }
            );

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText);
            }

            router.refresh();
          } catch (error) {
            console.error(error);
            alert('Failed to deactivate tour');
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

          const formData = new FormData();
          formData.append('file', file);
          formData.append('tourId', String(tourId));
          formData.append('slug',String(slug));

          const uploadResponse = await fetch(
            `${API_URL}/api/v1/admin/upload-excel`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error('Excel upload failed');
          }

          const activateResponse = await fetch(
            `${API_URL}/api/v1/admin/tours/update/status`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tourId,
                active: true,
              }),
            }
          );

          if (!activateResponse.ok) {
            throw new Error('Activation failed');
          }

          alert('Tour updated and activated successfully');

          router.refresh();
        } catch (error) {
          console.error(error);
          alert('Excel upload failed\n\n1.slug in TOURS sheet should be unique\n\n2.check excel format it should match with original one');
        } finally {
          setLoading(false);
        }
      }
    async function handleActivate() {
      const confirmed = window.confirm(
        'Before activating this tour, you must upload the latest itinerary Excel file.\n\nClick OK to select the Excel file.'
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
      handleActivate();
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
          onChange={handleExcelUpload}
        />
      </>
    );

}