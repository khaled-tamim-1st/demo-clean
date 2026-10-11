import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://democlean-kuwait.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-SearchBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Bingbot',
          'CCBot',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
