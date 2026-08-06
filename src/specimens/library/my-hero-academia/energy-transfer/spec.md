# Energy Transfer (portable recreation spec)

Luminous energy packet travels along an angular path from a charged source node to an idle target; target receives **TRANSFERRED** state on arrival.

**Ref:** SPX-2011 · **Catalogue:** MHA-037

## Copy

| Role | Text |
| ---- | ---- |
| Source badge | `CHARGED` |
| Target idle | `IDLE` |
| Target done | `TRANSFERRED` |
| Trigger | `TRANSFER` |

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
| Path illuminate | 280ms |
| Packet travel | 500ms |
| Target hit | 320ms |

## API

```js
runEnergyTransfer()
resetEnergyTransfer()
replayEnergyTransfer()
```

## Reduced motion

Immediately show path lit and target **TRANSFERRED**; no packet travel or scale hit.
