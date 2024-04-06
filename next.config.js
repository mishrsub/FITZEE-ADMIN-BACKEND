// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@cache'] = false; // Exclude cache folders
    }
    return config;
  },
  reactStrictMode: true,
};
