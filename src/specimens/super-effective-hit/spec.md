# Super Effective Hit

## Visual intent

Compact high-impact feedback. An angular action token travels into a **CACHE STRATEGY** card; the card gives a small ordinary hit response, then a stronger secondary burst (six wedges + scale amp + diagonal slash) communicates unusual effectiveness. Status clips from `MATCH // UNKNOWN` to `MATCH // OPTIMAL`, then `HIGH EFFECTIVENESS` enters from below. No franchise battle UI.

## DOM structure

- Root `[data-super-effective]`
- Stage: action token + card (six wedges, slash, title, match clip, effectiveness line)
- Polite status + APPLY / RESET

## Copy

| Role | Text |
| --- | --- |
| Card title | `CACHE STRATEGY` |
| Initial match | `MATCH // UNKNOWN` |
| Final match | `MATCH // OPTIMAL` |
| Secondary | `HIGH EFFECTIVENESS` |
| Trigger | `APPLY` |
| Reset | `RESET` |

## Layout and colour contract

Palette `#161d21` / `#f4f1df` / `#e39b3a` / `#f4d35e` / `#e85b4a`. Token starts ~90px left; travel `translateX(0→82px)` in 150ms (ease-in). Contact 60ms (`scale 1→.96`, `translateX 0→4px`). Secondary 55ms after contact: six wedges 12–34px / 130ms; amp `.98→1.035→1` / 170ms; slash −12deg / 120ms. Total ~515ms.

## Reduced motion

Immediate OPTIMAL + HIGH EFFECTIVENESS with one static slash and one static wedge. No travel, contact, or burst animation.

## Accessibility

Success is text (`MATCH // OPTIMAL`, `HIGH EFFECTIVENESS`, polite status). Decorative token/wedges/slash are `aria-hidden`. Visible focus on controls. Colour is not the only signal.

## Porting to another stack

Import `demo.css` verbatim. Call `runSuperEffectiveHit` / `resetSuperEffectiveHit`. Freeze timings, wedge lengths/angles, and colours from `contract.json`.
