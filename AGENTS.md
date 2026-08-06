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

## Persona 5 checklist

Idea backlog with checkboxes and pre-assigned refs: [`docs/catalogue/persona-5-specimen-catalogue.md`](docs/catalogue/persona-5-specimen-catalogue.md). When a listed specimen ships, mark it `[x]` in the same change (`.cursor/rules/37_persona-catalogue.mdc`). Open P5 rows reserve `SPX-015`–`SPX-312`; other new specimens start at `SPX-313+`.

See `docs/design-spec.md` for the full product contract.
