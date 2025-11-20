/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Next.js 16 to use webpack instead of Turbopack
  webpack: (config) => config,
  turbopack: false, 

  typescript: {
    // ⬅️ Suppress ALL TypeScript errors during build
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
