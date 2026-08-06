# Post-Burst Recovery

Cooldown / resource recovery after successful over-performance. The boosted task stays **COMPLETE**; capacity climbs a frozen ladder until **READY**.

## Freeze

| Item | Value |
| --- | --- |
| Worker | `WORKER // 04` |
| Task | `TASK COMPLETE` (always visible) |
| Start | load 71% · capacity 38% · RECOVERING · scale `.96` |
| Recovery rail | 0 → 20 → 45 → 70 → 88 → 100 |
| Load | 71 → 66 → 59 → 52 → 46 → 42 |
| Capacity | 38 → 46 → 59 → 74 → 89 → 100 |
| Structures | core+2 → +1 each stage → six at 88/100 |
| Stage holds | 0, 160, 160, 160, 160, 160 ms |
| Ready | only at 100% · scale → 1 · exactly 2 ticks |

## Behaviour

1. Idle: depleted recovering state after successful completion.
2. RESTORE: advance stages; status stays RECOVERING through 88%.
3. At 100%: scale restores, two ticks, STATUS READY. Static.

## Reduced motion

Immediate READY baseline.

## API

- `runPostBurstRecovery()`
- `runPostBurstReset()`
