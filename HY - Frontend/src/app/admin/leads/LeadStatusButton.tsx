'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

interface Props {
  leadId: number;
  handled: boolean;
}

export default function LeadStatusButton({
  leadId,
  handled,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] =
    useState(false);

  async function toggleStatus() {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/v1/admin/leads/${leadId}/handled`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            handled: !handled,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to update lead'
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        'Failed to update status'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        handled
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
      }`}
    >
      {loading
        ? 'Updating...'
        : handled
        ? 'Handled'
        : 'Mark Handled'}
    </button>
  );
}