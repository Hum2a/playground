# System Notification Slide

A compact notification slides into the top edge, dwells, and times out cleanly — system toast with finite entry and exit.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3408` / `PS-102` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Toast slides from -120% Y; dwell 2600ms; exit slide up. |
| Trigger | SHOW NOTIFICATION |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
