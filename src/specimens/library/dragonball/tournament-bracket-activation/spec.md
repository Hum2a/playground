# Tournament Bracket Activation

## Visual intent

`MODEL ARENA // 08` begins as a dormant eight-seed elimination bracket. On **OPEN BRACKET**, participants activate in pairs (A/B → C/D → E/F → G/H), eight first-stage segments construct to four quarter-final junctions, future guides strengthen, and the bracket settles at **ROUND // QF** / **BRACKET READY** — activation only, no winners. Inspired by tournament bracket structure — no logos, characters, or franchise symbols.

## DOM structure

```
.tba[data-tba][data-state][data-pairs]
  button[data-tba-open]
  .tba__meta / .tba__status / .tba__sr (matchup text)
  .tba__host
    .tba__board (fixed 480×300; scales via container query)
```

## Copy

| Element | Text |
| --- | --- |
| Tournament | `MODEL ARENA // 08` |
| Participants | ATLAS · NOVA · KITE · ECHO · VELA · ORBIT · FLINT · PULSE |
| Trigger | `OPEN BRACKET` |
| Initial | `DORMANT` |
| Final | `QUARTER-FINALS` · `BRACKET READY` · `ROUND // QF` |

## Timing (frozen)

| Phase | Duration | Effect |
| --- | --- | --- |
| Pair stagger | 70ms | A/B, C/D, E/F, G/H; both nodes +3px inward |
| Path construct | 140ms | Exactly 8 first-stage segments |
| Junction | after path | 8×8px · scale `0 → 1.15 → 1` · exactly 4 |
| Guides | ~160ms | SF then final paths strengthen |
| Label | clip | `ROUND // QF` |

## States

`idle` → `activating` → `guides` → `ready`

## Reduced motion

Immediately show fully activated bracket.

## Accessibility

Participant names are visible text. Matchup relationships listed as text. Status announces readiness.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep pair stagger 70ms, path 140ms, eight segments, four junctions.
3. Call `openTournamentBracket()` / `resetTournamentBracket()`.
4. Honour both reduced-motion triggers.
