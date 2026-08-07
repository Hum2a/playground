# Deck Sync Lock

Two neutral deck discs expose their fixed BPMs and phase markers. Locking resolves deck B from 123.2 to the fixed 124.0 target and aligns its 18? phase offset.

## State contract

- **Idle:** Deck B is 0.8 BPM behind deck A.
- **Action:** Matching is labelled while the fixed control change resolves.
- **Final:** Both decks are locked at 124.0 BPM.

## Reduced motion

Both supported reduced-motion triggers resolve immediately to the labelled final state; the final visual data remains visible.
