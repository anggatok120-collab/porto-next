/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/terminal', destination: '/terminal/index.html' },
      { source: '/network-lab', destination: '/network-lab/index.html' },
    ];
  },
};

export default nextConfig;
