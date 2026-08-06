# Content Declassification (portable recreation spec)

Progressive information-unlock where five censored fragments of a classified
archive sheet are invalidated and removed in sequence after a DECLASSIFIED stamp
lands. Rebuild from this document and `contract.json`.

**Distinct from Redacted Content Lock (SPX-133):** that specimen locks/unlocks a
card by retracting the same bars that entered (near-symmetric). This specimen is
a one-way disclosure narrative — stamp first, then three distinct removal
behaviours in a fixed order. It is not RCL played backward.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Security note (required)

Visual redaction is **not** access control. Production integrations must enforce
permissions outside CSS. Do not ship sensitive strings in client markup unless
the user is authorised. This demo switches accessible copy only after the demo
clearance button is pressed.

## Visual intent

- Fictional sheet: `ARCHIVE DOCUMENT // 042`
- Five redacted fragments: NIGHTFALL, APPROVED, new archive, Friday, INTERNAL
- `GRANT CLEARANCE` → DECLASSIFIED stamp → sequential bar removals →
  `CLEARANCE ACCEPTED`
- Underlying visual text exists beneath bars from the start
- While locked, AT hears a classified summary, not the restricted values

## DOM outline

```html
<div class="cdc" data-content-declass data-state="locked">
  <article class="cdc__sheet" aria-hidden="true">
    <!-- rows / body / footer with .cdc__censor wrappers -->
    <div class="cdc__stamp" aria-hidden="true">DECLASSIFIED</div>
    <p class="cdc__accepted" aria-hidden="true">CLEARANCE ACCEPTED</p>
  </article>
  <button type="button" data-cdc-grant>GRANT CLEARANCE</button>
  <p role="status" data-cdc-status>Classified archive document. Five fields restricted.</p>
</div>
```

Bars sit on local text wrappers (not global coordinates).

## Colours

| Token | Value |
| ----- | ----- |
| Paper | `#f5f1e8` |
| Black | `#090909` |
| Red | `#e60012` |

## Behaviours (frozen order)

| Index | Fragment | Behaviour |
| ----- | -------- | --------- |
| 0 | NIGHTFALL | split (slash → halves leave) |
| 1 | APPROVED | strike-and-pull |
| 2 | new archive | peel |
| 3 | Friday | split |
| 4 | INTERNAL | strike-and-pull |

## Timing (frozen, total ≈1380ms)

| Phase | Time |
| ----- | ---- |
| Stamp attack | `0–260ms` |
| Bar *n* starts | `260 + n×130ms` |
| Slash (split/strike) | `90ms` |
| Leave travel | `180ms` |
| CLEARANCE ACCEPTED | `160ms` after final clear |

Stamp initial → impact → settle: `translate(70px,-60px) rotate(-16deg) scale(1.7)` →
`rotate(-8deg) scale(0.92)` → `scale(1)`. Sheet react ≤`2px`.

Split leave: left `-45px -8px`, right `48px 6px`.

## Reduced motion

Immediate full disclosure. Static corner `DECLASSIFIED` + `CLEARANCE ACCEPTED`.
No slam, peel, slash, or travel.

## API

- `grantClearance()`
- `resetContentDeclassification()` / harness `{ type: 'restart' }`

## Porting

1. Copy DOM + CSS + JS.
2. Keep frozen bar clip-paths, rotations (−1.5°…2°), order, and timings.
3. Enforce real permissions outside this demo.
4. No external assets, fonts, libraries, or network.
