/** @type {import('next').NextConfig} */
// NOTE: For production, add `next-sitemap` and enable ISR revalidation tags
// on /api/products and /api/products/[slug].
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
