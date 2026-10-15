import type { Locale } from '@bandada/i18n';
import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

import { Providers } from '@/components/common/Providers';

export function renderWithProviders(ui: ReactElement, locale: Locale = 'es'): RenderResult {
  return render(<Providers locale={locale}>{ui}</Providers>);
}
