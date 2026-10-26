export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://anggot.my.id/sitemap.xml',
    host: 'https://anggot.my.id',
  };
}
