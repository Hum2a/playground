# Platinum-Style Completion

A five-slot trophy **collection** fills to 4/5. Unlocking the final slot does
not merely add a fifth mark — the collection **collapses and transforms** into
a master completion emblem (four geometric shapes + MASTER COMPLETE).

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 340px`, `overflow: hidden` |
| Slots | `5` (start earned: `4`) |
| Locking | `320ms` |
| Master transform | `480ms` |
| Phases | `collection → locking → transform → master` |
| Master accent | `#C8D4E0` platinum |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |

## Interaction

- Initial state shows bronze/silver/gold marks with one empty final slot.
- **Unlock final** fills the last slot, collapses the grid, and reveals the
  master emblem.
- **Reset** restores the 4/5 collection.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by jumping to the master emblem with no
collapse/transform animation. RM selectors target only `.psc__grid`,
`.psc__slot`, and `.psc__master` — no orphan mega-kit class list.

## API

- `unlockPlatinumStyleCompletion()` — collection → master
- `resetPlatinumStyleCompletion()` — restore 4/5 collection
