# Predictive Back App Shrink (portable recreation spec)

Android-inspired back gesture where the active app surface shrinks into a floating card
with progressive inset, corner radius, and scale while a neutral destination becomes
visible on all four edges.

## Layout contract

| Token | Value |
| ----- | ----- |
| Preview | 390 × 720px |
| Edge zone | 24px left |
| Max drag | 160px |
| Scale | 1 → 0.88 |
| Radius | 0 → 32px |
| Translate X | 0 → 46px |
| Inset | 0 → 18px |
| Border | 1px when scale < 0.97 |
| Commit threshold | 118px |
| Cancel settle | 220ms |
| Commit settle | 180ms |

## API

- `resetPredictiveBackAppShrink()`
- `replayPredictiveBackAppShrink()`

## Reduced motion

Keep gesture preview during drag. Remove scale animation after release; snap immediately.
