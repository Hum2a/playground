# Save Conflict Compare

Two compare cards show local vs cloud metadata — selecting one side and committing keeps that save (not a sync-beam twin).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3452` / `PS-146` |
| Local | 18:42 · 67% · Ch.4 |
| Cloud | 19:15 · 72% · Ch.5 |
| Commit delay (Run) | `280ms` |
| Run path | auto-select cloud → commit |

## Behaviour

1. Compare: both cards visible with differing progress/chapter highlighted.
2. Select: `aria-pressed` and Select → Selected; enables Keep selected save.
3. Commit: kept card stays; other dims; status KEPT LOCAL/CLOUD.
4. Run: selects cloud then commits. Reduced motion snaps without card motion.

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
