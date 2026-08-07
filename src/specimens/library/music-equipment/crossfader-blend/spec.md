# Crossfader Blend

Two fixed four-segment channel meters begin with channel A dominant. The action moves one fader cap to centre and finishes with an explicit 50 / 50 blend.

## State contract

- **Idle:** Crossfader is parked on channel A.
- **Action:** Blending is labelled while the fixed control change resolves.
- **Final:** Channels A and B are blended at 50 / 50.

## Reduced motion

Both supported reduced-motion triggers resolve immediately to the labelled final state; the final visual data remains visible.
