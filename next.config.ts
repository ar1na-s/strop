import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  // The custom-domain route stalls large asset transfers in affected networks.
  assetPrefix: process.env.NODE_ENV === "production" ? "https://soft-liger-948183.netlify.app" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
