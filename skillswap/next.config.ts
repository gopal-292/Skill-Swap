/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-libsql',
    '@prisma/driver-adapter-utils',
    '@libsql/client',
    'bcryptjs',
  ],
}

module.exports = nextConfig

