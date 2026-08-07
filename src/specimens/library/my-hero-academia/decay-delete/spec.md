# Decay Delete

## Visual intent

Target record shows three pre-crack lines, then crumbles into six irregular accent shards that fall outward; void state shows a dashed RECORD REMOVED stamp.

## Shard table (frozen)

Six irregular clip-path polygons with frozen dx/dy/rot and 60ms stagger ladder.

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Pre-crack | 0ms | Three lines draw (220ms) |
| Crumble | 220ms | Shards animate (580ms, staggered) |
| Settled | 1230ms | Void stamp visible |

## API

- `runDecayDelete()`
- `resetDecayDelete()`
- `replayDecayDelete()`

Wave C: shard table, pre-crack angles, and void stamp frozen in contract.
