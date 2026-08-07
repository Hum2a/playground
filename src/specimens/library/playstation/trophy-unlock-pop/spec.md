# Trophy Unlock Pop

A compact achievement toast runs a finite three-phase sequence:
**enter → shine → settle**. One shine sweep only — no looping glitter.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `400 × 300px`, `overflow: hidden` |
| Enter | `320ms` |
| Shine | `480ms` |
| Settle | `200ms` |
| Phases | `idle → enter → shine → settled` |
| Tier copy | Bronze tier |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- **Unlock** plays enter, then a single shine sweep, then settled border hold.
- **Reset** hides the toast and returns to idle.
- Abstract cup glyph only — no logos or franchise marks.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by jumping to the settled toast with no
enter/shine animation.

## API

- `runTrophyUnlockPop()` — play phases
- `resetTrophyUnlockPop()` — return to idle
