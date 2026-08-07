# Wire Connection Draw

A thin wire rapidly draws between two nodes, then both endpoints pulse to confirm a linked connection.

## Behaviour

- Idle: UNLINKED, stroke undrawn.
- Drawing: dashoffset animates pathLength 76 over 180ms.
- Linked: endpoint pulse, status LINKED after 80ms.
- Reduced motion: fully drawn LINKED immediately.

## Freeze

- Draw: 180ms · settle: 80ms · pathLength: 76 · line: (14,20)→(86,20)
- Palette: `#070B0E` / `#C8E8DC` / `#3DCEA8` / `#1A6B58` / `#D7F5EC`
