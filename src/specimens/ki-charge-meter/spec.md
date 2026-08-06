# Ki Charge Meter

## Visual intent
Distributed unfinished work converges into a central operation in four accelerating,
deterministic batches. The final state is stable `READY`; nothing loops.

Canonical: `BUILD // RELEASE`, `0%` → `100% READY`.

## Frozen particle contract

Exactly 24 energy units. Fixed field: `320 × 220px`. Six units per group:

| Group | Coordinates (x,y px) | Duration |
| --- | --- | --- |
| 1 | (12,18) (67,12) (140,25) (248,16) (294,57) (302,126) | 420ms |
| 2 | (22,181) (74,148) (119,205) (207,193) (274,170) (306,207) | 340ms |
| 3 | (9,98) (48,61) (103,115) (211,76) (259,103) (315,34) | 270ms |
| 4 | (30,31) (82,190) (151,9) (232,209) (280,91) (309,154) | 200ms |

Each six-unit group staggers by `30ms`. No `Math.random()`.

## Stage contract

| Completion | Percent | Node diameter |
| --- | --- | --- |
| Initial | 0 | 34px |
| Group 1 | 25 | 46px |
| Group 2 | 50 | 58px |
| Group 3 | 75 | 70px |
| Group 4 | 100 | 82px |

At 100%, the node compresses `1 → .92 → 1.05 → 1` over `160ms`; exactly four
cardinal lines appear. All particles are consumed.

## Reduced motion and accessibility
Reduced motion immediately renders 100%, full node and READY. Text exposes stepped
progress and final state; status announces READY once.

## Porting
Import `demo.css` verbatim. API: `runKiChargeMeter`, `resetKiChargeMeter`,
`replayKiChargeMeter`.
# Ki Charge Meter

Portable progress primitive: distributed unfinished work converges into one completed operation.
No Dragon Ball art, logos, sprites, fonts, or extracted assets.

## Copy

- Operation: `BUILD // RELEASE`
- Trigger: `CHARGE`
- Percentages: `0%`, `25%`, `50%`, `75%`, `100%`
- Terminal status: `READY`

## Frozen motion contract

There are exactly **24** fixed-origin energy units, divided into four groups of six.
Within each group, starts stagger by `30ms`; each group finishes only after the final
unit has travelled.

| Group | Percent | Duration |
| --- | --- | --- |
| 1 | `0 → 25%` | `420ms` |
| 2 | `25 → 50%` | `340ms` |
| 3 | `50 → 75%` | `270ms` |
| 4 | `75 → 100%` | `200ms` |

Node sizes commit only after a group finishes: `34`, `46`, `58`, `70`, `82px`.
At completion, compress `1 → .92 → 1.05 → 1` in `160ms` and show exactly four
short cardinal completion lines once.

## Accessibility and reduced motion

The live text exposes current discrete progress and `READY`. Under reduced motion,
all 24 units are immediately consumed, the node is `82px`, and progress is `100% READY`.

## API

- `window.kiChargeMeter.charge()`
- `window.kiChargeMeter.reset()`
