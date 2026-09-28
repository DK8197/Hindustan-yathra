'use client';

import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTourButton() {
  const router = useRouter();
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleExcelUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('file', file);
      formData.append(
        'slug',
        'new_creation'
      );

      const response = await fetch(
        '/api/admin/upload-excel',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        let errorMessage = responseText;

        try {
          const data = JSON.parse(responseText);
          errorMessage = data.error || data.message || responseText;
        } catch {
          // Keep the raw response text when the server did not return JSON.
        }

        throw new Error(errorMessage || `Upload failed with HTTP ${response.status}`);
      }

      alert(
        'Tour imported successfully'
      );

      router.refresh();
    } catch (err) {
      console.error(err);

      alert(
        err instanceof Error
          ? `Failed to upload Excel: ${err.message}`
          : 'Failed to upload Excel'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() =>
          fileInputRef.current?.click()
        }
        disabled={loading}
        className="flex items-center gap-2 rounded-full bg-himalaya-800 px-4 py-2 text-sm font-medium text-white"
      >
        <Plus size={16} />
        {loading
          ? 'Uploading...'
          : 'Add Tour'}
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