# Directional Speed Wipe

Right-to-left navigation wipe bridged by a dense field of **24** predetermined manga speed lines.

## Behaviour

- Idle: Panel A visible; Panel B waits at `translateX(38px)`.
- Wipe (~520ms travel, complete ≤580ms): lines accelerate RTL; outgoing slides to `-38px` and fades slightly; incoming settles to `0`.
- Done: Panel B only; line nodes removed.
- Reduced motion: immediate Panel B, no travelling lines.

## Freeze

- Direction: right-to-left
- Lines: 24 · lengths 80–260px · thickness 2–6px · angle ≤ ±2deg
- Shift: 38px · easing: `cubic-bezier(.7,0,.2,1)` · ink: `#111111`
