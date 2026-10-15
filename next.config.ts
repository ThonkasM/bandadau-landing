import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // No reescribir AGENTS.md automáticamente al correr `next dev`.
  agentRules: false,
  // 404 global: hay varios layouts raíz (app/[locale] y app/(redirect)), así que no existe un layout común.
  experimental: { globalNotFound: true },
  // Los paquetes @bandada/* se instalan como `file:` (copia): se transpilan junto a la app.
  transpilePackages: ['@bandada/i18n', '@bandada/ui-tokens'],
};

export default nextConfig;
