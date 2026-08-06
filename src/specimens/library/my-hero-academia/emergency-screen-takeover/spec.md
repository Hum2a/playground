# Emergency Screen Takeover

## Visual intent

Calm system monitor interrupted by diagonal accent/ink warning planes and EMERGENCY takeover messaging.

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Planes | 0ms | Diagonal sweep (420ms) |
| Alert | 360ms | Copy fades in |
| Settled | 1070ms | Final takeover state |

## API

- `runEmergencyTakeover()`
- `resetEmergencyTakeover()`
- `replayEmergencyTakeover()`
