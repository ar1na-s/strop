import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
