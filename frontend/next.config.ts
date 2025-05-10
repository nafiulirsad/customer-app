import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'https://customer-app-production.up.railway.app/api'
  }
};

export default nextConfig;
