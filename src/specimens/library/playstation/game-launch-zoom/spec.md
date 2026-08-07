# Game Launch Zoom

Selected game tile expands spatially into the viewport (box geometry, not scale bump) and hands off into a launch surface.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3332` / `PS-026` |
| Idle | Tile `72×96` at dock origin slot |
| Zoom | `left/top/width/height` → full stage over `640ms` |
| Handoff | Launch layer opacity `1` after ~`360ms` delay |
| Done | Tile hidden · launch READY visible |
| Trigger | Launch / Reset |
| API | `runGameLaunchZoom()` · `resetGameLaunchZoom()` |

## Behaviour

1. Idle: three dock slots; origin tile sits in centre slot.
2. Zoom: tile geometry fills the stage (spatial, not `scale()`).
3. Handoff: launch surface fades in as tile opacity drops.
4. Done: TITLE A / READY on launch surface.

## Reduced motion

`.glz__tile`, `.glz__launch`, and `.glz__dock` lose transitions under both RM hooks — launch view appears at full size instantly.

## Accessibility

Decorative stage uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
