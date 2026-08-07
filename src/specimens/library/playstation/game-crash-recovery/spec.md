# Game Crash Recovery

Play surface folds away on the bottom hinge while an inset crash dialog settles with CE code and two actions. Distinct from Network Lost Takeover (full offline panel over a dimmed stage).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3455` / `PS-149` |
| Fold duration | `280ms` |
| Fold transform | `rotateX(62deg)` · scale `0.92` · opacity `0.22` |
| Panel duration | `360ms` |
| Panel settle | translateY centre · scale `1` · opacity `1` |
| Code | `CE-34878-0` (abstract placeholder) |
| Trigger | SIMULATE CRASH / RETRY / CLOSE APP |

## Acceptance

1. Playing: game label visible; error panel hidden.
2. Crashed: play surface folds back; error panel rises with RETRY and CLOSE APP.
3. Status announces crash vs playing.

## Reduced motion

Fold and panel snap to end states; transitions removed under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
