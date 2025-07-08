/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable development mode indicators
  experimental: {
    disableOptimizedLoading: false,
  },
  // Ensure proper output for production
  output: 'standalone',
  // Disable image optimization if not needed
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
