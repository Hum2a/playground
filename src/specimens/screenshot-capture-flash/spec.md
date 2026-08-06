# Screenshot Capture Flash

A single controlled shutter-like flash confirms capture — brief white overlay without obscuring the scene afterward.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3416` / `PS-110` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | White flash peaks at 92% opacity at 12% of 420ms keyframe. |
| Trigger | CAPTURE button |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
