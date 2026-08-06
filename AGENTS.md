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

## New specimen commits

After a new specimen is registered and verified, agents auto-commit it (`Add SPX-NNN …`) without waiting to be asked. See `.cursor/rules/36_specimen-commits.mdc`.

## Inspiration checklists

- **Persona 5:** [`docs/catalogue/persona-5-specimen-catalogue.md`](docs/catalogue/persona-5-specimen-catalogue.md) — open rows reserve `SPX-015`–`SPX-312`.
- **Persona 3:** [`docs/catalogue/persona-3-specimen-catalogue.md`](docs/catalogue/persona-3-specimen-catalogue.md) — open rows reserve `SPX-400`–`SPX-635`.
- **Pokémon:** [`docs/catalogue/pokemon-specimen-catalogue.md`](docs/catalogue/pokemon-specimen-catalogue.md) — open rows reserve `SPX-700`–`SPX-965`.
- **Dragon Ball:** [`docs/catalogue/dragonball-specimen-catalogue.md`](docs/catalogue/dragonball-specimen-catalogue.md) — open rows reserve `SPX-966`–`SPX-1209`.
- **iOS & macOS:** [`docs/catalogue/ios-macos-specimen-catalogue.md`](docs/catalogue/ios-macos-specimen-catalogue.md) — open rows reserve `SPX-1300`–`SPX-1557`.
- **Android:** [`docs/catalogue/android-specimen-catalogue.md`](docs/catalogue/android-specimen-catalogue.md) — open rows reserve `SPX-1558`–`SPX-1974`.
- **My Hero Academia:** [`docs/catalogue/my-hero-academia-specimen-catalogue.md`](docs/catalogue/my-hero-academia-specimen-catalogue.md) — open rows reserve `SPX-1975`–`SPX-2343`.

When a listed specimen ships, mark it `[x]` in the matching checklist in the same change (`.cursor/rules/37_persona-catalogue.mdc`). Non-catalogue specimens use gaps not reserved by those ranges (typically `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-2344+`).

See `docs/design-spec.md` for the full product contract.
