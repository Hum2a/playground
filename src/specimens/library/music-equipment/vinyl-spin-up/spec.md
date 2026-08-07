# Vinyl Spin-Up

A stopped record has a fixed target speed of 33? RPM. Starting drive turns the static marker through one deterministic turn and exposes the completed target speed.

## State contract

- **Idle:** Platter is stopped at 0 RPM.
- **Action:** Accelerating is labelled while the fixed control change resolves.
- **Final:** Platter reached the fixed 33? RPM target.

## Reduced motion

Both supported reduced-motion triggers resolve immediately to the labelled final state; the final visual data remains visible.
