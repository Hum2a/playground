# Evolution Complete

## Visual intent

Terminal registration after an identity transformation. Form 02 is already present but `UNREGISTERED`. It settles from an elevated pose, a thin registration ring contracts, four cardinal markers lock, a hard left→right sweep replaces the status with `CANONICAL`, and `PREVIOUS // FORM 01` slides into an archive position. Continuity, not deletion.

## DOM structure

- `.ec[data-evolution-complete]` — root; `data-state` idle | running | canonical
- `.ec__entity` — Form B silhouette (already present)
- `.ec__ring` + four `.ec__cardinal--n|e|s|w`
- `.ec__sweep` — identity lock line
- Status clip: `UNREGISTERED` / `CANONICAL` (clip wipe, no fade)
- `.ec__prev` — historical previous-form marker
- `REGISTER` / `RESET` + polite live region

## Copy

| Slot | Text |
| --- | --- |
| Id | `FORM // 02` |
| Initial status | `UNREGISTERED` |
| Final status | `CANONICAL` |
| Previous | `PREVIOUS // FORM 01` |
| Action | `REGISTER` |

## Layout and colour contract

### Entity (Form B) — `145 × 175px`

Same frozen clip-path as SPX-724 Form B.

### Timings

| Phase | Duration |
| --- | --- |
| Settle `1.08/-6px → 1/0` | `180ms` |
| Ring `160% → 112%` | `260ms` |
| Cardinal lock | `90ms` |
| Sweep + status wipe | `160ms` |
| Archive slide | `180ms` |

### Colours

| Token | Value |
| --- | --- |
| Near | `#0c0a12` |
| Body | `#9b86c9` |
| Glow | `#f7f2ff` |
| Ring | `#d9c8f5` |

Exactly four cardinal markers. Status changes only during the sweep. Final frame is static.

## Reduced motion

Immediately show Form 02 + CANONICAL + archived previous marker with ring/markers settled.

## Accessibility

- Live + visually hidden text state unregistered vs canonical identity
- Decorative entity/ring/markers/sweep are `aria-hidden`
- Real buttons with `:focus-visible`

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Call `evolutionComplete.run()` / `.reset()` or use the buttons.
3. Keep frozen Form B polygon, ring scales, four cardinals, and no-fade status wipe.
4. No Pokémon assets, glow loops, or particles.
