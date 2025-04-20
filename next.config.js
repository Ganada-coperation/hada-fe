const path = require("path"); // ✅ path 모듈 선언

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // ✅ babel-plugin-styled-components 없이도 자동 설정됨
  },
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
      "@completeModal": path.resolve(__dirname, "src/app/(modals)/@completeModal"),
    };

    return config;
  },
};

module.exports = nextConfig;
