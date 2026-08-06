# Fog-of-War Card

Persona 4–adjacent hidden-information card: unknown regions are revealed by pointer scrubbing across a fog canvas overlay.

## Visual intent

- Clue card on cream paper beneath grey fog canvas
- Pointer scrub erases fog with circular brush
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Pointer down/move scrubs fog via canvas `destination-out`
- ≥42% cleared triggers full-reveal state
- Reduced motion: first pointer contact reveals all

## Reduced motion

Disable fog fade transition under both RM triggers.

## Accessibility

- Live region announces obscured → partial → revealed
- Card is keyboard-focusable via tabindex if embedded by host
