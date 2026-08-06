# Incident Dispatch Card

## Visual intent

Calm ops dashboard receives an urgent incident card that tears/slides in from the right with CRITICAL priority styling.

## Colour contract

| Token | Hex |
| --- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Slide | 0ms | Card enters (660ms) |
| Settled | 1310ms | Final overlay state |

## API

- `runIncidentDispatch()`
- `resetIncidentDispatch()`
- `replayIncidentDispatch()`
