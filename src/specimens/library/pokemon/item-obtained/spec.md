# Item Obtained

## Visual intent

An abstract Energy Shard is discovered, presented, then travels into an inventory
slot and increments quantity. Pokemon-inspired acquisition language — original
geometry only (no game item artwork).

Canonical demo: ENERGY SHARD ×02 → OBTAIN ITEM → ×03.

## DOM structure

```
.iob[data-item-obtained]
  .iob__stage
    .iob__present
      .iob__item          5 facets (a–e)
      .iob__label-block   ENERGY SHARD + rule
    .iob__slot            inventory row + qty clip + 2 accents
    .iob__obtained        ITEM OBTAINED (reduced / optional)
  .iob__qty-text          live ×02 / ×03 text
  button OBTAIN ITEM
  .iob__status[role=status]
```

## Frozen values

| Token | Value |
| --- | --- |
| Item | `ENERGY SHARD` |
| Start qty | `×02` |
| End qty | `×03` |
| Item size | `58 × 72px` |
| Primary facets | `5` |
| Palette | `#1a2528` `#f4efda` `#e5b847` `#72a98c` `#d8684e` |
| Rule width | `110px` |

## Timing (from OBTAIN ITEM)

| Phase | Window (ms) | Effect |
| --- | --- | --- |
| Discovery | 0–240 | Enter from `translateY(30px)`; scale `.7 → 1.08 → 1`; rotate `-8 → 4 → 0` |
| Present | 240–500 | Hold centred; label; rule `0 → 110px` (120ms) |
| Transfer | 500–820 | Slot reveals; item scales `1 → .32` on two-stage curve (320ms) |
| Dock | 820–960 | Slot `1 → .94 → 1.03 → 1` (140ms); only after the item docks, qty `02 → 03` |
| Accents | 960–1050 | Exactly two lines, ~90ms |

Do **not** change quantity before docking. The terminal state keeps the filled
inventory row, `ENERGY SHARD ×03`, and visible `ITEM OBTAINED` text after accents end.

## Reduced motion

Immediate inventory ×03 + static `ITEM OBTAINED`.

## Accessibility

- Final quantity as normal text (`ENERGY SHARD ×03`)
- Status announces once at completion — no intermediate count
- Decorative gem / accents: `aria-hidden`

## Porting

Import `demo.css` verbatim. API: `runItemObtained` / `resetItemObtained` / `replayItemObtained`.
