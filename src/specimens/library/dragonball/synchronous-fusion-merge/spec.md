# Synchronous Fusion Merge

## Visual intent

Two independent software entities (**SOURCE // A** rectangular DATA, **SOURCE // B** diamond RULES) synchronise with mirrored motion, then converge, hold, compress through six radial lines, and resolve as **MODEL // C** — a hybrid geometry with A/B provenance markers. Inspired by Dragon Ball fusion symmetry — no characters or franchise symbols.

## Differentiation vs Linked Fusion (`SPX-1022`)

| | Synchronous (`SPX-1021`) | Linked (`SPX-1022`) |
| --- | --- | --- |
| Driver | Self-synchronisation (mirrored motion, sync segments) | External midpoint **link** (nodes → diamond → tension) |
| Copy | `SOURCE // A·B` → `MODEL // C` | `PROFILE // A·B` → `PROFILE // C` via `LINK ACTIVE` |
| Tell | Entities align *before* converge | Relationship forms first, then pulls |

## DOM structure

```
.sfm[data-sync-fusion][data-state]
  button[data-sfm-fuse]          FUSE
  .sfm__status[role=status]
  .sfm__host
    .sfm__stage[aria-hidden]
      .sfm__sync                 8 segments → continuous line
      .sfm__ent--a / --b / --c
      .sfm__merge                6 radial rays
      .sfm__prov                 A / B provenance
```

## Copy

| Role | Text |
| --- | --- |
| A | `SOURCE // A` / `DATA` / `12 FIELDS` |
| B | `SOURCE // B` / `RULES` / `8 RULES` |
| C | `MODEL // C` / `20 INPUTS` / `MERGED` |
| Provenance | `A` · `B` |

## Geometry (frozen)

| Entity | Size | Shape |
| --- | --- | --- |
| A | `90 × 110px` | Angular rectangle |
| B | `90 × 110px` | Vertical diamond |
| C | `108 × 118px` | Hybrid rect body + diamond crown |

## Timing

| Phase | Window | Duration | Effect |
| --- | --- | --- | --- |
| Sync | 0–280ms | 280ms | Mirrored Y then rotate; 8 segments align |
| Converge | 280–580ms | 300ms | Approach centre; rotate ±12°; scale → .82 |
| Hold | 580–660ms | 80ms | ~12px inner-edge gap |
| Compress | 660–760ms | 100ms | scaleX → .25; 6 radial lines |
| Expand | 760–980ms | 220ms | C scale `.62 → 1.08 → 1`; provenance |

Total ≈ **980ms**. Final state static — no aura, no pulse.

## States

`idle` → `sync` → `converge` → `hold` → `compress` → `expand` → `complete`

## Reduced motion

Immediate MODEL C with A/B provenance markers.

## Accessibility

Status announces independence → synchronising → converging → merging → “Source A and Source B merged into Model C.” Stage is `aria-hidden`.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep frozen geometries and timings (280 / 300 / 80 / 100 / 220).
3. Call `fuseSyncMerge()` / `resetSyncMerge()`.
4. Honour both reduced-motion triggers.
