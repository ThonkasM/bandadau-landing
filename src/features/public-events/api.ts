import type { Locale } from '@bandada/i18n';

import { apiGet } from '@/lib/api-client';

import type { PublicEvent, PublicEventsResult } from './types';

export const PUBLIC_EVENTS_PATH = '/api/v1/events?public=true&limit=6';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Normaliza un ítem de la API; devuelve `null` si no tiene la forma mínima del contrato. */
export function toPublicEvent(raw: unknown): PublicEvent | null {
  if (!isRecord(raw)) return null;
  const { id, title, venue, startsAt, priceCredits, seatsAvailable, capacity, coverUrl, status } = raw;
  if (typeof id !== 'string' || typeof title !== 'string' || typeof startsAt !== 'string') return null;
  if (typeof status === 'string' && status !== 'PUBLISHED') return null;
  if (Number.isNaN(Date.parse(startsAt))) return null;
  return {
    id,
    title,
    venue: typeof venue === 'string' ? venue : '',
    startsAt,
    priceCredits: typeof priceCredits === 'number' ? priceCredits : 0,
    seatsAvailable: typeof seatsAvailable === 'number' ? seatsAvailable : 0,
    capacity: typeof capacity === 'number' ? capacity : 0,
    coverUrl: typeof coverUrl === 'string' ? coverUrl : null,
  };
}

export function parsePublicEvents(payload: unknown): PublicEvent[] {
  const items = isRecord(payload) && Array.isArray(payload.items) ? payload.items : [];
  return items.map(toPublicEvent).filter((event): event is PublicEvent => event !== null);
}

export interface SampleEventTexts {
  docker: { title: string; venue: string };
  career: { title: string; venue: string };
  hack: { title: string; venue: string };
}

/** Datos de ejemplo con fechas relativas a `now` (nunca quedan vencidos). Los textos vienen del catálogo. */
export function buildSampleEvents(texts: SampleEventTexts, now: Date = new Date()): PublicEvent[] {
  const at = (days: number, hour: number): string => {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() + days);
    date.setUTCHours(hour, 0, 0, 0);
    return date.toISOString();
  };
  return [
    { id: 'sample-docker', ...texts.docker, startsAt: at(9, 22), priceCredits: 20, seatsAvailable: 28, capacity: 40, coverUrl: null },
    { id: 'sample-career', ...texts.career, startsAt: at(14, 19), priceCredits: 0, seatsAvailable: 63, capacity: 120, coverUrl: null },
    { id: 'sample-hack', ...texts.hack, startsAt: at(21, 14), priceCredits: 10, seatsAvailable: 5, capacity: 30, coverUrl: null },
  ];
}

/**
 * `GET /api/v1/events?public=true` (listEvents). Nunca lanza: si la API no responde, es inválida o hay
 * un error de red, devuelve los eventos de ejemplo para no romper el render de la landing.
 */
export async function fetchPublicEvents(
  locale: Locale,
  fallback: () => PublicEvent[],
  options: { signal?: AbortSignal; baseUrl?: string; timeoutMs?: number } = {},
): Promise<PublicEventsResult> {
  try {
    const payload = await apiGet<unknown>(PUBLIC_EVENTS_PATH, { locale, ...options });
    if (!isRecord(payload) || !Array.isArray(payload.items)) throw new Error('INVALID_PAYLOAD');
    return { events: parsePublicEvents(payload), isSample: false };
  } catch {
    return { events: fallback(), isSample: true };
  }
}
