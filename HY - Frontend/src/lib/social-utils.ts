export function getYoutubeEmbedUrl(
  url: string
): string | null {
  try {
    const parsed = new URL(url);

    let videoId: string | null = null;

    if (parsed.hostname.includes('youtu.be')) {
      videoId =
        parsed.pathname.slice(1) || null;
    } else if (
      parsed.pathname.startsWith('/watch')
    ) {
      videoId =
        parsed.searchParams.get('v');
    } else if (
      parsed.pathname.startsWith('/shorts/')
    ) {
      const segments =
        parsed.pathname.split('/');

      videoId =
        segments.length > 2
          ? segments[2] || null
          : null;
    } else if (
      parsed.pathname.startsWith('/embed/')
    ) {
      const segments =
        parsed.pathname.split('/');

      videoId =
        segments.length > 2
          ? segments[2] || null
          : null;
    }

    if (!videoId) {
      return null;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

export function getInstagramEmbedUrl(
  url: string
): string | null {
  try {
    const parsed = new URL(url);

    const match =
      parsed.pathname.match(
        /\/(reel|p)\/([^/]+)/
      );

    if (!match) {
      return null;
    }

    const type = match[1];
    const shortcode = match[2];

    if (!type || !shortcode) {
      return null;
    }

    return `https://www.instagram.com/${type}/${shortcode}/embed`;
  } catch {
    return null;
  }
}