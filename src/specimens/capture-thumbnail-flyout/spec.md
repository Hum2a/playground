# Capture Thumbnail Flyout

A small captured-frame placeholder travels from centre into a saved-preview corner dock — thumbnail flyout after capture.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3417` / `PS-111` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | 120×68 centre thumb → 56×32 bottom-left dock over 520ms. |
| Trigger | CAPTURE button |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
