'use client';

import type { Locale } from '@bandada/i18n';
import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode,useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { createI18n } from '@/lib/i18n';
import { createQueryClient } from '@/lib/query-client';

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [i18n] = useState(() => createI18n(locale));
  const [queryClient] = useState(createQueryClient);
  if (i18n.language !== locale) void i18n.changeLanguage(locale);
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
}
