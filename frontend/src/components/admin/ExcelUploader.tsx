'use client';

import { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

type UploadResult =
  | {
      ok: true;
      toursFound: number;
      message: string;
    }
  | {
      error: string;
    };

interface ExcelUploaderProps {
  tourId?: number;
  onSuccess?: () => void;
}

export function ExcelUploader({
  tourId,
  onSuccess,
}: ExcelUploaderProps) {
  const [status, setStatus] = useState<
    'idle' | 'uploading' | 'done' | 'error'
  >('idle');

  const [result, setResult] =
    useState<UploadResult | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<string>('');

  async function handleFile(file: File) {
    setStatus('uploading');
    setSelectedFile(file.name);

    const formData = new FormData();
    formData.append('file', file);

    if (tourId) {
      formData.append(
        'tourId',
        String(tourId)
      );
    }

    try {
      const res = await fetch(
        '/api/admin/upload-excel',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data: UploadResult =
        await res.json();

      setResult(data);
      setStatus(
        res.ok ? 'done' : 'error'
      );

      if (
        res.ok &&
        data &&
        'ok' in data
      ) {
        onSuccess?.();
      }
    } catch {
      setResult({
        error:
          'Upload failed. Check your connection and try again.',
      });

      setStatus('error');
    }
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-himalaya-200 bg-white p-8 text-center">
      <UploadCloud
        className="mx-auto text-himalaya-400"
        size={32}
      />

      <p className="mt-3 font-medium">
        Upload Tours.xlsx
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Update Tours, Itinerary, FAQs and
        Gallery sheets. Changes will be
        synced automatically after upload.
      </p>

      {tourId && (
        <p className="mt-2 text-xs text-blue-600">
          Tour ID: {tourId}
        </p>
      )}

      <label className="mt-4 inline-block cursor-pointer rounded-full bg-saffron-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-saffron-600">
        Choose Excel File

        <input
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />
      </label>

      {selectedFile && (
        <p className="mt-3 text-sm text-gray-600">
          Selected: {selectedFile}
        </p>
      )}

      {status === 'uploading' && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Parsing workbook and updating
            tour data...
          </p>
        </div>
      )}

      {status === 'done' &&
        result &&
        'ok' in result && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
            <CheckCircle2 size={16} />
            {result.message}
          </div>
        )}

      {status === 'error' &&
        result &&
        'error' in result && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-600">
            <XCircle size={16} />
            {result.error}
          </div>
        )}
    </div>
  );
}

