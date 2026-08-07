# Button Impact Shockwave (portable recreation spec)

Successful high-priority action sends angular shockwave echoes from the button origin
through the parent card to its edges. Sharp hex rings — not a soft Material ripple.
Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Eyebrow | `PRIORITY` |
| Title | `Deploy response` |
| Activate | `Activate` |
| Complete | `COMPLETE` |
| Replay | `Replay` |
| Live ready | `Action ready.` |
| Live impact | `Impact shockwave.` |
| Live done | `Action complete.` |

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
| Impact rings | 720ms |
| Settle | 650ms |
| Total | 1370ms |

## Shockwave

| Token | Value |
| ----- | ----- |
| Origin | Button centre (50% / 50%) |
| Echo count | 3 |
| Echo delays | 0 / 90 / 180ms |
| Ring clip | Hexagon |
| Max scale | 14 |
| Opacity hold | Until 85% then cut |

## API

```js
runButtonImpactShockwave()
resetButtonImpactShockwave()
replayButtonImpactShockwave()
```

## Wave B

Origin percentages, echo count, and max scale frozen — angular rings, not ripple.

## Reduced motion

COMPLETE appears immediately; no ring expansion.

## Acceptance

1. Idle: Activate button; live reads action ready.
2. Activate: three hex rings echo from button to card edges.
3. Rings hold opacity until edge then cut — no soft fade.
4. COMPLETE appears; card nudges on impact.
5. Replay resets to idle.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant complete.
7. No network; content clipped to host.
