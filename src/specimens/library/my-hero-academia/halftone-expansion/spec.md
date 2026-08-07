# Halftone Expansion (portable recreation spec)

Halftone dot field expands from the Activate button origin as a transition mask,
covering a state swap between **ZONE A · STANDBY** and **ZONE B · COMPLETE**.

## Copy

| Role | Text |
| ---- | ---- |
| Standby kicker | `ZONE A · STANDBY` |
| Standby title | `STANDBY` |
| Standby meta | `Output idle — awaiting activation pulse.` |
| Complete kicker | `ZONE B · COMPLETE` |
| Complete title | `COMPLETE` |
| Complete meta | `Output engaged — transition cycle finished.` |
| Live standby | `Standby zone ready. Activate to expand.` |
| Live expanding | `Halftone mask expanding…` |
| Live complete | `Complete zone active. Output engaged.` |

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
| Expand | 420ms |
| Content swap (cover) | 220ms |
| Contract | 320ms |
| Total cycle | 1070ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Origin default | 50% / 50% |
| Dot size | `24vmax` |
| Dot pitch | 14px |
| Scale rest | 0 |
| Scale max | 3.2 |

## API

```js
runHalftoneExpansion(target, originX?, originY?)
resetHalftoneExpansion()
```

## Reduced motion

Instant zone swap; mask hidden with no scale travel.

## Acceptance

1. Activate: mask expands from trigger origin; swap at 220ms; COMPLETE zone visible.
2. Reset: reverse mask from trigger; STANDBY zone restored.
3. Frozen CSS vars for origin and scale; mask clipped to host.
4. `aria-live="polite"` announces expanding, contracting, and settled zone.
5. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant swap.
6. Restart message resets to standby.
