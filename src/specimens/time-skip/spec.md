# Time Skip

Temporal transition: five horizontal bands of the current schedule jump on fixed offsets, then swap to the destination band-by-band and realign. Not a glitch loop.

## States

| State | Clock | Phase |
| --- | --- | --- |
| Before | `16:20` | `AFTER SCHOOL` |
| After | `19:10` | `EVENING` |

Trigger: **PASS TIME**.

## Sequence (~480ms)

1. Split into exactly **5** horizontal slices.
2. Offset: slice 1 `−18px`, slice 3 `+22px`, slice 5 `−12px` (~40ms in).
3. Hold ~**60ms**.
4. Replace each slice with its destination face, staggered **40ms**.
5. Mid-skip: show **`+02:50`** for ~**140ms**.
6. Realign destination slices into one complete image.

## Reduced motion

Immediate `19:10` / `EVENING`. No offsets, marker, or stagger.
