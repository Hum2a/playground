# Shuriken Radial Menu

An abstract four-point shuriken glyph rotates open into four radial action sectors (N/E/S/W).

## Behaviour

- Closed: hub glyph centred, no sectors reachable, status `CLOSED`.
- Opening: hub rotates 135°; four sectors emerge radially, staggered 40ms apart (~140ms each).
- Open: all four sectors reachable by keyboard, status `OPEN`.
- Selecting a sector, or clicking the hub again, closes the menu.
- Reduced motion: all four sectors appear open immediately, no rotation.

## Freeze

- Sector count: 4 · stagger: 40ms · open: 260ms · settle: 40ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
