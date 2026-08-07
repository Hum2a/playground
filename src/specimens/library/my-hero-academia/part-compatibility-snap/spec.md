# Part Compatibility Snap

## Visual intent

Dragged component magnetically approaches a compatible slot with eased pull (14px gap halo), then snaps into place with four corner lock ticks.

## Frozen timing

| Phase | Duration |
| --- | --- |
| Magnet approach | 180ms |
| Snap travel | 520ms |
| Lock ticks | 160ms (0/35/70/105ms stagger) |

## API

- `runPartSnap()`
- `resetPartSnap()`
- `replayPartSnap()`

Wave C: magnet gap, snap ms, and tick stagger frozen in contract.
