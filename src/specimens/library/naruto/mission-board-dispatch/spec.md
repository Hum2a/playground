# Mission Board Dispatch

A **C-Rank Escort** card travels a frozen path from Unassigned into the team lane and docks.

## Behaviour

- Idle: card in pool, `UNASSIGNED`.
- Dispatch: translate ~148×0px over 260ms.
- Dock: settle pulse 200ms → `ASSIGNED`.
- Reduced motion: docked immediately.

## Freeze

- Travel: 260ms · path: 148×0 px · settle: 200ms
- Palette (mission paper): `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`
