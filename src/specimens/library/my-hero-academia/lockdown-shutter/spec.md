# Lockdown Shutter (portable recreation spec)

Security lockdown UI: five riveted shutter segments cascade over operational
content; **LOCKDOWN** stamps once the panel is fully covered. Original study —
no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Status | `FACILITY STATUS — OPERATIONAL` |
| Sub | `All sectors nominal.` |
| Lockdown | `LOCKDOWN` |
| Live idle | `Facility operational.` |
| Live close | `Shutter segments closing…` |
| Live done | `Facility lockdown active.` |

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
| Shutter close | 420ms |
| Stagger | 60ms × segment index |
| Label delay | 700ms |
| Label stamp | 280ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Stage max width | 400px |
| Panel min height | 140px |
| Panel clip corner | 12px |
| Shutter tooth height | 7px |

## API

```js
runLockdownShutter()
resetLockdownShutter()
replayLockdownShutter()
```

## Wave B

Frozen `closeMs`, stagger, and label delays as CSS custom properties. Shutter
segments carry rivet dots and accent sawtooth teeth.

## Reduced motion

Shutters snap closed and LOCKDOWN label appears immediately — no slide animation.

## Acceptance

1. Idle: operational copy visible; shutters above panel; polite live region.
2. LOCKDOWN: five shutters cascade closed (420ms + 60ms stagger).
3. Riveted teeth and accent sawtooth visible on each segment.
4. Done: content fully covered; LOCKDOWN label at 700ms delay.
5. RESET restores idle state.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant close.
7. No network; content clipped to host.
