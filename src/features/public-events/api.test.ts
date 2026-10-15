import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { buildSampleEvents, fetchPublicEvents, parsePublicEvents } from './api';

const texts = {
  docker: { title: 'Docker', venue: 'A' },
  career: { title: 'Carrera', venue: 'B' },
  hack: { title: 'Hack', venue: 'C' },
};
const fallback = () => buildSampleEvents(texts, new Date('2026-10-14T00:00:00Z'));

const apiEvent = {
  id: '0192f3b0-7c1e-7a2b-9c3d-4e5f60718293',
  organizerId: '0192f1a2-3b4c-7d5e-8f60-718293a4b5c6',
  title: 'Taller de Docker para principiantes',
  description: 'x',
  coverMediaId: null,
  coverUrl: null,
  startsAt: '2026-10-24T22:00:00Z',
  venue: 'Auditorio',
  capacity: 40,
  seatsTaken: 12,
  seatsAvailable: 28,
  priceCredits: 20,
  status: 'PUBLISHED',
};

describe('fetchPublicEvents', () => {
  const fetchMock = vi.fn();
  beforeEach(() => vi.stubGlobal('fetch', fetchMock));
  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('llama a listEvents público con Accept-Language y normaliza la respuesta', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ items: [apiEvent], nextCursor: null }), { status: 200 }));
    const result = await fetchPublicEvents('en', fallback, { baseUrl: 'http://api.test' });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('http://api.test/api/v1/events?public=true&limit=6');
    expect((init.headers as Record<string, string>)['Accept-Language']).toBe('en');
    expect(result.isSample).toBe(false);
    expect(result.events).toEqual([
      expect.objectContaining({ id: apiEvent.id, title: apiEvent.title, priceCredits: 20, seatsAvailable: 28 }),
    ]);
  });

  it('una lista vacía real no se reemplaza por datos de ejemplo', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ items: [], nextCursor: null }), { status: 200 }));
    expect(await fetchPublicEvents('es', fallback, { baseUrl: 'http://api.test' })).toEqual({ events: [], isSample: false });
  });

  it.each([
    ['error de red', () => fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))],
    ['HTTP 500', () => fetchMock.mockResolvedValue(new Response('{}', { status: 500 }))],
    ['cuerpo no JSON', () => fetchMock.mockResolvedValue(new Response('<html>', { status: 200 }))],
    ['forma inválida', () => fetchMock.mockResolvedValue(new Response(JSON.stringify({ foo: 1 }), { status: 200 }))],
  ])('cae a los eventos de ejemplo ante %s sin lanzar', async (_name, arrange) => {
    arrange();
    const result = await fetchPublicEvents('es', fallback, { baseUrl: 'http://api.test' });
    expect(result.isSample).toBe(true);
    expect(result.events).toHaveLength(3);
  });
});

describe('parsePublicEvents', () => {
  it('descarta ítems inválidos o no publicados', () => {
    const events = parsePublicEvents({
      items: [apiEvent, { ...apiEvent, id: 'x', status: 'DRAFT' }, { id: 1 }, null, { ...apiEvent, id: 'y', startsAt: 'no-fecha' }],
    });
    expect(events.map((event) => event.id)).toEqual([apiEvent.id]);
  });
});

describe('buildSampleEvents', () => {
  it('genera fechas futuras relativas a la fecha actual', () => {
    const now = new Date('2026-10-14T12:00:00Z');
    const events = buildSampleEvents(texts, now);
    expect(events.every((event) => Date.parse(event.startsAt) > now.getTime())).toBe(true);
  });
});
