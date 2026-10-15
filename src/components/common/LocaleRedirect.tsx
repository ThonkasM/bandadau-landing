'use client';

import { useEffect } from 'react';

import { detectBrowserLocale } from '@/lib/locale';

/** `/` → `/es/` o `/en/` según la elección guardada o el idioma del navegador (fallback `es`). */
export function LocaleRedirect() {
  useEffect(() => {
    window.location.replace(`/${detectBrowserLocale()}/${window.location.hash}`);
  }, []);
  return null;
}
