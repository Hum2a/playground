# Swipe Full Commit (portable recreation spec)

Row `CACHE // BUILD-04` swipes left to reveal DELETE at `72px` and auto-commits at
`190px`, collapsing height `64→0` over `220ms`. UNDO restores the row.

## Contract

| Parameter | Value |
| --------- | ----- |
| Row width | `340px` |
| Reveal threshold | `72px` — DELETE fully readable |
| Commit threshold | `190px` — full backing + one commit marker |
| Action-open settle | `88px` when released between thresholds |
| Collapse | `64→0px` over `220ms` |
| UNDO | restores exact row |

## Reduced motion

Preserve thresholds; commit may collapse immediately.

## API

- `undoSwipeFullCommit()`
- `resetSwipeFullCommit()`
