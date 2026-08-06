# Chakra Charge Field

An irregular jagged boundary fills with chakra while its core is held (pointer or Space). Releasing at any point **commits** the level reached — there is no cancel state.

## Behaviour

- Idle: empty boundary, status `IDLE`.
- Charging: fill rises 0→100% over 620ms while held.
- Committed: whatever level was reached locks in, boundary rim flashes, status `COMMITTED`.
- Run auto-holds to 100% then commits; Replay resets and reruns.
- Reduced motion: any press (manual or Run) commits at 100% instantly, no continuous fill or pulse.

## Freeze

- Charge duration: 620ms · commit settle: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
