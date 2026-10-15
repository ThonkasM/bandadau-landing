'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocale } from '@/components/common/use-locale';
import { queryKeys } from '@/lib/query-keys';

import { buildSampleEvents, fetchPublicEvents } from './api';

export function usePublicEvents() {
  const { t } = useTranslation();
  const locale = useLocale();
  const samples = useMemo(
    () => ({
      docker: { title: t('events.samples.docker.title'), venue: t('events.samples.docker.venue') },
      career: { title: t('events.samples.career.title'), venue: t('events.samples.career.venue') },
      hack: { title: t('events.samples.hack.title'), venue: t('events.samples.hack.venue') },
    }),
    [t],
  );
  return useQuery({
    queryKey: queryKeys.events.public(locale),
    queryFn: ({ signal }) => fetchPublicEvents(locale, () => buildSampleEvents(samples), { signal }),
  });
}
