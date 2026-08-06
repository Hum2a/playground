# Pull To Refresh (portable recreation spec)

Eight-row feed with resisted pull, `72px` threshold, `RELEASE` state with two ticks,
committed refresh cycle `620ms`, and timestamp update `12:42:18 → 12:43:02`.

## Contract

| Parameter | Value |
| --------- | ----- |
| Max pull | `110px` resisted |
| Threshold | `72px` |
| Below threshold | return without refresh |
| Committed hold | `58px` |
| Refresh cycle | `620ms`, one full arc rotation |
| Timestamp | updates only after committed refresh |

## Reduced motion

Keep threshold interaction; static working indicator and direct completion.

## API

- `calcPullOffset(distance)`
- `resetPullToRefresh()`
