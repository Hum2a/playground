# Vertical Content Stretch (portable recreation spec)

340×480 scrollable list with top/bottom overscroll deformation via scaleY and translateY.

## Layout contract

| Token | Value |
| ----- | ----- |
| Viewport | 340 × 480px |
| Max drag | 140px |
| Max scaleY | 1.055 |
| Max translate | 10px |
| Settle | 260ms |

## API

- `resetVerticalContentStretch()`

## Reduced motion

Static 2px boundary emphasis while dragging; no scale deformation.
