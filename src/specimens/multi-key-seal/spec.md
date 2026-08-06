# Multi-Key Seal

Three prerequisite key nodes must each arm before the seal opens. Run auto-arms them in order (150ms apart, 3 keys); once the third arms, three triangular petals rotate outward and the core brightens.

## Behaviour

- Idle: three unarmed key nodes, closed seal petals, status `SEALED`.
- Arming: nodes light up left-to-right, ~150ms apart.
- Opening: once all three armed, petals rotate outward over 300ms; core pulses.
- Resolved: petals open, core lit, status `OPEN`.
- Reduced motion: all key nodes appear armed and petals appear already open.

## Freeze

- Key step: 150ms × 3 · petal open: 300ms · core pulse: 150ms · settle: 90ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
