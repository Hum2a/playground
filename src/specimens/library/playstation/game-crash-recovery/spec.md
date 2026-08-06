# Game Crash Recovery

Active content collapses into an error report state with clear next actions — play surface folds into a crash dialog with retry and close.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3455` / `PS-149` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | Game opacity 0.15; error panel rises with CE code and two actions. |
| Trigger | SIMULATE CRASH / RETRY / CLOSE APP |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
