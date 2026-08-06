# Summoning Seal Materialise

A radial seal draws itself in two ring stages (Run auto-play), then a panel rises out of its centre and settles into place, resolving to **MATERIALISED**.

## Behaviour

- Idle: undrawn seal, hidden panel, status `IDLE`.
- Active: outer ring draws (~300ms), inner ring + radial ticks draw (~260ms), panel rises with a settle pulse (~300ms).
- Resolved: full seal and materialised panel held, status `MATERIALISED`, until reset/replay.
- Reduced motion: jump straight to the fully drawn seal and materialised panel.

## Freeze

- Stages: outer ring 300ms · inner ring 260ms · panel 300ms · settle 100ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
