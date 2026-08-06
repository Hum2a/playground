# Ultra State Optimisation (portable recreation spec)

Optimisation-state transformation: a noisy runtime becomes calm and high-performing
by eliminating wasted motion and overhead. Inspired conceptually by Ultra Instinct —
**no franchise characters, symbols, or names appear in the specimen UI.**

Semantic arc: high activity → optimisation → elimination of wasted work → calm high-performance state.

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

## Geometry / mode

- Core scales to **92%**
- Initial vibration ≤ **1px**
- `STANDARD → ULTRA` via clipped replacement
- Final palette ≈ three colours: `#1e2430` / `#c8d0dc` / `#6a7a90`
- Final state: **zero looping animation**, no glow aura

## API

```js
runUltraOptimise()
resetUltraOptimise()
```

## Reduced motion

Immediately show final ULTRA state (metrics + diamond + quiet chrome).

## Accessibility

CPU, QUEUE, TASKS, and MODE remain normal text nodes.
