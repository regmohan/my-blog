import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // ensure Next/Turbopack uses the project folder as the root
    root: path.resolve(__dirname),
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/spark',
        destination: '/spark/index.html',
      },
      {
        source: '/dashboard/case-study',
        destination: '/spark/index.html',
      },
    ];
  },
};

export default nextConfig;

