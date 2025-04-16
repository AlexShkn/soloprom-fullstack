/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_CLIENT_URL || 'https://example.com',
  generateRobotsTxt: true,
  exclude: [
    '/server-sitemap.xml',
    '/auth',
    '/profile',
    '/cart',
    'favorite',
    '/search',
    '/admin',
    '/compare',
  ],
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     `${process.env.NEXT_PUBLIC_CLIENT_URL}/server-sitemap.xml`,
  //   ],
  // },
  // Дополнительные настройки (опционально)
  // changefreq: 'daily',
  // priority: 0.7,
  // sitemapSize: 5000,
  // generateIndexSitemap: false,
  // alternateRefs: [
  //   { href: 'https://example.com/en', hreflang: 'en' },
  // ],
}
