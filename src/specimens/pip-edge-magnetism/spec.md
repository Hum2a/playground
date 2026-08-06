# PiP Edge Magnetism (portable recreation spec)

176×99 floating window in 390×700 scaffold with 56px edge attraction and corner snap slots.

## Layout contract

| Token | Value |
| ----- | ----- |
| Stage | 390 × 700px |
| Window | 176 × 99px |
| Min inset | 12px |
| Attract zone | 56px |
| Attract blend | 35% |
| Snap duration | 180ms |
| Fling threshold | 0.8 px/ms |

## API

- `resetPipEdgeMagnetism()`

## Reduced motion

No magnetic interpolation during drag; instant snap on release.
