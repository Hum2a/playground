# Now Playing Expansion (portable recreation spec)

Compact playback strip for `NIGHT SIGNAL` by `VECTOR` expands to rich controls while progress `01:42 / 03:18` persists.

## Contract

| Parameter | Value |
| --------- | ----- |
| Compact | `300 × 56px` |
| Expanded | `360 × 260px` |
| Expansion | `360ms` |
| Progress | `01:42` retained through collapse |
| Control reveal | previous → play/pause → next → volume |

## Reduced motion

Immediate compact/expanded state switch.

## API

- `resetNowPlayingExpansion()`
