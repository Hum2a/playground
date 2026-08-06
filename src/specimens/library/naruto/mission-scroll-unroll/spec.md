# Mission Scroll Unroll

A rolled parchment scroll between two caps expands vertically, then reveals four briefing lines (rank, title, rule, brief) with a short stagger.

## Behaviour

- Idle: scroll collapsed to a thin rolled core, status `ROLLED`.
- Unrolling: body grows to full height over 480ms; lines fade/rise in with a 70ms stagger starting once the body is mostly open.
- Resolved: all lines visible, status `BRIEFED`.
- Reduced motion: scroll appears fully open with all lines visible immediately.

## Freeze

- Unroll: 480ms · line stagger: 70ms × 4 lines · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
