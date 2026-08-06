# Yellow Impact Wipe

Persona 4–adjacent graphic language: a saturated yellow plane cuts across the preview to exchange scene states.

## Visual intent

- Scene A on cream, Scene B on ink
- Yellow wipe sweeps in then out (~600ms total)
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Impact wipe button runs two-phase yellow sweep
- Reduced motion: instant scene swap

## Reduced motion

Disable wipe animations under both RM triggers; scene B appears immediately.

## Accessibility

- Live region announces scene A → wiping → scene B
- Trigger button has `:focus-visible` ring
