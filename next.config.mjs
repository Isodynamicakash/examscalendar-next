/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Forces Next.js to compile static HTML/CSS/JS files
  images: {
    unoptimized: true, // Essential: Disables dynamic image optimizations unsupported by mobile wraps
  },
};

export default nextConfig;
