# Cross-Device (portable recreation spec)

Pointer in left display reaches the right edge, disappears for `45ms`, then continues from the left edge of the right display at the same normalized y (`62%`).

## Contract

| Parameter | Value |
| --------- | ----- |
| Gap | `36px` |
| Normalized y | `62%` |
| Handoff delay | `45ms` |
| Boundary ticks | `2` for `120ms` each |
| Continue distance | `120px` |
| Gap traversal | never |

## Reduced motion

Show pointer directly transferring boundaries with no travel animation.

## API

- `resetCrossDeviceCursorHandoff()`
