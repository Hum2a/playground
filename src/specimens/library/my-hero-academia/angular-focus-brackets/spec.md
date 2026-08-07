# Angular Focus Brackets (portable recreation spec)

Four angular comic brackets snap from outside corners onto a **TARGET** card on
**Focus** trigger (~660ms). On lock, meta becomes **LOCK ENGAGED** with an accent
slash. Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Trigger | `Focus` |
| Kicker | `TARGET` |
| Title | `READY` |
| Meta idle | `Awaiting focus lock.` |
| Meta locked | `LOCK ENGAGED` |
| Status idle | `Brackets retracted.` |
| Status focusing | `Brackets snapping in…` |
| Status locked | `Focus locked — TARGET READY.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Bracket snap | 660ms |
| Slash reveal | 280ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Bracket size | 22px |
| Bracket border | 4px |
| Bracket offset | 14px |
| Bracket travel | 18px |
| Slash | 28×4px at −32° |
| Stage | 340×200px |

## API

```js
runAngularFocusBrackets()
resetAngularFocusBrackets()
```

## Reduced motion

Brackets, slash, and LOCK ENGAGED meta appear immediately with accent colour.

## Acceptance

1. Idle: retracted brackets; aria-live status announces retracted.
2. Focus: brackets snap in over 660ms (primary).
3. Lock: accent brackets, LOCK ENGAGED meta, accent slash, status announces locked.
4. Second click resets.
5. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant lock.
6. No network.
