import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**', // Isso permite todas as imagens na pasta /photos/
      },
    ],
  },
};

export default nextConfig;
