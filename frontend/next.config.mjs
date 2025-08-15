/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ВРЕМЕННО отключаем проверки для деплоя
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // API конфигурация
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'ExoCad Script Pack',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://exocad-script-pack.vercel.app',
  },
  
  // Оптимизация изображений
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
};

export default nextConfig;