# Scrolling DJ Waveform

A fixed sixteen-bar transport display starts parked at 01:12. Scrolling moves the deterministic waveform beneath a stationary playhead and ends with the 01:20 cue highlighted.

## State contract

- **Idle:** Waveform is parked at 01:12.
- **Action:** Scrolling is labelled while the fixed control change resolves.
- **Final:** Waveform reached the fixed cue at 01:20.

## Reduced motion

Both supported reduced-motion triggers resolve immediately to the labelled final state; the final visual data remains visible.
