# Active Bottom-Nav Pill Transfer (portable recreation spec)

Single 64×32px indicator pill moves between four bottom navigation destinations.
Content uses fade-through handoff. No images, audio, network, or storage.

## Layout contract

| Token | Value |
| ----- | ----- |
| Nav bar | 360 × 72px |
| Pill | 64 × 32px |
| Pill travel | 280ms |
| Content fade | 240ms |
| Destinations | 4 |

## API

- `selectBottomNavItem(index)`
- `resetActiveBottomNavPillTransfer()`

## Reduced motion

Indicator jumps directly; content swaps instantly.

## Accessibility

Arrow keys navigate between items. `aria-current="page"` on active destination.
