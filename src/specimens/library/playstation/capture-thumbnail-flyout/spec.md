# Capture Thumbnail Flyout

A captured-frame placeholder arcs from centre into the bottom-left saved dock. Distinct from Screenshot Capture Flash (shutter only — no travel).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3417` / `PS-111` |
| Travel | `640ms` |
| Path | centre → upper-left arc (`-42px,-36px` @ 35%) → bottom-left dock |
| Start size | `120×68` |
| Dock size | `56×32` |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Trigger | CAPTURE |

## Acceptance

1. CAPTURE reveals a centre thumbnail that arcs toward the SAVED dock.
2. After `640ms` the thumb rests docked at bottom-left.
3. No full-stage shutter blades (that is Screenshot Capture Flash).

## Reduced motion

Thumb snaps to docked size/position; travel keyframes removed under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
