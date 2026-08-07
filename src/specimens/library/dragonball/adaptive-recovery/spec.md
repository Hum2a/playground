# Adaptive Recovery

Post-failure improvement primitive. A failed worker shows **structural damage** in its truss frame, reconstructs through a frozen health ladder, briefly matches its prior baseline with a **scar remnant**, then adapts with reinforced struts and upgraded metrics.

## Freeze

| Item | Value |
| --- | --- |
| System | `WORKER // 06` |
| Start | `FAILED` · health `18%` · `CRITICAL` · broken truss beams |
| Health ladder | 18 → 36 → 57 → 78 → 100 · 175ms steps · ~700ms |
| Baseline hold | 120ms · truss complete · scar visible |
| Reinforcement struts | exactly 3 · stagger 0 / 140 / 280ms |
| Scar | dashed diagonal remnant persists through adapted state |
| Metrics | CAPACITY 100→128 · RETRIES 2→4 · LATENCY 84→61ms |
| Deltas | `+28 CAPACITY` · `+2 RETRIES` · `−23ms LATENCY` |
| Final | health 100% · `NEW BASELINE` · `ADAPTED` |

## Visual contract

| Phase | Structure |
| --- | --- |
| Failed | 6 truss beams at low scale — structural damage |
| Recovering | beams extend as health rises |
| Baseline | full truss + scar line appears |
| Adapting | 3 gold reinforcement struts grow in |
| Adapted | reinforced truss + scar remnant + new metrics |

## Behaviour

1. Idle failed: broken truss, previous baseline panel, CRITICAL / 18%.
2. RECOVER: health ladder; truss beams rebuild.
3. At 100%: hold — scar appears on restored structure.
4. Adaptation: reinforcement struts + clipped metric upgrades.
5. Deltas + NEW BASELINE + ADAPTED. Static.

## Reduced motion

Immediate adapted truss, scar, reinforcements, and metrics.

## API

- `runAdaptiveRecovery()`
- `runAdaptiveRecoveryReset()`
