# Cloud Sync Progress

Local and cloud vertical meters rise from unbalanced starts until both read 100% and the hub shows OK.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3446` / `PS-140` |
| Sync duration | `1200ms` |
| Start local | `18%` |
| Start cloud | `42%` |
| Step | `40ms` |
| End | both `100%` · hub `OK` |

## Behaviour

1. Idle: LOCAL 18% / CLOUD 42% — visibly unbalanced.
2. Syncing: both meters climb; hub pulses.
3. Synced: both 100%; hub label OK; status SYNCED.
4. Reduced motion: snap to balanced. RM selectors only target real classes (no DualSense leftovers).

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
