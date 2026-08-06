# Lightning Target Acquisition

A loose reticle snaps onto a fixed target (Run auto-play), with brief branching marks flickering at the corners just before it locks solid.

## Behaviour

- Idle: reticle offset from the target, status `IDLE`.
- Acquiring: reticle travels and settles onto the target (~440ms); branch marks flicker in the final ~180ms.
- Locked: reticle and target snap to full colour, status `LOCKED`, held until reset/replay.
- Reduced motion: jump straight to LOCKED.

## Freeze

- Snap: 440ms · settle: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
