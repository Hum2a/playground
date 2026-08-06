# Hazard Stripe Reveal

Persona 4–adjacent KEEP OUT language: diagonal yellow/black hazard stripes sweep away to expose newly available content.

## Visual intent

- Full-stage diagonal hazard stripe overlay on cream content card
- Reveal button sweeps stripes off-stage (~620ms)
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Starts covered; Reveal runs stripe sweep animation
- Reduced motion: stripes jump to revealed position instantly

## Reduced motion

Disable sweep animation under both RM triggers; content visible immediately.

## Accessibility

- Decorative stripes use `aria-hidden`
- Live region announces covered → revealing → revealed
- Reveal button has `:focus-visible` ring
