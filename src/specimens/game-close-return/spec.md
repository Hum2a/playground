# Game Close Return

Exiting a game reconstructs its original home tile and focus position — full-screen play surface collapses back into the library grid slot.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3337` / `PS-031` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Full game overlay scale 1 → 0.22; grid fades in; origin tile gains focus ring. |
| Trigger | CLOSE GAME / RELAUNCH |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
