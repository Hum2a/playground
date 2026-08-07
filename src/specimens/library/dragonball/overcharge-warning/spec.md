# Overcharge Warning (portable recreation spec)

**Ref:** SPX-970 · **Catalogue:** DB-005

## Intent

Distinguish progress toward safe completion from operation beyond safe capacity.
At 100% the meter **ruptures** at the seam — three crack lines, border turns
rupture-orange — then a dedicated 100–125% overflow bay unfolds. Energy **bleeds
past the frame** (glow bands + drip spill); at 118% an **OVERFLOW RUPTURE** alert
band appears alongside hatch, warn markers, and frame shift. Not just a yellow
label — structure + bleed + text.

## Ladder (frozen)

`72 → 84 → 93 → 100 → 106 → 112 → 118`

| Milestone | Behaviour |
| --- | --- |
| 100% | Hold 160ms · `NOMINAL MAXIMUM` |
| >100% | Rupture cracks at seam · overflow bay unfolds (25% scale) |
| 106% | Two warning markers + bleed band A |
| 112% | Frame shifts 1px once · bleed band B widens |
| 118% | Diagonal hatch · drip spill · `OVERFLOW RUPTURE` band · `OVERCHARGED` |
| 125% | Hard-limit marker visible; not crossed |

## Visual layers

| Layer | Role |
| ----- | ---- |
| Safe fill | 0–100% track (280px) |
| Rupture | 3 crack lines at 100% seam |
| Overflow bay | 70px (25% of safe width) |
| Bleed A/B | Glow extending past frame right edge |
| Spill | Drip below overflow at 118% |
| Alert band | `OVERFLOW RUPTURE` structural warning |

## Dimensions

| Token | Value |
| --- | --- |
| Safe track | 280px |
| Overflow bay | 70px (25%) |
| Rupture pop | 120ms |

## API

- `runOverchargeWarning()`
- `resetOverchargeWarning()`

## Reduced motion

Immediate 118%, rupture visible, expanded overflow bay, bleed, hatch, alert band, OVERCHARGED.

## Accessibility

`role="meter"` with `aria-valuetext` above safe capacity. Polite announcements at 106%, 112%, 118%. Warning uses structure + text, not colour alone.
