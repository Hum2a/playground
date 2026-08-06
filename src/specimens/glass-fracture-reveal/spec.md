# Glass Fracture Reveal (portable recreation spec)

Disclosure where a coherent blue glass pane seals content until pressure,
fracture, and regional separation expose the record underneath. Reveal/unlock
primitive — not a page transition. No copyrighted assets.

## Visual intent

- One unbroken glass pane (~88% of stage) with seal copy `RESTRICTED RECORD` /
  `CONTENT SEALED`
- Impact origin frozen at **63% 42%** of the pane
- Exactly **5** major fracture paths (2–4 segments each) + **3** short secondary
  branches
- Pane divides into **6** complementary polygon shards that separate outward
- Underlying `RECORD // 042` / `ACCESS GRANTED` exists from t0 — no crossfade
- Thin pale edge trace (~180ms) after exposure; final state static

## DOM structure

```html
<div class="gfr" data-glass-fracture data-phase="idle">
  <div class="gfr__stage">
    <div class="gfr__record" aria-hidden="true" inert>…</div>
    <div class="gfr__pane" aria-hidden="true">
      <span class="gfr__seal">…</span>
      <span class="gfr__shard gfr__shard--1…6"></span>
      <span class="gfr__impact"></span>
      <svg class="gfr__cracks">…5 major + 3 secondary…</svg>
    </div>
    <div class="gfr__edge" aria-hidden="true"></div>
  </div>
  <button type="button" data-gfr-reveal>REVEAL</button>
  <button type="button" data-gfr-reset>RESET</button>
  <div role="status" aria-live="polite" data-gfr-live></div>
</div>
```

## Colours

| Token | Value |
| ----- | ----- |
| Near-black | `#020a14` |
| Glass dark | `#0b3553` |
| Glass mid | `#17688e` |
| Glass bright | `#4eb8dc` |
| Pale | `#d5f6ff` |

## Frozen geometry

Impact origin: `63% 42%`

### Major fractures (SVG viewBox 0–100)

| # | Path |
| - | ---- |
| 1 | `M63 42 L66 22 L70 0` |
| 2 | `M63 42 L78 30 L92 18 L100 12` |
| 3 | `M63 42 L82 48 L100 58` |
| 4 | `M63 42 L58 62 L52 82 L48 100` |
| 5 | `M63 42 L38 40 L18 36 L0 32` |

### Secondary branches

| # | Path |
| - | ---- |
| s1 | `M66 22 L58 14` |
| s2 | `M82 48 L88 40` |
| s3 | `M58 62 L68 70` |

### Shard clip-paths (pane %)

Documented in `demo.css` / `contract.json` as six complementary polygons whose
edges follow the major crack network.

### Separation transforms

| Shard | Translate | Rotate |
| ----- | --------- | ------ |
| 1 | `-72px -58px` | `-11deg` |
| 2 | `48px -64px` | `8deg` |
| 3 | `85px 12px` | `12deg` |
| 4 | `70px 78px` → settled `92px 96px` | `-7deg` / `-9deg` |
| 5 | `-40px 82px` | `5deg` |
| 6 | `-78px 18px` → settled `-88px 8px` | `-4deg` / `-3deg` |

## Choreography

| Phase | Timing | Behaviour |
| ----- | ------ | --------- |
| Pressure | 0–100ms | Pale impact `4px → 14px → 7px` at origin |
| Fracture | ~100–260ms | Five majors draw; three secondaries from ~180ms |
| Separate | 300–620ms | Six shards travel ~35–85px, rotate ~3–12deg |
| Edge | 620–800ms | Thin pale edge trace ~180ms |
| Settled | — | Static; shards mostly off content; 1–2 edge clips |

## Reduced motion

Immediately hide pane and expose record. Triggers:
`prefers-reduced-motion: reduce` and `data-force-reduced-motion="true"`.

## Accessibility

Record starts `aria-hidden` + `inert`. On reveal, remove both and announce once:
`Record 042. Access granted. Recovered specimen metadata.`
Cracks/pane decorative (`aria-hidden`).

## Porting

1. Copy HTML + CSS + JS (or generate from `contract.json`).
2. Call `revealGlassFracture()` / `resetGlassFracture()`.
3. Keep frozen origin, crack paths, shard polygons, and separation transforms.
4. Content must exist under the pane from the start — never fade it in.
5. No React, Tailwind, host tokens, external fonts, or network.
