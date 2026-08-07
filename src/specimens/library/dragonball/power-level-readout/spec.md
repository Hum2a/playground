# Power Level Readout

Measurement / analysis primitive. A scouter-adjacent fluorescent HUD instrument walks a frozen sample ladder that accelerates then converges on **8,471**, locking scale thresholds, ticks, and brackets before resolving to `ABOVE BASELINE`.

## Freeze

| Item | Value |
| --- | --- |
| Node | `NODE // 12` |
| Samples | 4 → 17 → 48 → 126 → 314 → 782 → 1640 → 2917 → 4381 → 5790 → 6844 → 7512 → 8021 → 8310 → 8448 → 8471 |
| Holds (ms) | 70, 68, 64, 58, 52, 46, 40, 36, 35, 35, 35, 38, 42, 45, 55, 80 |
| Thresholds | 1000 → `×10³` · 5000 → rule + inner ticks · 8000 → frame expand + glow |
| Instrument | 4 corner brackets · 4 edge ticks · 5 inner scale ticks |
| Settle | `translateY(-2px → 0)` · 100ms |
| Final | `8,471` · `ABOVE BASELINE` |

## Behaviour

1. Idle: `----`, no classification announcement.
2. MEASURE: show `ANALYSING`; step discrete samples (not a continuous counter).
3. Thresholds fire once as values cross 1000 / 5000 / 8000.
4. Brackets converge; final sample settles with fluorescent glow.
5. Classification → `ABOVE BASELINE`. MEASURE again resets and replays.

## Reduced motion

Immediate final measurement, instrument chrome, and classification. No sample ladder.

## API

- `runPowerLevelReadout()`
- `runPowerLevelReset()`
