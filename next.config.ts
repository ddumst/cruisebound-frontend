import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com"
      },
      {
        hostname: "placehold.co"
      }
    ]
  }
};

export default nextConfig;
