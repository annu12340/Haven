import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['img.clerk.com'], // Add img.clerk.com here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com', // Allow Clerk domain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
