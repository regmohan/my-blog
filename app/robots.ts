import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://regmimohan.com.np/sitemap.xml',
    host: 'https://regmimohan.com.np',
  };
}
