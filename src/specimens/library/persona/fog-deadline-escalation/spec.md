# Fog Deadline Escalation

Persona 4–adjacent calendar pressure: as days remaining shrink, fog density and hazard warning geometry escalate over a case file card.

## Visual intent

- Case file card with deadline meter
- Fog overlay thickens from calm → pressure → critical → expired
- Critical/expired phases add diagonal yellow/black warning stripes
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Range slider (0–14 days) drives phase and meter fill
- Phases: calm (>7), pressure (4–7), critical (1–3), expired (0)

## Reduced motion

Stop meter transitions and warning pulse under both RM triggers; static opacity levels remain.

## Accessibility

- Range input has `:focus-visible` ring
- Live region announces deadline pressure level
