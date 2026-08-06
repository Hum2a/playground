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

Every specimen needs required `facets` (kind / tech / scope / intensity) plus optional free `tags`. See `.cursor/rules/35_taxonomy.mdc` and `src/specimens/taxonomy.ts`.

## New specimen commits

After a new specimen is registered and verified, agents auto-commit it (`Add SPX-NNN …`) without waiting to be asked. See `.cursor/rules/36_specimen-commits.mdc`.

See `docs/design-spec.md` for the full product contract.
