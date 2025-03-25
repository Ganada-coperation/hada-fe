import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'standalone', // Docker로 배포 시 꼭 필요!
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true, // ✅ 꼭 필요
    },
};

export default nextConfig;
