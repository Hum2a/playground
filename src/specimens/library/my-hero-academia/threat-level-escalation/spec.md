# Threat Level Escalation

## Visual intent

Five-segment threat meter escalates stepwise from LOW to CRITICAL with increasing scale and accent intensity.

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Steps | 0–800ms | Levels 2→5 (200ms each) |
| Settled | 1150ms | CRITICAL state locked |

## API

- `runThreatEscalation()`
- `resetThreatEscalation()`
- `replayThreatEscalation()`
