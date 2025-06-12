/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Appliquer la règle à toutes les routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval'; object-src 'none';"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
