# Part Compatibility Snap

## Visual intent

MODULE-3 part is magnetically attracted to SLOT A and snaps into place with compatibility confirmation.

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Magnet | 0ms | Slot highlights (180ms) |
| Snap | 520ms | Part locks into slot |
| Settled | 1100ms | Compatible state locked |

## API

- `runPartSnap()`
- `resetPartSnap()`
- `replayPartSnap()`
