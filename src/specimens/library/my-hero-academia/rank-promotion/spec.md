# Rank Promotion

## Visual intent

Hero ranking list where UNIT-07 at #4 promotes upward; UNIT-22 at #3 shifts down. RANK UP badge appears on the promoted row. Comic geometry with ink borders and diagonal clip on the trigger.

## Colour contract

| Token | Hex |
| --- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Promote | 0ms | Rows translate (580ms) |
| Badge | 680ms | RANK UP scales in |
| Settled | 1230ms | Final state locked |

## Reduced motion

Both triggers: rows jump to final positions; badge visible immediately.

## API

- `runRankPromotion()`
- `resetRankPromotion()`
- `replayRankPromotion()`
