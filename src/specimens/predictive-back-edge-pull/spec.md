# Predictive Back Edge Pull (portable recreation spec)

Android-inspired predictive back: dragging from the left edge progressively reveals
the destination while the current surface translates, scales down, and gains corner
radius. Commit or cancel on release. No images, audio, network, or storage.

## DOM structure

```html
<div class="pbe" data-predictive-back-edge-pull data-pbe-view="current">
  <div class="pbe__stage">
    <div class="pbe__destination">INBOX list</div>
    <div class="pbe__current">Thread B detail</div>
    <div class="pbe__edge"></div> <!-- 24px -->
    <div class="pbe__indicator"></div>
  </div>
</div>
```

## Layout contract

| Token | Value |
| ----- | ----- |
| Preview | 390 × 720px |
| Edge zone | 24px left |
| Max drag | 140px |
| Translate factor | 0.72× drag |
| Current scale | 1 → 0.94 |
| Corner radius | 0 → 28px |
| Destination opacity | 0.55 → 1 |
| Destination scale | 0.97 → 1 |
| Indicator size | 24 → 36px |
| Commit threshold | 112px |
| Velocity commit | >0.55 px/ms |

## API

- `resetPredictiveBackEdgePull()`
- `replayPredictiveBackEdgePull()`

## Reduced motion

Preserve interactive drag distance and threshold semantics. Remove scale
interpolation. Snap immediately after release.

## Accessibility

Status region announces view changes. Decorative layers `aria-hidden`.
