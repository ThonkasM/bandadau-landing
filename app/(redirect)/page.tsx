import Link from 'next/link';

import { LocaleRedirect } from '@/components/common/LocaleRedirect';
import { getT } from '@/lib/i18n';

export default function RootRedirect() {
  const es = getT('es');
  const en = getT('en');
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-canvas px-4 text-center text-primary">
      <LocaleRedirect />
      <p lang="es">{es('redirect.message')}</p>
      <p lang="en">{en('redirect.message')}</p>
      <nav className="flex gap-3">
        <Link href="/es/" hrefLang="es" lang="es" className="inline-flex min-h-11 items-center rounded-lg bg-action-primary px-5 font-semibold text-action-primary-fg">{es('redirect.link')}</Link>
        <Link href="/en/" hrefLang="en" lang="en" className="inline-flex min-h-11 items-center rounded-lg border border-strong px-5 font-semibold">{en('redirect.link')}</Link>
      </nav>
    </main>
  );
}
