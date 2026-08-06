# High-Speed Card Relocation

A selected card leaves exactly two fading afterimages as it relocates at speed from slot A into slot B.

## Behaviour

- Idle: card resting in slot A, status `SLOT A`.
- Travelling: card slides to slot B (~200ms) while two afterimages spawn and fade (220ms / 150ms lifetimes).
- Arrived: card settles in slot B, slot A labelled `EMPTY`, status `SLOT B`.
- Reduced motion: card appears directly in slot B, no travel or afterimages.

## Freeze

- Travel: 200ms · ghost count: 2 (lifetimes 220ms / 150ms) · settle: 40ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
