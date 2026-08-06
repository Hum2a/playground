# Material Pull-to-Refresh (portable recreation spec)

340×500 scrollable feed with resisted pull, 270° arc indicator, and deterministic refresh row insert.

## Layout contract

| Token | Value |
| ----- | ----- |
| Viewport | 340 × 500px |
| Resistance | `96 * (1 - exp(-dragY/140))` |
| Threshold | 72px displayed |
| Hold position | 64px |
| Load cycle | 900ms |
| Arc rotation | 0→120° |

## API

- `resetMaterialPullToRefresh()`

## Reduced motion

Threshold and static arc preserved; no spinning animation.
