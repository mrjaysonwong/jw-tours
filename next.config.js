/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        // protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        // protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

module.exports = nextConfig;
