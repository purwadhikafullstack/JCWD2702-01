/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      {
        hostname: 'jcwd270201.purwadhikabootcamp.com',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
