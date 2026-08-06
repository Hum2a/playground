# Enemy Scan Reveal

## Visual intent

An analysis primitive: a target begins with unknown metadata (`???`). A vertical
pale-blue scanner travels left → right; when it crosses each field’s x-threshold,
the unknown value is replaced vertically by the classified value. An incomplete
angular outline completes during the scan. A faint grid trails only within ~40px
behind the beam.

Portable to diagnostics, inspections, record analysis, and data enrichment.
SEES / tactical language — original CSS only.

## DOM structure

```
.esr[data-enemy-scan-reveal]
  .esr__card
    .esr__outline[aria-hidden]     corner brackets + edge segments
    .esr__scan-layer[aria-hidden]
      .esr__grid                   ~40px trailing grid
      .esr__beam                   vertical pale-blue line
    .esr__entity                   ENTITY // 07
    dl.esr__fields
      .esr__row[data-field][data-threshold]
        dt / dd (.esr__unknown + .esr__known)
  .esr__complete                   ANALYSIS COMPLETE
  button[data-esr-analyse]         ANALYSE
  .esr__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Entity | `ENTITY // 07` |
| Unknowns | `TYPE ???` · `STATUS ???` · `RISK ???` · `SIGNATURE ???` |
| Known | `GLASS` · `STABLE` · `LOW` · `BLUE` |
| Trigger | `ANALYSE` |
| Complete | `ANALYSIS COMPLETE` |
| Status | `Analysis complete. Entity 07 classified.` |

## Palette

| Token | Hex |
| --- | --- |
| Near | `#020912` |
| Deep | `#0a1c30` |
| Panel | `#0f2438` |
| Blue | `#3f83d1` |
| Pale | `#cfe5ff` |
| Mute | `#6a8499` |

## Thresholds (frozen)

Scanner progress `t ∈ [0,1]` over **720ms**. Reveal when `t ≥ threshold`:

| Field | Threshold |
| --- | --- |
| TYPE | `0.22` |
| STATUS | `0.40` |
| RISK | `0.58` |
| SIGNATURE | `0.76` |

Reveal motion: unknown `translateY(-110%)`, known `translateY(0)` — **no fade**.

## Outline

Idle: corner brackets only + edge segments at `scale 0.18`.
During scan: edges animate to full over 720ms.
Done: full angular frame locked.

## Grid

Width **40px**, positioned behind the beam (`translateX(scanX - 40px)`). Not a permanent full-card grid.

## Timing

| Phase | Duration | Notes |
| --- | --- | --- |
| Scan | 720ms | Beam L→R; progressive reveals |
| Complete | +40ms | `ANALYSIS COMPLETE`; static done state |

## Reduced motion

Immediate full reveal + complete outline + `ANALYSIS COMPLETE`. No beam travel.

## Accessibility

- `ANALYSE` is a real button
- Scanner / outline / grid decorative (`aria-hidden`)
- Status announces completion once

## Porting

Import `demo.css` verbatim. API: `runEnemyScan` / `resetEnemyScan` / `replayEnemyScan`. Harness `{ type: 'restart' }`.
