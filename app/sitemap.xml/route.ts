import { NextResponse } from 'next/server';
import { AREAS } from '@/lib/constants';

const BLOG_SLUGS = [
  'suez-logistics-revolution',
  'delivery-prices-egypt',
  'earn-money-suez'
];

export async function GET() {
  const baseUrl = 'https://delivery-suez.online';

  const staticUrls = [
    '',
    '/blog',
    '/affiliate',
    '/webview'
  ].map(url => `${baseUrl}${url}`);

  const areaUrls = AREAS.map(area => `${baseUrl}/area/${area.slug}`);

  const blogUrls = BLOG_SLUGS.map(slug => `${baseUrl}/blog/${slug}`);

  const allUrls = [...staticUrls, ...areaUrls, ...blogUrls];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === baseUrl ? '1.0' : url.includes('/area/') ? '0.8' : '0.6'}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xmlContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
