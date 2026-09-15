/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@designcodeio/threeui'],
  async rewrites() {
    return [
      { source: '/terminal', destination: '/terminal/index.html' },
      { source: '/network-lab', destination: '/network-lab/index.html' },
    ];
  },
};

export default nextConfig;
