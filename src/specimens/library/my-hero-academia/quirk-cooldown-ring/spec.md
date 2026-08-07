# Quirk Cooldown Ring (portable recreation spec)

Comic capability readiness meter: idle **ARMED @ 100%** full stroke → Run drains
**COOLDOWN** with ticking percent → settle **READY @ 0%** empty accent ring.
Angular tick caps at cardinal points — not a Material spinner. Original study —
no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Armed | `ARMED` |
| Cooldown | `COOLDOWN` |
| Ready | `READY` |
| Live armed | `Capability armed at full charge.` |
| Live drain | `Cooldown draining.` |
| Live ready | `Cooldown complete. Capability ready.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |
| Tick | `#1A2836` |
| Track | `#C5D4E3` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Drain | 580ms linear |
| Ready flash | 320ms |
| Percent tick | 40ms interval |

## Geometry

| Token | Value |
| ----- | ----- |
| ViewBox | `0 0 120 120` |
| Radius | 46 |
| Circumference | 289.03 |
| Stroke width | 8 |
| SVG rotate | −90deg |
| Tick caps | 4 rects at 12/3/6/9 (see contract.geometry.ticks) |

## API

```js
runQuirkCooldownRing()
resetQuirkCooldownRing()
replayQuirkCooldownRing()
```

## Reduced motion

Skip drain; show READY / 0% / empty accent ring immediately.

## Acceptance

1. Idle: ARMED, 100%, full primary ring, four angular ticks visible.
2. Run: COOLDOWN label; ring drains 0→289.03 dashoffset in 580ms; percent ticks down.
3. Done: READY, 0%, accent empty ring; polite live region announces completion.
4. Replay resets to ARMED 100% then re-drains.
5. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → READY 0% with no animation.
6. No network; content clipped to stage; replay is deterministic.
