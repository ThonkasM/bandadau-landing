/** Variables públicas hornadas en el build (`NEXT_PUBLIC_*`). Nunca URLs escritas a mano en componentes. */
const trimSlash = (value: string): string => value.replace(/\/+$/, '');

export const env = {
  apiUrl: trimSlash(process.env.NEXT_PUBLIC_API_URL ?? 'http://api.bandada.localhost'),
  appUrl: trimSlash(process.env.NEXT_PUBLIC_APP_URL ?? 'http://app.bandada.localhost'),
  adminUrl: trimSlash(process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://admin.bandada.localhost'),
  siteUrl: trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://bandada.localhost'),
} as const;
