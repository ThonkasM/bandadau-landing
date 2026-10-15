'use client';

import { useTranslation } from 'react-i18next';

export function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-action-primary px-4 py-3 font-semibold text-action-primary-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {t('a11y.skipToContent')}
    </a>
  );
}
