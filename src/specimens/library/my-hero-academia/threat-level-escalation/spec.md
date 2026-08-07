# Threat Level Escalation (portable recreation spec)

Five **discrete threat plates** with unique clip geometry escalate stepwise from LOW to **CRITICAL**. Each level has a distinct plate shape (not colour alone); CRITICAL is maximal halftone without strobing.

**Ref:** SPX-2066

## Plate geometry (frozen)

| Level | Label | Plate |
| ----- | ----- | ----- |
| 1 | LOW | Rectangular |
| 2 | GUARDED | Angled top |
| 3 | ELEVATED | Diagonal cut + hatch |
| 4 | HIGH | Speed tick marks |
| 5 | CRITICAL | Halftone maximal accent |

## Timing

| Phase | Duration |
| ----- | -------- |
| Step cadence | 200ms each |
| Settled | 1150ms |

## API

```js
runThreatEscalation()
resetThreatEscalation()
replayThreatEscalation()
```

## Reduced motion

Jump directly to LEVEL 5 CRITICAL plate state.
