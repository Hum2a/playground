# Agent notes — playground.humza-butt.space

Static specimen catalogue. Content lives in git; no accounts, database, or CMS.

**Production URL:** https://playground.humza-butt.space  
**Pages project:** `playground` (see [`wrangler.toml`](./wrangler.toml))

## Monochrome chrome

Site chrome is monochrome by policy. The only accent is `--verdigris` (`#4E9E8F`), used solely for interactive affordances (focus rings, active states, copy confirmation). Never use it decoratively, as a gradient, or on more than one element at a time in a viewport. Colour on the page otherwise comes only from specimens rendered inside previews.

## Sandboxed iframe previews

Every specimen preview renders in an `<iframe>` with `sandbox="allow-scripts"` only. Never add `allow-same-origin` alongside it — that combination un-sandboxes the frame. Specimens must not read the parent, use storage, or navigate.

## Portable specimen CSS

Specimen CSS is never edited to fit the site. It stays verbatim and portable — no scoping prefixes, no restyling to match chrome tokens. Isolation comes from the iframe, not from CSS modules or renamed classes.

## Taxonomy

Every specimen needs required `facets` (kind / tech / scope / intensity) plus optional free `tags`. Game lineage uses optional `inspiredBy` from the inspiration directory (`src/specimens/inspiration.ts`, `docs/inspiration-directory.md`). See `.cursor/rules/35_taxonomy.mdc`.

## Specimen layout

- Demos live under `src/specimens/library/<franchise>/<id>/` (franchise matches `inspiredBy`, else `original`).
- Registry is **sharded**: `registry/shards/<franchise>.ts` + canonical `registry/order.ts`, assembled in `registry/assemble.ts`. `index.ts` is a thin barrel only — never a mega import list. No `import.meta.glob`.
- Prefer `npm run spec:ship` from `.wip-aside/<id>/` when adding specimens (parallel-agent safe). See `.cursor/rules/20_structure.mdc` / `30_specimens.mdc`.

## New specimen commits

After a new specimen is registered and verified, agents auto-commit it (`Add SPX-NNN …`) without waiting to be asked. See `.cursor/rules/36_specimen-commits.mdc`.

## Load performance

Catalogue registry entries are **metadata only**. HTML/CSS/JS/spec/contract live in each folder’s `payload.ts` and load via explicit `loadPayload` (never `import.meta.glob`). Routes are code-split so Shell paints before specimen meta; the filtered plate grid is windowed and its iframes start unmounted until near the viewport. See `.cursor/rules/20_structure.mdc` / `55_catalogue.mdc` / `60_testing.mdc`.

## Inspiration checklists

- **Persona 5:** [`docs/catalogue/persona-5-specimen-catalogue.md`](docs/catalogue/persona-5-specimen-catalogue.md) — open rows reserve `SPX-015`–`SPX-312`.
- **Persona 3:** [`docs/catalogue/persona-3-specimen-catalogue.md`](docs/catalogue/persona-3-specimen-catalogue.md) — open rows reserve `SPX-400`–`SPX-635`.
- **Pokémon:** [`docs/catalogue/pokemon-specimen-catalogue.md`](docs/catalogue/pokemon-specimen-catalogue.md) — open rows reserve `SPX-700`–`SPX-965`.
- **Dragon Ball:** [`docs/catalogue/dragonball-specimen-catalogue.md`](docs/catalogue/dragonball-specimen-catalogue.md) — open rows reserve `SPX-966`–`SPX-1209`.
- **iOS & macOS:** [`docs/catalogue/ios-macos-specimen-catalogue.md`](docs/catalogue/ios-macos-specimen-catalogue.md) — open rows reserve `SPX-1300`–`SPX-1557`.
- **Android:** [`docs/catalogue/android-specimen-catalogue.md`](docs/catalogue/android-specimen-catalogue.md) — open rows reserve `SPX-1558`–`SPX-1974`.
- **My Hero Academia:** [`docs/catalogue/my-hero-academia-specimen-catalogue.md`](docs/catalogue/my-hero-academia-specimen-catalogue.md) — open rows reserve `SPX-1975`–`SPX-2343`.
- **Naruto:** [`docs/catalogue/naruto-specimen-catalogue.md`](docs/catalogue/naruto-specimen-catalogue.md) — open rows reserve `SPX-2344`–`SPX-2918`.
- **Persona 4:** [`docs/catalogue/persona-4-specimen-catalogue.md`](docs/catalogue/persona-4-specimen-catalogue.md) — open rows reserve `SPX-2919`–`SPX-3109`.
- **Netflix:** [`docs/catalogue/netflix-specimen-catalogue.md`](docs/catalogue/netflix-specimen-catalogue.md) — open rows reserve `SPX-3110`–`SPX-3306`.
- **PlayStation:** [`docs/catalogue/playstation-specimen-catalogue.md`](docs/catalogue/playstation-specimen-catalogue.md) — open rows reserve `SPX-3307`–`SPX-3522`.
- **Newspaper & Editorial:** [`docs/catalogue/newspaper_editorial_motion_ui_specimen_catalogue.md`](docs/catalogue/newspaper_editorial_motion_ui_specimen_catalogue.md) — open rows reserve `SPX-3523`–`SPX-3759`.
- **Music Equipment:** [`docs/catalogue/music_equipment_motion_ui_specimen_catalogue.md`](docs/catalogue/music_equipment_motion_ui_specimen_catalogue.md) — open rows reserve `SPX-3760`–`SPX-4069`.
- **Manga:** [`docs/catalogue/manga_motion_ui_specimen_catalogue.md`](docs/catalogue/manga_motion_ui_specimen_catalogue.md) — open rows reserve `SPX-4070`–`SPX-4339`.

When a listed specimen ships, mark it `[x]` in the matching checklist in the same change (`.cursor/rules/37_persona-catalogue.mdc`). Non-catalogue specimens use gaps not reserved by those ranges (typically `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-3523+`).

See `docs/design-spec.md` for the full product contract.
