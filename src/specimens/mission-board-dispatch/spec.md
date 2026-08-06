# Mission Board Dispatch

A job card leaves the unassigned board column and travels into a team lane, docking beside its assignee (Run auto-play or Replay).

## Behaviour

- Idle: card sits in the unassigned column, status `UNASSIGNED`.
- Active: card travels across the board toward the team lane (~260ms).
- Resolved: card docked in the team lane with a settle pulse, status `ASSIGNED`, held until reset/replay.
- Reduced motion: jump straight to the docked state.

## Freeze

- Travel: 260ms · settle: 200ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
