# Lunar Deadline (portable recreation spec)

A discrete lunar deadline — remaining work is counted in moon phases, not a
wall clock. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Moon on the left; copy on the right: `DEADLINE` + `03 PHASES REMAINING`
- Geometric moon: lit disc + offset shade circle
- Exactly four states, waning only
- Urgency strengthens as phases remain; no flashing
- NEW may carry a static thin cyan/red boundary

## States

| Phase | Remaining | Urgency | Shade `translateX` |
| ----- | --------- | ------- | ------------------ |
| FULL | `03 PHASES REMAINING` | normal | `100%` |
| WANING GIBBOUS | `02 PHASES REMAINING` | elevated | `75%` |
| LAST QUARTER | `01 PHASES REMAINING` | urgent | `50%` |
| NEW | `00 PHASES REMAINING` | critical | `0` |

ADVANCE moves one state. RESET returns to FULL. No wrap. No `Date.now()`.

## Timing

Phase transition: `620ms`. Old illumination decreases as the shade slides in;
the phase label updates; urgency colour and tracking strengthen. Semantic copy
updates once per state — not per animation frame.

## Colours

| Token | Hex |
| --- | --- |
| Void | `#09111D` |
| Lit | `#C7CDD8` |
| Cyan | `#72D6E8` |
| Mute | `#236B91` |
| Urgency | `#C94F58` |

Do not use colour alone — the phase label must name the state.

## Reduced motion

Snap the target phase, remaining count, and urgency immediately. No 620ms
shade tween.

## Accessibility

- Root `aria-label` like `Deadline: three phases remaining` (dynamic)
- Polite live status announces the named phase + remaining count once
- Moon geometry is `aria-hidden`
- `:focus-visible` ring is `2px #72D6E8`

## Porting

Import `demo.css` verbatim. Call `advanceLunarDeadline` / `resetLunarDeadline`.
Use `type="button"` controls. No external assets, libraries, or parent access.
