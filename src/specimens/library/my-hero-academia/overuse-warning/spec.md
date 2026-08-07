# Overuse Warning

Repeated ACTIVATE pushes OUTPUT STRAIN through elevated levels to WARNING and EXHAUSTED.

**Ref:** SPX-2004 · **Catalogue:** MHA-030

## Levels

`25% NOMINAL → 45% ELEVATED → 65% STRAINED → 85% WARNING → 100% EXHAUSTED`

## Timing (ms)

| Phase | ms |
| --- | --- |
| Step fill | 580 |
| Ink jitter (WARNING+) | 120 |

## Escalation

- WARNING+ (level 3–4): hazard corner plates, hatch overlay, accent chrome
- One-shot ink jitter on first entry to WARNING and EXHAUSTED
- ACTIVATE disabled at EXHAUSTED

## API

`runOveruseWarning()` · `resetOveruseWarning()` · `replayOveruseWarning()`

## Reduced motion

Jump directly to each level's final width; skip fill and jitter.
