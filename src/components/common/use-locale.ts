'use client';

import type { Locale } from '@bandada/i18n';
import { useTranslation } from 'react-i18next';

export function useLocale(): Locale {
  const { i18n } = useTranslation();
  return i18n.language === 'en' ? 'en' : 'es';
}
