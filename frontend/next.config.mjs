import createNextIntlPlugin from 'next-intl/plugin';

const imageCdnUrl =
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
  'https://cdn.hindustanyatra.com';
const imageCdnHostname = new URL(imageCdnUrl).hostname;

const withNextIntl =
  createNextIntlPlugin(
    './src/i18n/request.ts'
  );

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: imageCdnHostname,
      },
    ],
    formats: [
      'image/avif',
      'image/webp',
    ],
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
    ],
  },

  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(
  nextConfig
);