# Shared Resource Pool

One finite `ENERGY // 100` pool contains exactly 20 fixed units of 5 capacity.

| Consumer | Units | Capacity |
| --- | --- | --- |
| BUILD | 8 | 40 |
| TEST | 7 | 35 |
| SHIP | 3 | 15 |
| Remaining | 2 | 10 |

BUILD starts first; TEST starts after BUILD unit four, and SHIP starts after TEST unit
three. Units visibly leave the pool before docking; they never duplicate. Pool commits
`100 → 60 → 25 → 10`; consumer metrics commit only after their final dock.

At 25 two fixed warning ticks appear. At 10 the textual `LOW` state appears.

Reduced motion immediately shows the final allocation.

## API
`window.sharedResourcePool.allocate()` · `.reset()`
