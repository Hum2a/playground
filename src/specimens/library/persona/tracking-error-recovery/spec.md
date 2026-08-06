# Tracking Error Recovery

Persona 4–adjacent CRT broadcast: horizontal tearing bands destabilise content until a calibration action fixes the feed.

## Visual intent

- Live broadcast screen with three horizontal tear bands
- Calibrate button animates bands away to stable state
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## Interaction

- Starts in error state with animated tear bands
- Calibrate runs ~520ms recovery sequence
- Reduced motion: instant stable state

## Reduced motion

Stop band tear animations under both RM triggers; static offset or hidden bands remain.

## Accessibility

- Calibrate button has `:focus-visible` ring
- Live region announces error → calibrating → recovered
