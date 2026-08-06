# Adaptive Recovery

Post-failure improvement primitive. A failed worker recovers through a frozen health ladder, briefly matches its prior baseline, then adapts three metrics to a stronger **new baseline** while `PREVIOUS BASELINE` remains visible.

## Freeze

| Item | Value |
| --- | --- |
| System | `WORKER // 06` |
| Start | `FAILED` · health `18%` · `CRITICAL` |
| Health ladder | 18 → 36 → 57 → 78 → 100 · 175ms steps · ~700ms |
| Baseline hold | 120ms at recovered old metrics |
| Adaptation struts | exactly 3 · stagger 0 / 140 / 280ms |
| Metrics | CAPACITY 100→128 · RETRIES 2→4 · LATENCY 84→61ms |
| Deltas | `+28 CAPACITY` · `+2 RETRIES` · `−23ms LATENCY` |
| Final | health 100% · `NEW BASELINE` · `ADAPTED` |

## Behaviour

1. Idle failed: previous baseline panel + current CRITICAL / 18%.
2. RECOVER: reconstruct health; frame segments complete as health rises.
3. At 100%: hold — looks like original baseline (metrics unchanged).
4. Adaptation: three struts + clipped metric upgrades.
5. Deltas + NEW BASELINE + status ADAPTED. Static.

## Reduced motion

Immediate adapted state with before/after metrics.

## API

- `runAdaptiveRecovery()`
- `runAdaptiveRecoveryReset()`
