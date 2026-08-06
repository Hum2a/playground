# Specimen Archive

Live site: **https://playground.humza-butt.space**

A static catalogue of portable motion artifacts — live sandboxed previews, recreation prompts, and a playground for exporting new specimens.

## Stack

- React 19 + Vite + TypeScript
- Cloudflare Pages (`playground`) → custom domain `playground.humza-butt.space`
- Config: [`wrangler.toml`](./wrangler.toml)

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local Vite dev server |
| `npm run build` | Production build → `dist` |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smokes |
| `npm run spec:new -- <slug>` | Scaffold a specimen folder |
| `npm run spec:check` | Validate the specimen registry |
| `npm run deploy:preview` | Build + Wrangler Pages preview deploy |
| `npm run deploy:prod` | Build + Wrangler Pages production deploy |

## Specimens

Add a folder under `src/specimens/`, register it in `src/specimens/index.ts`, run `npm run spec:check`.

See [`docs/design-spec.md`](./docs/design-spec.md) and [`AGENTS.md`](./AGENTS.md).
