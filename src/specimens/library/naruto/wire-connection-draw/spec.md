# Wire Connection Draw

A thin wire rapidly draws between two nodes, then both endpoints pulse to confirm a linked connection.

## Behaviour

- Idle: nodes A and B unconnected, status `UNLINKED`.
- Drawing: the wire's stroke-dashoffset animates from full to zero (~180ms).
- Linked: both node dots fill and pulse once (~80ms), status `LINKED`.
- Reduced motion: the wire and LINKED state appear immediately.

## Freeze

- Draw: 180ms · settle: 80ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
