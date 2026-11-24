import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 90 é usado nas fotos grandes (hero e "Sobre"); o resto usa o padrão 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
