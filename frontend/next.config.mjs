import createNextIntlPlugin from 'next-intl/plugin';

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
        hostname: 'cdn.hindustanyathra.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.instabotai.online',
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