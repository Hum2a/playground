# Rest Mode Dim

A console-rest silhouette dims from full luminance through a 55% hold into an 18% sleep state — activity bars freeze, status LED softens, REST label fades in. Distinct from Wake from Rest (black veil lift over tile grid).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3435` / `PS-129` |
| Active | `brightness(1)` / full activity pulse |
| Dimming | `brightness(0.55)` for `700ms` |
| Rest | `brightness(0.18)` · REST label · activity off |
| Stage filter ease | `800ms` |
| Trigger | ENTER REST MODE / WAKE |

## Behaviour

1. Active: console silhouette lit; activity bars pulse.
2. Dimming: stage filter to 55%; LED softens; bars slow.
3. Rest: stage filter to 18%; bars hidden; REST label visible.
4. WAKE returns to active instantly (or via restart message).

## Reduced motion

Same semantic states — CSS transitions and the activity pulse are disabled under both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

Decorative stage content uses `aria-hidden`; phase changes are announced via an `aria-live="polite"` status line.
