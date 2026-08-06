# Midnight Channel Signal Acquisition (portable recreation spec)

Persona 4–inspired CRT broadcast tuner. Agents can rebuild from this document and `contract.json`.

## Visual intent

- CRT frame with scanlines and analogue static overlay
- Tune slider scrubs noise until broadcast locks
- SIGNAL LOCK headline with READY badge on lock
- Palette: `#F5C400` / `#101010` / `#F7F3E8` / `#E8E8E8`

## Interaction

- Range input 0–100; lock threshold at 88%
- Static opacity decreases with tune value
- Reset returns to idle noise state

## Reduced motion

Stop static flicker and transitions when:

- `@media (prefers-reduced-motion: reduce)`, or
- `data-force-reduced-motion="true"` on document root

Locked state still readable at threshold without animation.

## Accessibility

- `aria-live="polite"` region announces tune and lock state
- Tune input has visible label
- Decorative static and scanlines use `aria-hidden`
