# Volume/Brightness HUD (portable recreation spec)

Transient `OUTPUT LEVEL` overlay with exactly ten segments; initial `42`, INCREASE to `68`.

## Contract

| Parameter | Value |
| --------- | ----- |
| HUD | `220 × 86px` |
| Segments | `10` |
| Entrance | scale `.96→1`, y `6→0`, `140ms` |
| Segment animate | `180ms` |
| Dwell | `900ms` after last input |
| Exit | `120ms` |
| Initial / final | `42` → `68` |

## Reduced motion

HUD appears/disappears without scale movement.

## API

- `resetVolumeBrightnessHud()`
