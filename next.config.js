/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
