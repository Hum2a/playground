# Enhanced State Reversion

Capability rollback from an enhanced operating state to baseline. Not an error — completed work is retained.

## Semantic sequence

enhanced → release enhancement → capability structures retract → baseline restored → completed work retained

## Scaffold

| | Enhanced | Base |
| --- | --- | --- |
| System | `ENGINE // 07` | same |
| STATE | `STAGE III` | `BASE` |
| CAPACITY | `4.0×` | `1.0×` |
| CHANNELS | `8` | `2` |
| TASKS DONE | `42` | `42` (unchanged) |

Trigger: **REVERT**.

## Phases (frozen)

1. **Release** — field stops; hold `70ms`; outer field retracts `140ms`.
2. **Channels** — pairs `8→6→4→2`, each `~90ms`. Capacity `4.0×→2.5×→1.5×→1.0×`.
3. **Geometry** — outer structures fold; height `−20%`, width `−8%`.
4. **Settle** — `REVERTING → BASE`; `scale(1.02 → 1)`.

During process STATE reads `REVERTING`. TASKS DONE never resets or counts backward.

## Reduced motion

Immediate BASE with TASKS DONE `42`.
