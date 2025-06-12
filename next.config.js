/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'sha256-Tzzh4ZNs/VztgIxDWej5V0cAL3JoGXekk5k5Z2oXB1I=' 'sha256-CO8tMRuqZiB0Bdam1OXMTBftqUUnap5wIS7acDXQVM8=';
            style-src 'self' 'unsafe-inline';
            img-src * data: blob:;
            connect-src *;
            font-src 'self';
          `.replace(/\s{2,}/g, ' ').trim()
        }
      ],
    },
  ],
}

module.exports = nextConfig
