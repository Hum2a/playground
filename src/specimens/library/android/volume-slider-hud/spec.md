# Volume Slider HUD (portable recreation spec)

72×280 temporary HUD 16px from right edge with vertical 180px track.

## Contract

| Parameter | Value |
| --------- | ----- |
| HUD compact | `72 × 280px` |
| HUD expanded | `240px` wide |
| Entrance | `translateX(90px)` over `220ms` |
| Dwell | `2200ms` inactivity |
| Steps | `10` points, range `0–100` |

## Reduced motion

HUD appears/disappears in place.

## API

- `resetVolumeSliderHud()`
