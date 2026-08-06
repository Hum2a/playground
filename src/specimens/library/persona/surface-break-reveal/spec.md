# Surface Break Reveal

## Visual intent

Content begins submerged beneath a graphic water surface. On **SURFACE** it rises ~70px through the waterline (~38% host height). Portions below the line show clipped ±3px distortion duplicates; portions above stay sharp. Crossing triggers a restrained 8px waterline bump and exactly three ripple marks. Water then exits downward; the recovered record remains clear and static.

## DOM structure

```
.sbr[data-surface-break][data-state][data-recovered]
  button[data-sbr-surface]     SURFACE
  .sbr__status[role=status]
  .sbr__host
    .sbr__water[aria-hidden]
      .sbr__mass + .sbr__seg×5   irregular waterline (5 segments)
      .sbr__ripples ×3
    .sbr__stage[aria-hidden]
      .sbr__clear                clipped above waterline
      .sbr__sub                  clipped below + ghost offsets
```

## Copy

| Phase | Visible |
| --- | --- |
| Initial | `UNKNOWN RECORD` (kicker `DEPTH // ??`) |
| Recovered | `RECORD // 045` / `RECOVERED` |

## Layout contract

| Token | Value |
| --- | --- |
| Near-black | `#020b16` |
| Deep | `#073252` |
| Mid | `#0d719c` |
| Bright | `#42b9db` |
| Pale | `#d5f6ff` |
| Waterline | `38%` host height |
| Initial offset | `translateY(70px)` |
| Ghost offsets | `-3px` / `+3px` |
| React bump | `8px` upward |
| Ripple count | exactly 3 |

No heavy blur — distortion is graphic offset + clip only.

## Timing

| Phase | Window | Effect |
| --- | --- | --- |
| Ascent | 0–620ms | Content rises to canonical Y |
| Cross / react | ~340–500ms | Text swaps; waterline +8px settle; 3 ripples |
| Exit | 620–840ms | Water mass slides below host (220ms) |
| Complete | ≥840ms | Clear static recovered UI |

## States

| `data-state` | Role |
| --- | --- |
| `idle` | Submerged unknown record |
| `ascending` | Rise in progress |
| `reacting` | Surface bump + ripples (ascent continues) |
| `exiting` | Water leaves downward |
| `complete` | No water; sharp recovered copy |

## Reduced motion

Immediate recovered final state; no ascent, ripples, or water travel.

## Accessibility

| Phase | Status |
| --- | --- |
| Before | `Unknown record submerged.` |
| After | `Record 045 recovered.` |

Stage is `aria-hidden`. Focus ring on SURFACE control.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep frozen waterline 38%, 70px rise, 620/160/220ms timings, five segments, three ripples.
3. Call `surfaceBreakReveal()` / `resetSurfaceBreak()` (or harness restart).
4. Honour both reduced-motion triggers.
