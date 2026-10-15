# bandadau-landing

Sitio público de marketing de Bandada U (es/en): hero con mockup de la app, problema/solución, funciones, cómo funciona,
**eventos destacados** (`GET /api/v1/events?public=true`, con fallback a datos de ejemplo), FAQ, CTA, footer,
`/privacidad`·`/terminos` (`/en/privacy`·`/en/terms`) y 404.

| | |
|---|---|
| Stack | Next.js 16 static export · Tailwind v4 · tokens `@bandada/ui-tokens` · i18n `@bandada/i18n` (+ namespace `landing`) |
| Puerto dev | 3000 |
| Rutas | `/` (redirige) · `/es/` · `/en/` · dominio `bandada.localhost` |
| Casos de uso | UC-01, UC-03 |

```bash
cd ../bandadau-shared && corepack pnpm install --frozen-lockfile && corepack pnpm build   # una vez
cp .env.example .env && corepack pnpm install
corepack pnpm dev            # http://localhost:3000
corepack pnpm build          # out/ (S3 + CloudFront)
corepack pnpm typecheck && corepack pnpm lint && corepack pnpm test && corepack pnpm i18n:check
```

Variables (`.env.example`): `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_ADMIN_URL`, `NEXT_PUBLIC_SITE_URL`.
Capturas de verificación en `docs/screenshots/`. Reglas, arquitectura y gotchas: **[`AGENTS.md`](AGENTS.md)**.
Fuente de verdad del sistema: `bandadau-docs/docs/03-arquitectura/catalogo-servicios.md`.
