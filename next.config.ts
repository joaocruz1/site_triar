/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita compressão de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Habilita compressão de resposta
  compress: true,
  // Otimizações para produção
  swcMinify: true,
  // Configuração de cache para assets estáticos
  staticPageGenerationTimeout: 120,
  // Configuração para CDN
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || '',
  // Otimizações para produção
  productionBrowserSourceMaps: false,
  // Configuração para otimização de fontes
  optimizeFonts: true,
  // Configuração para otimização de scripts
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
