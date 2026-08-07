# Energy Transfer (portable recreation spec)

Chevron energy packet travels a **hard zigzag ink conduit** from a charged source node to an idle target. On arrival, **impact wedges** pop and a rotated **TRANSFERRED** stamp slams onto the target.

**Ref:** SPX-2011 · **Catalogue:** MHA-037

## Copy

| Role | Text |
| ---- | ---- |
| Source badge | `CHARGED` |
| Target idle | `IDLE` |
| Target done | `TRANSFERRED` |
| Stamp | `TRANSFERRED` |
| Trigger | `TRANSFER` |

## Geometry (frozen)

| Element | Value |
| ------- | ----- |
| Conduit segments | 4 |
| Zig angles (deg) | −14, 18, −11, 9 |
| Ink weight | 4px hard stroke + primary outline |
| Impact wedges | 3 triangular pops |

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
| Path illuminate (staggered) | 280ms |
| Packet travel | 500ms |
| Impact + stamp | 320ms |

## API

```js
runEnergyTransfer()
resetEnergyTransfer()
replayEnergyTransfer()
```

## Reduced motion

Immediately show lit zigzag conduit, impact wedges, and TRANSFERRED stamp; no packet travel or wedge pop animation.
