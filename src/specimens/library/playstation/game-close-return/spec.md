# Game Close Return

Full-screen game surface reconstructs spatially into its origin home-rail tile (box geometry collapse, not fade).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3337` / `PS-031` |
| Playing | Game fills stage · rail dimmed underneath |
| Returning | Game `left/top/width/height` → origin tile slot over `520ms` |
| Home | Game opacity `0` · origin tile focus ring · rail full luminance |
| Focus settle | `240ms` |
| Trigger | CLOSE GAME / RELAUNCH |
| Chrome | Unique `.gcr` namespace (close chrome, not shared `.ps`) |

## Behaviour

1. Playing: full-bleed IN GAME surface; home rail visible but dimmed under it.
2. Returning: game box collapses into centre origin tile slot.
3. Home: game gone; origin tile lifts with focus ring.

## Reduced motion

`.gcr__game`, `.gcr__rail`, and `.gcr__tile` lose transitions under both RM hooks — home end state snaps.

## Accessibility

Decorative stage uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
