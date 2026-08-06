# Clone Failure Pop

Three worker clones run in parallel. Worker 2 pops and collapses mid-run while workers 1 and 3 continue to completion.

## Behaviour

- Idle: three pending workers, status `IDLE`.
- Running: all three bars begin filling toward 100% (~320ms).
- Failure: at 150ms, worker 2 pops (scale/rotate collapse), bar snaps to 38% and turns red, marked `FAILED`.
- Done: workers 1 and 3 reach `DONE`; status reads `2 SUCCEEDED · 1 FAILED`.
- Reduced motion: final succeeded/failed states appear immediately.

## Freeze

- Fail index: worker 2 · fail at: 150ms · finish: 320ms · settle: 80ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
