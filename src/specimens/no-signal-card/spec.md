# No Signal Card

Persona 4–adjacent broadcast fallback: unavailable content becomes a bold no-signal card with colour bars and static texture.

## Visual intent

- Ink card with SMPTE-style colour bars header
- Large NO SIGNAL title with triangle icon
- Subtle static texture overlay
- Toggle swaps to available feed state
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Toggle availability button swaps unavailable ↔ available states
- Reduced motion: static flicker stops; states remain visible

## Reduced motion

Stop static overlay animation under both RM triggers.

## Accessibility

- Live region announces availability state
- Toggle button has `:focus-visible` ring
