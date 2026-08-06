# Network Lost Takeover

Active content recedes into a clear offline state — play surface scales back as a network-lost panel takes over.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3441` / `PS-135` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Content scale 0.88 + blur; offline panel opacity 1. |
| Trigger | LOSE CONNECTION / RETRY |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
