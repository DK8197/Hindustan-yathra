import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageCdnEnv = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/['"]/g, '').trim();
const imageCdnUrl =
  imageCdnEnv && !imageCdnEnv.includes('instabotai.online')
    ? imageCdnEnv
    : 'https://cdn.hindustanyatra.com';

const imageCdnHostname = imageCdnUrl.startsWith('http')
  ? new URL(imageCdnUrl).hostname
  : imageCdnUrl;

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../'),
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
        hostname: 'cdn.hindustanyatra.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.instabotai.online',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hindustanyathra.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: imageCdnHostname,
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hindustanyatra.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hindustanyatra.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hindustan-yathra.onrender.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },

  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);