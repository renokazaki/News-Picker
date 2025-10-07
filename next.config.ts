import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // 画像最適化を完全に無効化
  },
};

export default nextConfig;
