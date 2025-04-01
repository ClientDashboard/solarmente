// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otras configuraciones...
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // No intentar cargar módulos del servidor en el cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;