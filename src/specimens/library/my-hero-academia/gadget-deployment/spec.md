# Gadget Deployment (portable recreation spec)

Support-equipment UI: stowed **GRAPPLE** tile unfolds a clipped tray panel; **FIRE**
and **REEL** sit outside the tile and pulse one-shot status labels. Original study —
no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Tile | `GRAPPLE` |
| Unit | `GRAPPLE UNIT` |
| Ready | `STATUS — READY` |
| Firing | `STATUS — FIRING` |
| Reeling | `STATUS — REELING` |
| Live stowed | `Gadget stowed.` |
| Live unfold | `Unfolding gadget controls…` |
| Live ready | `Grapple unit deployed and ready.` |
| Live fire | `Grapple fired.` |
| Live reel | `Grapple reeling in.` |

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
| Tray unfold | 520ms |
| Status pulse | 480ms |
| Tile dim | 320ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Stage max width | 400px |
| Tile clip corner | 10px |
| Tray clip corner | 12px |
| Icon size | 28px |

## API

```js
runGadgetDeployment()
resetGadgetDeployment()
replayGadgetDeployment()
```

## Wave B

FIRE/REEL are sibling controls (not nested inside the tile button). Each fires a
one-shot status pulse — not a persistent mode toggle.

## Reduced motion

Tray and controls appear immediately; no clip-path unfold animation.

## Acceptance

1. Idle: GRAPPLE tile; tray and controls hidden; polite live region announces stowed.
2. DEPLOY: tray unfolds via `inset` clip-path over 520ms; tile dims.
3. Done: READY status; FIRE/REEL enabled.
4. FIRE/REEL: 480ms status pulse with matching live announcement, then READY.
5. RESET stows tray and re-enables DEPLOY.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant deploy.
7. No network; content clipped to host.
