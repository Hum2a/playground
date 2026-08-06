# Quick Resume Snapshot

A paused snapshot-like card expands into an active resumed state — compact frozen frame morphs to full play surface.

## Freeze

| Item | Value |
| --- | --- |
| Ref | `SPX-3336` / `PS-030` |
| Palette | `#2E90FF` `#0B0F14` `#F4F6F8` `#7EB6FF` |
| Behaviour | 96×54px snapshot → full inset active panel over 420ms. |
| Trigger | RESUME / RESET toggle |

## Reduced motion

Same semantic states apply — CSS transitions and keyframe animations are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line so colour is never the only signal.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
