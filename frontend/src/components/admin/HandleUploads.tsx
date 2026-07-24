'use client';

import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

export default function AddTourButton() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleExcelUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug','new_creation')

      const response = await fetch(
        `${API_URL}/api/v1/admin/upload-excel`,
        {
          method: 'POST',
          body: formData,
          headers: {
          'X-App-Key': process.env.API_SECRET!,
            },
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert('Tour imported successfully');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to upload Excel');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-2 rounded-full bg-himalaya-800 px-4 py-2 text-sm font-medium text-white"
      >
        <Plus size={16} />
        {loading ? 'Uploading...' : 'Add Tour'}
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