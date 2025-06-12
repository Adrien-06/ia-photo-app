// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src *",
      "script-src * 'unsafe-inline' 'unsafe-eval' data: blob:",
      "connect-src *",
      "img-src * data: blob:",
      "style-src * 'unsafe-inline'",
    ].join('; ')
  );

  return response;
}
