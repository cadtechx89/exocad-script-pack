/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // ✅ Отключить TypeScript ошибки
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Пропустить ESLint
  },
  experimental: {
    typedRoutes: false,       // ✅ Отключить типизированные роуты
  },
};

export default nextConfig;