# All-Clear Reset (portable recreation spec)

Threat-reset UI: **ALL CLEAR** retracts the ALERT overlay, stamps **ALL CLEAR**,
then quietly rebuilds the operations panel. Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Panel title | `OPERATIONS PANEL` |
| Line 1 | `Sector 4 — nominal` |
| Line 2 | `Teams deployed — 12` |
| Alert | `ALERT` |
| Alert sub | `THREAT DETECTED` |
| Stamp | `ALL CLEAR` |
| Live alert | `Threat alert active.` |
| Live retract | `Retracting alert geometry…` |
| Live stamp | `All clear stamped.` |
| Live rebuild | `Rebuilding operations panel…` |
| Live done | `All clear. Operations restored.` |

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
| Alert retract | 420ms |
| Stamp delay | 360ms |
| Stamp slam | 280ms |
| Rebuild delay | 120ms |
| Panel rebuild | 500ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Stage max width | 400px |
| Host min height | 140px |
| Host clip corner | 12px |
| Stamp clip corner | 8px |

## API

```js
runAllClearReset()
resetAllClearReset()
replayAllClearReset()
```

## Wave B

Frozen retract, stamp, and rebuild timings. Dedicated **ALL CLEAR** stamp phase
before a quiet operations panel rebuild.

## Reduced motion

Operations panel appears immediately — no retract, stamp, or rebuild animation.

## Acceptance

1. Alert: ALERT overlay visible; ops panel hidden.
2. ALL CLEAR: alert retracts to centre over 420ms.
3. ALL CLEAR stamp at 360ms delay; fades before rebuild.
4. Ops panel rebuilds quietly (500ms + 120ms delay).
5. Done: nominal copy visible; RESET available.
6. RESET restores ALERT state.
7. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant ops panel.
8. No network; content clipped to host.
