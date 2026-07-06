/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM in some subpaths; let Next handle it.
  transpilePackages: ['three'],
};

export default nextConfig;
