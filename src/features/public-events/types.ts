import type { components } from '@bandada/contracts-ts/openapi/events';

/** Evento del contrato `events-service.yaml` (`Event`). */
export type ApiEvent = components['schemas']['Event'];

/** Subconjunto público que pinta la landing. */
export interface PublicEvent {
  id: string;
  title: string;
  venue: string;
  startsAt: string;
  priceCredits: number;
  seatsAvailable: number;
  capacity: number;
  coverUrl: string | null;
}

export interface PublicEventsResult {
  events: PublicEvent[];
  /** `true` cuando la API no respondió y se muestran datos de ejemplo. */
  isSample: boolean;
}
