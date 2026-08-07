# Beatgrid Lock

Four fixed transient markers begin 18 ms off a four-beat grid. Quantizing aligns each marker to its matching beat division and reports a zero-offset final state.

## State contract

- **Idle:** Transient markers are offset by 18 ms.
- **Action:** Quantizing is labelled while the fixed control change resolves.
- **Final:** Four fixed transients are locked to the beat grid.

## Reduced motion

Both supported reduced-motion triggers resolve immediately to the labelled final state; the final visual data remains visible.
