# Smoke Mask Transition

Overlapping abstract circles billow in to cover the stage, a content swap happens under cover, then the circles disperse.

## Behaviour

- Idle: STATE 01 visible.
- Cover: 6 circles expand to full cover by 300ms.
- Swap: under full cover, panel identity flips A↔B.
- Disperse: circles clear by 700ms; settle 140ms.
- Reduced motion: instant swap.

## Freeze

- Total: 700ms · coverAt: 300ms · settle: 140ms · circles: 6 · coverScale: 2.4
- Palette: `#071018` / `#C8D8E4` / `#3A9EC9` / `#4A6A78` / `#E8F2F8`
