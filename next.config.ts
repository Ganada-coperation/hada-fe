import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/app/components"),
      "@modals": path.resolve(__dirname, "src/app/(modals)"),
      "@services": path.resolve(__dirname, "src/app/services"),
      "@utils": path.resolve(__dirname, "src/app/utils"),
      "@styles": path.resolve(__dirname, "src/app/styles"),
      "@config": path.resolve(__dirname, "src/app/config"),
    };

    return config;
  },

  // ✅ rewrite 추가
  async rewrites() {
    return [
      {
        source: "/write/prefill/:postId",
        destination: "/write/prefill/[postId]",
      },
    ];
  },
};

export default nextConfig;
