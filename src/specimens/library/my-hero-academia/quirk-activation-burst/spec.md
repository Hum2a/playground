# Quirk Activation Burst (portable recreation spec)

Eight **hard triangular ray wedges** (not soft beams) burst from a halftone stage; core panel **STANDBY → ACTIVE** with an ink **ACTIVE** stamp.

**Ref:** SPX-1997 · **Catalogue:** MHA-023

## Geometry (frozen)

| Property | Value |
| -------- | ----- |
| Ray count | 8 |
| Ray angles (deg) | 0, 45, 90, 135, 180, 225, 270, 315 |
| Wedge width | 22px |
| Wedge length | 46% of stage |

## Copy

| Role | Text |
| ---- | ---- |
| Idle | `STANDBY` |
| Active | `ACTIVE` |
| Stamp | `ACTIVE` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Wedge burst (staggered) | 480ms |
| Settle | 280ms |

## API

```js
runQuirkActivationBurst()
resetQuirkActivationBurst()
replayQuirkActivationBurst()
```

## Reduced motion

Immediately show ACTIVE core and stamp; no wedge burst animation.
