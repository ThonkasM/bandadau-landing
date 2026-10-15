import { env } from './env';

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export interface RequestOptions {
  locale: string;
  signal?: AbortSignal;
  /** Tiempo máximo en ms antes de abortar (por defecto 6 s). */
  timeoutMs?: number;
  baseUrl?: string;
}

function newCorrelationId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Único chokepoint HTTP: URL base de variables públicas, `Accept-Language`, `X-Correlation-Id` y Problem Details. */
export async function apiGet<T>(path: string, { locale, signal, timeoutMs = 6000, baseUrl = env.apiUrl }: RequestOptions): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Accept-Language': locale, 'X-Correlation-Id': newCorrelationId() },
      signal: controller.signal,
    });
    if (!response.ok) {
      let code: string | undefined;
      let title = response.statusText;
      try {
        const problem = (await response.json()) as { code?: string; title?: string };
        code = problem.code;
        title = problem.title ?? title;
      } catch {
        /* cuerpo no JSON */
      }
      throw new ApiError(response.status, title, code);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}
