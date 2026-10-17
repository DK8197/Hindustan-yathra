
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard search engine crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },

      // OpenAI crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin', '/api'],
      },

      // Anthropic
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
        disallow: ['/admin', '/api'],
      },

      // Google AI and search
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin', '/api'],
      },

      // Other AI search and indexing crawlers
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: 'https://hindustanyatra.com/sitemap.xml',
    host: 'https://hindustanyatra.com',
  };
}
