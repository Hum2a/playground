# VHS Tracking Scrub

Persona 4–adjacent analogue broadcast: a tracking slider deliberately introduces and removes horizontal tear errors on a VHS-style screen.

## Visual intent

- Cream interview tape screen with scanlines
- Off-centre dial values add horizontal tear bands and content drift
- Centre position (50) = clean stable feed
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Range slider 0–100; centre ±4 = clean, ±18 = error, beyond = severe

## Reduced motion

Stop tear and drift animations under both RM triggers; static offset remains visible.

## Accessibility

- Range input has `:focus-visible` ring
- Live region announces tracking state
