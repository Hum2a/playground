# Power Level Readout

Measurement / analysis primitive. An unresolved monospace readout walks a frozen sample ladder that accelerates then converges on **8,471**, locking scale thresholds and resolving classification to `ABOVE BASELINE`.

## Freeze

| Item | Value |
| --- | --- |
| Samples | 4 → 17 → 48 → 126 → 314 → 782 → 1640 → 2917 → 4381 → 5790 → 6844 → 7512 → 8021 → 8310 → 8448 → 8471 |
| Holds (ms) | 70, 68, 64, 58, 52, 46, 40, 36, 35, 35, 35, 38, 42, 45, 55, 80 |
| Thresholds | 1000 → `×10³` · 5000 → rule · 8000 → frame +4px |
| Settle | `translateY(-2px → 0)` · 100ms · 2 brackets |
| Final | `8,471` · `ABOVE BASELINE` |

## Behaviour

1. Idle: `----`, no classification announcement.
2. MEASURE: show `ANALYSING`; step discrete samples (not a continuous counter).
3. Thresholds fire once as values cross 1000 / 5000 / 8000.
4. Final sample settles; brackets close; classification → `ABOVE BASELINE`.
5. MEASURE again resets and replays.

## Reduced motion

Immediate final measurement and classification. No sample ladder.

## API

- `runPowerLevelReadout()`
- `runPowerLevelReset()`
