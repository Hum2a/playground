# Mission Rank Reveal

A generic rank card slams into the briefing panel (Run auto-play), then a rubber stamp impacts on top to confirm it, resolving to **RANK CONFIRMED**.

## Behaviour

- Idle: no card, no stamp, status `PENDING`.
- Active: card slams in with a bounce (~280ms), then the stamp impacts once the card has settled (~240ms).
- Resolved: card and stamp held in place, status `RANK CONFIRMED`, until reset/replay.
- Reduced motion: jump straight to RANK CONFIRMED with card and stamp settled.

## Freeze

- Card: 280ms · stamp: 240ms · settle: 100ms
- Rank: fixed generic `B`
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
