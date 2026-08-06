# Wake from Rest

Previous state restores from darkness with focus intact — black rest surface lifts to reveal the last focused tile unchanged.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3436` / `PS-130` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Black veil opacity 1 → 0; grid fades in; centre focus tile keeps halo. |
| Trigger | WAKE button |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
