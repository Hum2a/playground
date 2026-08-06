# Processing Time Skip

## Visual intent

`QUERY // 07` runs stage **REQUEST** normally, recognises a **CACHE HIT**, freezes briefly, then intentionally skips **PARSE / SEARCH / ASSEMBLE** (never activating them). The operation marker vanishes at REQUEST and reappears at **RESULT** with no path between. Final pipeline shows completed vs SKIPPED stages and `NORMAL // 184ms` vs `ACTUAL // 24ms`. Inspired by Time-Skip as omitted processing — no characters or franchise symbols.

## DOM structure

```
.pts[data-pts][data-state]
  button[data-pts-execute]     EXECUTE
  .pts__status[role=status]
  .pts__meta                   QUERY // 07 · MODE
  .pts__host[aria-hidden]
    .pts__pipeline             five fixed stage slots
    .pts__cache                CACHE HIT
    .pts__compare              NORMAL 184ms · ACTUAL 24ms
```

## Copy

| Element | Text |
| --- | --- |
| Operation | `QUERY // 07` |
| Stages | `REQUEST` · `PARSE` · `SEARCH` · `ASSEMBLE` · `RESULT` |
| Trigger | `EXECUTE` |
| Optimisation | `CACHE HIT` · `MODE // TIME-SKIP` |
| Final timing | `RESULT` `24ms` |
| Comparison | `NORMAL // 184ms` · `ACTUAL // 24ms` |

## Timing (frozen)

| Phase | Duration | Effect |
| --- | --- | --- |
| REQUEST | 180ms | Stage 1 runs normally |
| Freeze | 60ms | CACHE HIT; interface held |
| Slices | instant at skip | Exactly 3 lines across PARSE / SEARCH / ASSEMBLE |
| Compress | 70ms | Mid labels `scaleX(1 → .1)` then become `SKIPPED` |
| Marker gap | 45ms | Marker gone at REQUEST; reappears at RESULT (no travel) |
| RESULT | with SKIPPED | Activates; shows `24ms` |

Stages 2–4 never receive `active`. No looping.

## States

`idle` → `request` → `freeze` → `skip` → `marker` → `result` → `complete`

## Reduced motion

Immediately show final pipeline: REQUEST ✓, PARSE/SEARCH/ASSEMBLE SKIPPED, RESULT ✓ `24ms`.

## Accessibility

Status explicitly names skipped stages. Pipeline host is `aria-hidden`.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep frozen timings (180 / 60 / 70 / 45) and three slice lines.
3. Call `executeProcessingTimeSkip()` / `resetProcessingTimeSkip()` (harness restart resets).
4. Honour both reduced-motion triggers.
