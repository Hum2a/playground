# Card-to-Detail Container Transform (portable recreation spec)

Material-inspired container transform: clicking the middle list card morphs that exact
container into a detail surface. Title persists; metadata fades; detail content reveals.

## Layout contract

| Token | Value |
| ----- | ----- |
| Scaffold | 360 × 620px |
| Card | 304 × 112px |
| Detail | 336 × 548px |
| Radius | 20 → 28px |
| Duration | 420ms |
| Meta fade | 0–120ms |
| Content reveal | 160–360ms |

## API

- `resetCardToDetail()`
- `replayCardToDetail()`
