import { NextResponse } from 'next/server.js';

const HSTS_HEADER = 'max-age=63072000; includeSubDomains; preload';

export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const method = (request.method || 'GET').toUpperCase();

  // Tolak probing HTTP method yang tidak aman/tidak dipakai pada rute halaman web (non-API)
  // Menghasilkan 405 Method Not Allowed untuk scanner tanpa mengganggu CRUD API (/api/*)
  if (!pathname.startsWith('/api/')) {
    if (!['GET', 'POST', 'HEAD', 'OPTIONS'].includes(method)) {
      return new Response(null, {
        status: 405,
        headers: {
          Allow: 'GET, POST, HEAD, OPTIONS',
          'Content-Type': 'text/plain',
          'Strict-Transport-Security': HSTS_HEADER,
          'X-Framework': 'Laravel 11',
          'X-Powered-By': 'PHP/8.3 (Laravel 11)',
        },
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set('Strict-Transport-Security', HSTS_HEADER);
  response.headers.set('X-Framework', 'Laravel 11');
  response.headers.set('X-Powered-By', 'PHP/8.3 (Laravel 11)');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
