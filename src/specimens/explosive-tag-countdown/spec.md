# Explosive Tag Countdown

A warning tag arms, counts down 3-2-1 through rising-intensity pulses (Run auto-play), detonates, and settles to **CLEAR**.

## Behaviour

- Idle: tag at rest, status `IDLE`.
- Armed: border and ring flash to warning colour (~220ms).
- Counting: digit 3 → 2 → 1, ring/digit pulse speeds up each step (480ms per step).
- Burst: radial flash (~240ms).
- Cleared: tag desaturates, status `CLEAR`, held until reset/replay.
- Reduced motion: jump straight to CLEAR.

## Freeze

- Arm: 220ms · step: 480ms × 3 · burst: 240ms · settle: 200ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
