/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "cms.pinst.co.id",
      },
      {
        protocol: "https",
        hostname: "v2.pinst.co.id",
      },
      {
        protocol: "https",
        hostname: "pinst.co.id",
      },
    ],
  },
};

module.exports = nextConfig;
