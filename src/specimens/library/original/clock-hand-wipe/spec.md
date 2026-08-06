# Clock-Hand Wipe

Radial transition: a clock-like hand sweeps clockwise from 12 o'clock. The sector behind the hand reveals the destination through a conic mask — no crossfade.

## Behaviour

1. **Idle** — current scene fully visible; destination masked to 0°.
2. **Wipe (~700ms)** — `--cw-sweep` animates `0 → 360`. Destination `mask-image: conic-gradient(...)` opens with the hand. Primary hand at sweep angle; pale trail ~4° behind; 10px hub at `50% 50%`.
3. **Contract (~280ms)** — hands and hub shrink into centre.
4. **Done** — mask removed; destination owns the stage.

## Reduced motion

Immediate destination (`data-state="done"`, sweep 360). No hand animation.

## Portable notes

Hand length is `150%` of the stage so the tip exceeds the host diagonal. Width is `2px`. Origin is centre.
