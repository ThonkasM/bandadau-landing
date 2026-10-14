# bandadau-landing

Sitio público de marketing (es/en), eventos públicos y botones de entrada a la app y al panel.

| | |
|---|---|
| Stack | Next.js 16 static export · Tailwind v4 · tokens `@bandada/ui-tokens` · i18n `@bandada/i18n` |
| Puerto dev | 3000 |
| Rutas / dominio | `bandada.localhost` |
| Casos de uso | UC-01, UC-03 |

```bash
pnpm dev      # desarrollo (requiere `make infra-up` en ../bandadau-infra)
pnpm test     # pruebas
```

Configuración: copia `.env.example` a `.env`. Reglas, arquitectura, contratos, colas y gotchas:
**[`AGENTS.md`](AGENTS.md)** (lectura obligatoria para agentes de IA y personas).
Fuente de verdad del sistema: `bandadau-docs/docs/03-arquitectura/catalogo-servicios.md`.
