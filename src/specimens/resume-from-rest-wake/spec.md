# Resume-from-Rest Wake

A sleeping interface brightens and restores the previous focused object — dim rest surface lifts into an active focus halo on the last tile.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3327` / `PS-021` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Rest grid at 28% opacity → waking glow → awake with focus halo on centre tile. |
| Trigger | WAKE button |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
