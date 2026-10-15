# AGENTS.md — bandadau-landing (F1)

Repositorio de la landing (ADR-0017). Lee primero `../AGENTS.md` (workspace), `bandadau-docs/docs/04-patrones-y-reglas/frontend-guidelines.md` (§1 y §2.1),
`design-tokens-y-temas.md`, `i18n.md` y `bandadau-docs/docs/01-vision/marca-y-dominio.md`.

## Identidad

Sitio público de marketing de Bandada U (`bandada.localhost` / `bandadau.com`): propuesta de valor,
eventos públicos próximos, estadísticas públicas, FAQ y botones **"Entrar"** (app web) y **"Panel"**
(admin) del acceso único (D4, T13). Bilingüe `es`/`en` con rutas por idioma para SEO.

## Stack

Next.js 16.4 (App Router, **static export**) · React 19 · Tailwind CSS v4 · `@bandada/ui-tokens` ·
`@bandada/i18n` (`i18next` 26 + `react-i18next` + `i18next-icu`) · TanStack Query · lucide-react ·
Vitest + Testing Library. **Esta versión de Next.js tiene cambios incompatibles**: lee
`node_modules/next/dist/docs/` antes de usar una API. (`agentRules: false` en `next.config.ts` evita que
`next dev` reescriba este archivo.)

## Arquitectura y carpetas

```
bandadau-landing/
├── app/
│   ├── globals.css                @import tailwindcss + tokens.css + tailwind-theme.css; utilidades (container-page, fondos), animaciones
│   ├── global-not-found.tsx       404 global (experimental.globalNotFound; hay varios layouts raíz)
│   ├── (redirect)/                `/` → layout raíz propio + redirección en cliente (LocaleRedirect) a /es/ o /en/
│   └── [locale]/                  LAYOUT RAÍZ: <html lang>, fuentes, themeScript, Providers; generateStaticParams es|en
│       ├── page.tsx               compone las secciones
│       └── [legal]/page.tsx       /es/privacidad, /es/terminos, /en/privacy, /en/terms
├── src/
│   ├── components/{layout,sections,ui,common}   Navbar, Footer, LegalPage · Hero, AppMockup, Problem, Features, HowItWorks, PublicEvents, Faq, FinalCta · Section, ButtonLink, Logo (LogoMark/FlockArt), PhoneFrame, QrCode · Providers, Reveal, ThemeToggle, LanguageSwitcher
│   ├── features/public-events/    api.ts (cliente + fallback), use-public-events.ts (TanStack Query), types
│   └── lib/                       api-client, env, i18n (createI18n/getT), locale (detección, slugs legales), theme, metadata, fonts
├── locales/{es,en}/landing.json   namespace propio `landing` (los de common/errors/enums vienen de @bandada/i18n)
├── public/favicon.svg
├── docs/screenshots/              capturas de verificación (claro/oscuro, móvil/escritorio)
└── next.config.ts                 output:'export', trailingSlash:true, images.unoptimized, globalNotFound
```

## Comandos (desde la raíz del repo)

Requiere `../bandadau-shared` compilado: `cd ../bandadau-shared && corepack pnpm install --frozen-lockfile && corepack pnpm build`.

```bash
corepack pnpm install
corepack pnpm dev                  # http://localhost:3000
corepack pnpm build                # static export → out/
corepack pnpm lint && corepack pnpm typecheck
corepack pnpm test                 # Vitest (idioma, cliente de eventos con fallback, componentes)
corepack pnpm i18n:check           # paridad es/en + ICU (los avisos "unused key" son claves dinámicas; esperados)
```

`@bandada/*` se consumen como `"file:../bandadau-shared/packages/<pkg>"` (copias: tras recompilar shared, `pnpm install` de nuevo).

## Variables de entorno (`.env.example`)

```
NEXT_PUBLIC_API_URL=http://api.bandada.localhost
NEXT_PUBLIC_APP_URL=http://app.bandada.localhost
NEXT_PUBLIC_ADMIN_URL=http://admin.bandada.localhost
NEXT_PUBLIC_SITE_URL=http://bandada.localhost   # canonical, hreflang, Open Graph
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
- Los eventos públicos se cargan en cliente (TanStack Query) para no congelarlos en el build. `fetchPublicEvents`
  **nunca lanza**: ante error de red/CORS/HTTP/forma inválida devuelve 3 eventos de ejemplo (textos en el catálogo,
  fechas relativas) y la UI muestra un aviso. Una lista vacía real se muestra como vacía. El GET no envía
  `X-Correlation-Id` para evitar el preflight CORS (la API permite `http://localhost:3000`, no otros puertos).
- i18n: cada página se prerenderiza con una instancia i18next propia (`Providers`), `getT(locale)` para metadata. `/` redirige
  según `bandada.locale` → `navigator.languages` → `es`. Las páginas legales usan slug por idioma (`LEGAL_SLUGS`).
- Tema: `themeScript` (anti-parpadeo) + `ThemeToggle` (Automático/Claro/Oscuro, clave `bandada.theme`). Las tipografías
  (Rubik + IBM Plex Sans, `next/font`) sobrescriben solo `--bd-font-family-*` en `globals.css`.
- Los hex solo existen en `public/favicon.svg` (ilustración propia). Un `<img>` de portada requiere el comentario eslint (export estático).
- Mobile-first, objetivos táctiles ≥ 44 px, `prefers-reduced-motion`.
- Deploy: `out/` → S3 + CloudFront (HTML `no-cache`, assets con hash 1 año).

## Casos de uso

UC-01 (entrada al registro vía "Entrar"), UC-03 (enlaces "Entrar"/"Panel"), guion de defensa paso 1.

## Definición de hecho

`definition-of-done.md` §0 y §4 (pantalla) + Lighthouse SEO/a11y ≥ 90 en `/es` y `/en`, ambos temas.
