const configuredCdnUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

export const IMAGE_CDN_BASE_URL = (
  configuredCdnUrl || 'https://cdn.hindustanyatra.com'
).replace(/\/+$/, '');

const legacyCdnHosts = new Set([
  'cdn.instabotai.online',
  'cdn.hindustanyathra.com',
]);

/** Build a public CDN URL for an object-storage key or asset path. */
export function getCdnImageUrl(path: string): string {
  return `${IMAGE_CDN_BASE_URL}/${path.replace(/^\/+/, '')}`;
}

/** Normalize HY-owned CDN URLs while leaving bundled and third-party images intact. */
export function normalizeImageUrl(src: string): string {
  const normalizedSrc = src?.trim();

  if (!normalizedSrc) {
    return '';
  }

  src = normalizedSrc;

  if (src.startsWith('/tours/') || src.startsWith('tours/')) {
    return getCdnImageUrl(src);
  }

  try {
    const url = new URL(src);

    if (
      url.hostname === 'cdn.hindustanyatra.com' ||
      legacyCdnHosts.has(url.hostname)
    ) {
      return getCdnImageUrl(`${url.pathname}${url.search}${url.hash}`);
    }
  } catch {
    // Relative paths are usually bundled placeholder images and should stay local.
  }

  return src;
}
