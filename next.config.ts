import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for optimized Docker/Render deployments
  output: 'standalone',

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },

  // Strict mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,
};

export default nextConfig;
