'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  thumbnail: string;
  display_order: number;
  active: boolean;
}

export default function AdminSocialMediaPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] =
    useState('youtube');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] =
    useState('');
  const [displayOrder, setDisplayOrder] =
    useState(1);

  async function fetchLinks() {
    try {
      setLoading(true);

      const response = await fetch(
        '/api/admin/social',
        {
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to fetch videos'
        );
      }

      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  async function handleAdd() {
    if (!url.trim()) {
      alert('Please enter a video URL');
      return;
    }

    if (!thumbnail.trim()) {
      alert(
        'Please upload the thumbnail image and paste the CDN URL'
      );
      return;
    }

    try {
      const response = await fetch(
        '/api/admin/social',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            platform,
            url,
            thumbnail,
            display_order:
              displayOrder,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to add video'
        );
      }

      setUrl('');
      setThumbnail('');
      setDisplayOrder(1);

      fetchLinks();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(
    id: number
  ) {
    if (!confirm('Delete this link?'))
      return;

    try {
      const response = await fetch(
        `/api/admin/social/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to delete video'
        );
      }

      fetchLinks();
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleActive(
    id: number,
    active: boolean
  ) {
    try {
      const response = await fetch(
        `/api/admin/social/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            active: !active,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to update'
        );
      }

      fetchLinks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Social Media Videos
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add YouTube videos and Instagram
          reels shown on the homepage.
        </p>
      </div>

      <div className="space-y-5 rounded-lg border bg-white p-5">
        <h2 className="font-medium">
          Add New Video
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value)
            }
            className="rounded border px-3 py-2"
          >
            <option value="youtube">
              YouTube
            </option>
            <option value="instagram">
              Instagram
            </option>
          </select>

          <input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            placeholder={
              platform === 'youtube'
                ? 'YouTube Video URL'
                : 'Instagram Reel URL'
            }
            className="rounded border px-3 py-2"
          />

          <input
            value={thumbnail}
            onChange={(e) =>
              setThumbnail(
                e.target.value
              )
            }
            placeholder="Thumbnail CDN URL"
            className="rounded border px-3 py-2"
          />

          <input
            type="number"
            value={displayOrder}
            onChange={(e) =>
              setDisplayOrder(
                Number(e.target.value)
              )
            }
            placeholder="Display Order"
            className="rounded border px-3 py-2"
          />
        </div>

        <div className="rounded-lg border border-dashed p-4">
          <p className="text-sm text-gray-600">
            Upload the thumbnail image to
            Cloudflare R2 first, then paste
            the CDN URL above.
          </p>

          {thumbnail && (
            <img
              src={thumbnail}
              alt="Preview"
              className="mt-4 h-40 rounded-lg border object-cover"
            />
          )}
        </div>

        <button
          onClick={handleAdd}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Video
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">
                Platform
              </th>
              <th className="p-3">
                Thumbnail
              </th>
              <th className="p-3">
                URL
              </th>
              <th className="p-3">
                Order
              </th>
              <th className="p-3">
                Active
              </th>
              <th className="p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <tr
                key={link.id}
                className="border-b"
              >
                <td className="p-3 capitalize">
                  {link.platform}
                </td>

                <td className="p-3">
                  <img
                    src={link.thumbnail}
                    alt="Thumbnail"
                    className="h-16 w-28 rounded-lg border object-cover"
                  />
                </td>

                <td className="max-w-md truncate p-3">
                  {link.url}
                </td>

                <td className="p-3">
                  {link.display_order}
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      toggleActive(
                        link.id,
                        link.active
                      )
                    }
                    className={`rounded px-3 py-1 text-white ${
                      link.active
                        ? 'bg-green-600'
                        : 'bg-gray-500'
                    }`}
                  >
                    {link.active
                      ? 'Active'
                      : 'Inactive'}
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      handleDelete(
                        link.id
                      )
                    }
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading &&
          links.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No videos found.
            </div>
          )}
      </div>
    </div>
  );
}