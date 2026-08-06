# Rest Mode Dim

The interface gradually reduces luminance and activity into a sleeping state — tiles, chrome, and motion settle into rest.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3435` / `PS-129` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Active → dimming (55% brightness) → rest (18%) with REST label. |
| Trigger | ENTER REST MODE / WAKE |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
