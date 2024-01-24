/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: false,
    domains: ["cms.pinst.co.id", "v2.pinst.co.id", "pinst.co.id"],
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
    ],
  },
};

module.exports = nextConfig;
