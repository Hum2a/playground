# Ice Wipe Transition (portable recreation spec)

Frost leading edge sweeps across the stage; crystalline facets grow, then fracture
away to reveal the destination scene. Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Scene A | `ALPHA` |
| Scene A copy | `Current view` |
| Scene B | `BETA` |
| Scene B copy | `Destination` |
| Transition | `Transition` |
| Replay | `Replay` |
| Live A | `Scene A active.` |
| Live frost | `Frost edge advancing.` |
| Live grow | `Ice facets growing.` |
| Live fracture | `Fracturing away.` |
| Live B | `Scene B active.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Ice tokens (effect-local)

| Token | Value |
| ----- | ----- |
| Frost | `#C8E8F8` |
| Crystal | `rgb(56 163 255 / 0.55)` |
| Edge | `#E8F6FC` |
| Shadow | `rgb(16 24 32 / 0.18)` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Frost sweep | 480ms |
| Shard grow | 520ms |
| Fracture | 380ms |
| Total | 1650ms |

## Shards (6)

Frozen `clip-path` polygons per shard — see `contract.json` `shards.polygons`.

## API

```js
runIceWipeTransition()
resetIceWipeTransition()
replayIceWipeTransition()
```

## Wave B

Effect-local ice tokens and six shard polygon geometries frozen in contract.

## Reduced motion

Scene B appears immediately; no frost or shard animation.

## Acceptance

1. Idle: Scene A visible; live reads Scene A active.
2. Frost edge sweeps left-to-right (480ms).
3. Six shards grow with stagger (520ms).
4. Shards fracture; Scene B revealed (380ms).
5. Replay resets to Scene A.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant Scene B.
7. No network; content clipped to host.
