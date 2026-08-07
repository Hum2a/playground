# Emergency Screen Takeover (portable recreation spec)

Calm system monitor over a **host UI scaffold** is interrupted by **frozen-angle** diagonal warning planes and EMERGENCY takeover copy.

**Ref:** SPX-2065

## Geometry (frozen)

| Plane | Angle | Start offset |
| ----- | ----- | ------------ |
| Accent (A) | −22° | −120% |
| Ink (B) | −14° | −130% |

## Host scaffold

Preview scaffold wraps specimen in a bordered host card; inner **HERO OS** chrome remains visible under the semi-transparent calm layer and behind takeover planes.

## Timing

| Phase | Start | Effect |
| ----- | ----- | ------ |
| Planes | 0ms | Diagonal sweep (420ms) |
| Alert | 360ms | Copy fades in |
| Settled | 1070ms | Final takeover state |

## API

```js
runEmergencyTakeover()
resetEmergencyTakeover()
replayEmergencyTakeover()
```

## Reduced motion

Planes and alert appear immediately over host UI; no sweep.
