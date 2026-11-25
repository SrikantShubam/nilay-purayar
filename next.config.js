/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve Tina's static admin app from /admin.
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
