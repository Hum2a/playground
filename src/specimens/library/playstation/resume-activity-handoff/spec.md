# Resume Activity Handoff

Activity card travels spatially into a full task surface (box geometry) and resolves to RESUMED.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3333` / `PS-027` |
| Card idle | `148×72` at tray bottom-left |
| Handoff | `left/bottom/width/height` → full stage over `580ms` |
| Task reveal | opacity `1` after `300ms` delay · `280ms` fade |
| Done | Card hidden · RESUMED task visible |
| Trigger | Resume / Reset |
| API | `runResumeActivityHandoff()` · `resetResumeActivityHandoff()` |

## Behaviour

1. Card: OBJECTIVE A at 62% sits in activity tray.
2. Handoff: card geometry expands to fill the stage.
3. Task: full task surface shows RESUMED with mark.
4. Done: tray and card gone; task is the active surface.

## Reduced motion

`.rah__card`, `.rah__task`, and `.rah__tray` lose transitions under both RM hooks — active task shown immediately (no `.rah__task` delay leak).

## Accessibility

Decorative stage uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
