# Scratch Recoil

A fixed record has one cue mark and one held needle. Recoil moves the needle back to the cue, changing the cue label and timeline to the final returned state.

## State contract

- **Idle:** Needle is held 1.2 beats from cue.
- **Action:** Recoiling is labelled while the fixed control change resolves.
- **Final:** Needle returned to the fixed cue marker.

## Reduced motion

Both supported reduced-motion triggers resolve immediately to the labelled final state; the final visual data remains visible.
