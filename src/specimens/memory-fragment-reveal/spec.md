# Memory Fragment Reveal

## Visual intent

Six translucent blue memory fragments begin scattered around the stage. On **RECONSTRUCT** they nudge, then converge with staggered arrivals into `MEMORY // 03` / `ARCHIVE`. Only after alignment does the complete message become readable. A thin rule draws, then secondary copy appears. Contemplative — no bursts, no loops. Inspired by Persona 3 themes of memory and identity.

## DOM structure

```
.mfr[data-memory-fragment][data-state]
  .mfr__toolbar
    button[data-mfr-reconstruct]   RECONSTRUCT
    button[data-mfr-scatter]       SCATTER
  .mfr__status[role=status][aria-live=polite]
  .mfr__stage[aria-hidden]
    .mfr__board
      .mfr__bridge                 start-phase link between related fragments
      .mfr__frag[data-frag=1…6]    six major fragments
        .mfr__face / .mfr__glyph   meaningful partial text or structure
        .mfr__seam                 persistent assembled seams
        .mfr__align                ~100ms alignment tick on arrival
      .mfr__finale
        .mfr__rule
        .mfr__secondary
```

## Fragment contents

| # | Depth | Content | Scatter offset |
| --- | --- | --- | --- |
| 1 | mid | `AR` | `-95px -45px` / `-8deg` |
| 2 | front | `CH` | `65px -70px` / `6deg` |
| 3 | front | `IVE` | `110px 18px` / `9deg` |
| 4 | rear | `MEMORY` | `-80px 65px` / `-5deg` |
| 5 | mid | `// 03` | `30px 90px` / `7deg` |
| 6 | rear | structural rails + notch | `-25px -95px` / `-4deg` |

Depth opacity: rear `.55–.65`, mid `.75–.85`, front `.9–1`. No blur.

## Timing

| Phase | Window | Effect |
| --- | --- | --- |
| Start | 0–180ms | Fragments rotate ~1–2° toward final; pale bridge line |
| Converge | 180–730ms | Travel 340ms, stagger 42ms; last arrives ~730ms |
| Align tick | on each arrival | Bright line ~100ms at shared edge |
| Semantic reveal | ~646ms (4th land) | Status → restored copy |
| Lock | 730–910ms | Board scale `.995 → 1.01 → 1` (180ms) |
| Rule | 910–1130ms | Horizontal bright rule L→R (220ms) |
| Secondary | after rule | “The missing record has been restored.” |

Easing: controlled cubic-bezier — no bounce. Nothing loops.

## States

| `data-state` | Role |
| --- | --- |
| `scattered` | Frozen scatter origins |
| `starting` | Nudge + bridge |
| `converging` | Staggered travel to slots |
| `locking` | Restrained scale settle |
| `complete` | Seams + rule + secondary |

## Keyboard / controls

- **RECONSTRUCT** / `reconstructMemoryFragments()`
- **SCATTER** / `scatterMemoryFragments()` — exact original offsets
- Harness `restart` message → scatter

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)` **or** `[data-force-reduced-motion="true"]`:

- Immediate assembled layout with visible seams, rule, and secondary
- No travel, bridge, align ticks, or lock animation

## Accessibility

| Phase | `role="status"` copy |
| --- | --- |
| Before | `Memory fragmented.` |
| After | `Memory restored. Archive. The missing record has been restored.` |

Stage (glyphs / structure) is `aria-hidden`. No duplicate accessible text outside status.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep frozen scatter offsets, stagger (42ms), travel (340ms), and palette.
3. Honour both reduced-motion triggers.
4. Sandbox-safe (`allow-scripts` only).
