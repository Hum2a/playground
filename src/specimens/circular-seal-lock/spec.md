# Circular Seal Lock

A ring of six radial marks starts rotated off-axis from six fixed index marks. Rotating the ring back to 0° aligns every mark; the core then pulses to confirm the lock.

## Behaviour

- Idle: ring rotated -42° from the fixed index marks, status `UNLOCKED`.
- Aligning: ring rotates to 0° over 520ms with a slight settle overshoot.
- Locked: marks aligned, core pulses, status `LOCKED`.
- Reduced motion: ring appears already aligned and locked, no rotation.

## Freeze

- Rotation: 520ms · initial offset: -42° · lock pulse: 150ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#69745A` / `#F4F1E8`
