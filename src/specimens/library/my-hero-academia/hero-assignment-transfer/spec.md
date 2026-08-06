# Hero Assignment Transfer

## Visual intent

HERO-12 chip moves from available roster into incident assignment slot; slot accepts with highlight then shows assigned state.

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Transfer | 0ms | Chip travels (740ms) |
| Settled | 1390ms | Slot shows ASSIGNED |

## API

- `runHeroAssignment()`
- `resetHeroAssignment()`
- `replayHeroAssignment()`
