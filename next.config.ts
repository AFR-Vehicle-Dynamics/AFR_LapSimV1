import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5432/api/:path*', // Proxy to Backend
      },
    ];
  },
  /* other config options here */
};

export default nextConfig;
