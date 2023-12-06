/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ['rckgfebgmiatwsmkwheb.supabase.co'],
  },
};

module.exports = nextConfig;
