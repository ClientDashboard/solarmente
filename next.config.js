/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignora errores de TypeScript durante la compilación
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;