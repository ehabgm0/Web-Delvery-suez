import { AREAS, SERVICES, BLOG_POSTS, KEYWORDS } from '@/lib/constants';

export async function GET() {
  const baseUrl = process.env.APP_URL || 'https://delivery-suez.online';
  
  const staticPages = [
    '',
    '/areas',
    '/services',
    '/support',
    '/auth',
    '/privacy',
    '/terms',
    '/download',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  const areaPages = AREAS.map(area => ({
    url: `${baseUrl}/area/${area.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const servicePages = SERVICES.map(service => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const keywordPages = KEYWORDS.map(kw => ({
    url: `${baseUrl}/p/${kw.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogPages = BLOG_POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const allPages = [...staticPages, ...areaPages, ...servicePages, ...keywordPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
