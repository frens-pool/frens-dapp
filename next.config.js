/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    if (!isServer) {
      config.resolve.alias["crypto"] = "crypto-browserify";
      config.resolve.alias["stream"] = "stream-browserify";
    }
    return config;
  },
};

module.exports = nextConfig;
