/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "script-src 'self' https://vercel.live; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
