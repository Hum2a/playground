# Quick App Switch Swipe (portable recreation spec)

Two full-screen tasks in a 390×420 viewport. Horizontal gestures acquire only
from the bottom 32px. Current task translates up to 72px and scales to 0.96
while adjacent task enters. Commit at 96px or 0.6 px/ms velocity.

## Contract

| Parameter | Value |
| --------- | ----- |
| Viewport | `390 × 420px` |
| Gesture zone | bottom `32px` |
| Max drag | `72px` |
| Commit | `96px` or `0.6 px/ms` |
| Scale at max drag | `0.96` |

## Reduced motion

Direct positional preview; snap immediately on release.

## API

- `resetQuickAppSwitchSwipe()`
