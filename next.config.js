/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cms.pinst.co.id"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "pinst.co.id",
        port: "*",
      },
    ],
  },
};

module.exports = nextConfig;
