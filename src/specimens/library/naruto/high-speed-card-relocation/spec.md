# High-Speed Card Relocation

A selected card leaves exactly two fading afterimages as it relocates at speed into a second container slot.

## Behaviour

- Idle: card in slot A.
- Travel: 200ms path with ghosts at 0% (life 220ms) and 25% (spawn 60ms, life 150ms).
- Mid-travel: card absent from both slots.
- Docked: card in slot B after settle 40ms.
- Reduced motion: card in B immediately.

## Freeze

- Travel: 200ms · settle: 40ms · ghosts: 2 at 0%/25%
- Palette: `#0C1014` / `#D0D6DC` / `#8AA0B4` / `#5A6870` / `#EEF2F4`
