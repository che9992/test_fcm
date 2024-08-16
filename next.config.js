/** @type {import('next').NextConfig} */

// PWA
const isProduction = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching: [],
  disable: !isProduction, // 배포할때엔 활성화 하세요
});

const withTM = require("next-transpile-modules")([
  "firebase",
  "firebase/messaging",
]);

module.exports = withTM(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
    minimumCacheTTL: 60,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.5,
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: ["/404"] },
      ],
    },

    images: {
      domains: ["imagedelivery.net", "res.cloudinary.com"],
      formats: ["image/avif", "image/webp"],
      deviceSizes: [600, 768, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },

    experimental: {
      scrollRestoration: true, // 스크롤 위치 복원을 위한 설정
    },
  })
);
