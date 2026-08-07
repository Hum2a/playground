# Power Threshold Break (portable recreation spec)

OUTPUT meter surges from **92%** through a shattering **100%** cap line to **108%** overshoot. The meter frame **tears** at breakthrough and a **BREAKTHROUGH** stamp slams onto the torn frame.

**Ref:** SPX-2001 · **Catalogue:** MHA-027

## Geometry (frozen)

| Property | Value |
| -------- | ----- |
| Start fill | 92% |
| Cap line | 100% |
| Overshoot | 108% |
| Tear pieces | 3 irregular shards |

## Copy

| Role | Text |
| ---- | ---- |
| Charging | `CHARGING` |
| Done | `BREAKTHROUGH` |
| Stamp | `BREAKTHROUGH` |
| Cap label | `MAX 100` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Surge + tear | 500ms |
| Settle | 300ms |

## API

```js
runPowerThresholdBreak()
resetPowerThresholdBreak()
replayPowerThresholdBreak()
```

## Reduced motion

Instant torn frame at 108% accent fill with BREAKTHROUGH stamp; no surge or tear fly animation.
