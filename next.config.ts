import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEWSAPI_API_KEY: process.env.NEWSAPI_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  }
};

export default nextConfig;
