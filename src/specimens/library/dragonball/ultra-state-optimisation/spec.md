# Ultra State Optimisation (portable recreation spec)

Optimisation-state transformation: a **noisy** runtime (grain, scanlines, warm
palette, 12 markers, 3 bars) becomes a **calm ultra** state (cool monochrome,
single bar, diamond, zero loops). Sharp contrast between phases — not a subtle
tweak. No franchise characters, symbols, or names in the UI.

Semantic arc: high activity → optimisation → elimination of wasted work → calm high-performance state.

## Phase contrast (frozen)

| Signal | Noisy (STANDARD) | Ultra |
| ------ | ---------------- | ----- |
| Core border | 2px warm orange | 1px cool grey |
| Background | warm radial gradient | `#080a0e` flat |
| Grain + scanlines | visible | removed |
| Activity bars | 3 pulsing warm | 1 quiet bar (42% width) |
| Markers | 12 animated | 0 visible |
| Spinners | 2 rotating | 0 |
| Peripherals | 6 (4 drop, 2 keep) | 2 quiet outlines |
| Palette | `#c45c26` warm family | `#121820` / `#d8e0ec` / `#5a6a80` |

## Counts (frozen)

| Item | Count |
| ---- | ----- |
| Activity markers | **12** (3 groups of 4) |
| Rotating indicators | **2** |
| Activity bars (initial → final) | **3 → 1** |
| Peripheral structures (initial → final) | **6 → 2** |
| Final diamond | **1** (`8×8px`, lifts `4px`, no pulse) |

## Timing

| Phase | Duration |
| ----- | -------- |
| Recognition pause | **90ms** (all motion hard-paused) |
| Subtraction | **360ms** |
| Marker group stagger | **90ms** between groups |

## Metrics

| Metric | Sequence |
| ------ | -------- |
| CPU | 84 → 67 → 49 → 38 → 31 |
| QUEUE | 17 → 11 → 6 → 2 → 0 |
| TASKS | **42** (constant) |

## API

```js
runUltraOptimise()
resetUltraOptimise()
```

## Reduced motion

Immediately show final ULTRA state (quiet core, diamond, final metrics, no grain).

## Accessibility

CPU, QUEUE, TASKS, and MODE remain normal text nodes. Polite live region.
