# Objective Chain Advance

Four mission checkpoints complete in sequence (Run auto-play); each completion sends a pulse along the connecting line to activate the next checkpoint, resolving to **MISSION CLEAR**.

## Behaviour

- Idle: checkpoint one is `current`, the rest `pending`, status `IN PROGRESS`.
- Active: current checkpoint completes (~200ms), a pulse travels its outgoing link (~220ms), then the next checkpoint becomes current.
- Resolved: all four complete, status `MISSION CLEAR`, held until reset/replay.
- Reduced motion: jump straight to MISSION CLEAR with all checkpoints complete.

## Freeze

- Checkpoint count: 4
- Complete: 200ms · pulse travel: 220ms · settle: 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
