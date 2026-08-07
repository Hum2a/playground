# Incident Dispatch Card

## Visual intent

Calm ops dashboard receives an urgent incident card that tears/slides in from the right with a heavy CRITICAL priority badge.

## Frozen geometry

| Token | Value |
| --- | --- |
| Slide from | `calc(100% + 28px)` |
| Slide to | `10px` |
| Tear path | 7-point jagged polygon |
| Card path | 6-point torn corner polygon |
| Rotate rest → end | `4deg` → `-2deg` |

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Slide | 0ms | Card enters (660ms) |
| Settled | 1310ms | Final overlay state |

## API

- `runIncidentDispatch()`
- `resetIncidentDispatch()`
- `replayIncidentDispatch()`

Wave C: torn edge path, slide distance, and badge weight frozen in contract — not colour-only.
