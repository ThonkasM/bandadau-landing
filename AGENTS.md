# AGENTS.md — bandadau-landing (F1)

Repositorio de la landing (ADR-0017). Lee primero `../AGENTS.md` (workspace), `bandadau-docs/docs/04-patrones-y-reglas/frontend-guidelines.md` (§1 y §2.1),
`design-tokens-y-temas.md`, `i18n.md` y `bandadau-docs/docs/01-vision/marca-y-dominio.md`.

## Identidad

Sitio público de marketing de Bandada U (`bandada.localhost` / `bandadau.com`): propuesta de valor,
eventos públicos próximos, estadísticas públicas, FAQ y botones **"Entrar"** (app web) y **"Panel"**
(admin) del acceso único (D4, T13). Bilingüe `es`/`en` con rutas por idioma para SEO.

## Stack

Next.js 16 (App Router, **static export**) · React 19 · Tailwind CSS v4 · `@bandada/ui-tokens` ·
`@bandada/i18n` (`i18next` + `react-i18next` + `i18next-icu`) · TanStack Query · Vitest + Testing Library ·
Playwright + axe. **Esta versión de Next.js tiene cambios incompatibles**: lee
`node_modules/next/dist/docs/` antes de usar una API.

## Arquitectura y carpetas

```
bandadau-landing/
├── app/
│   ├── layout.tsx                 html raíz mínima + script inline de tema (data-theme antes del pintado)
│   ├── page.tsx                   redirección en cliente al idioma resuelto (fallback /es)
│   ├── globals.css                @import "tailwindcss" + tokens.css + tailwind-theme.css
│   └── [locale]/
│       ├── layout.tsx             generateStaticParams → es, en; <html lang>, hreflang, metadata traducida
│       ├── page.tsx               compone secciones
│       └── privacy/ terms/
├── src/
│   ├── components/{layout,sections,ui,common}   Navbar, Footer, Hero, Features, PublicEvents, Faq, ThemeToggle, LanguageSwitcher
│   ├── lib/                       api-client.ts, query-client.ts, query-keys.ts, i18n.ts
│   └── features/public-events/    hooks TanStack (listEvents public=true)
├── locales/{es,en}/landing.json
├── public/                        logos, og images
├── e2e/                           Playwright (fixtures del contrato)
└── next.config.ts                 output: 'export', trailingSlash: true, images.unoptimized: true
```

## Comandos (propuestos, desde la raíz del repo)

```bash
pnpm dev                           # http://localhost:3000 (Traefik: bandada.localhost)
pnpm build                         # static export → out/
pnpm lint && pnpm typecheck
pnpm test                          # Vitest
pnpm test:e2e                      # Playwright (API mockeada)
pnpm i18n:check
```

`@bandada/ui-tokens` e `@bandada/i18n` se consumen como `"file:../bandadau-shared/packages/<pkg>"`.

## Variables de entorno (`.env.example`)

```
NEXT_PUBLIC_API_URL=http://api.bandada.localhost
NEXT_PUBLIC_APP_URL=http://app.bandada.localhost
NEXT_PUBLIC_ADMIN_URL=http://admin.bandada.localhost
NEXT_PUBLIC_DEFAULT_LOCALE=es
```

Todas son públicas y se hornean en el build (cambiarlas exige rebuild).

## Puertos y contratos

Dev **3000**. Consume REST público: `GET /api/v1/events?public=true` (`listEvents`) y estadísticas
públicas (si se agregan, **primero al contrato**). Sin JWT.

## Reglas específicas y gotchas

- Static export: sin SSR en runtime, sin API routes, sin middleware, sin `next/image` optimizado.
- **Prohibido hex/paleta cruda**: solo tokens semánticos (`bg-canvas`, `text-primary`, `bg-action-primary`).
  Modo **claro y oscuro obligatorio**; sin `dark:` para colores.
- **Prohibido texto literal**: todo en `locales/{es,en}/landing.json` (ICU); metadata, `alt`, `aria-label` incluidos.
  Rutas `/es/...` y `/en/...`, `hreflang` y `<html lang>` correctos.
- El cliente HTTP envía `Accept-Language` con el idioma activo; errores mapeados por `code` (`@bandada/i18n`).
- Los eventos públicos se cargan en cliente (TanStack Query) para no congelarlos en el build.
- Mobile-first, objetivos táctiles ≥ 44 px, `prefers-reduced-motion`.
- Deploy: `out/` → S3 + CloudFront (HTML `no-cache`, assets con hash 1 año).

## Casos de uso

UC-01 (entrada al registro vía "Entrar"), UC-03 (enlaces "Entrar"/"Panel"), guion de defensa paso 1.

## Definición de hecho

`definition-of-done.md` §0 y §4 (pantalla) + Lighthouse SEO/a11y ≥ 90 en `/es` y `/en`, ambos temas.
