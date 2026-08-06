# Badge Case Insert

## Visual intent

A newly earned abstract badge docks into slot 6 of a rigid 4×2 `TRIAL ARCHIVE`. Five slots begin occupied; slot 6 is marked, the badge travels from above the case, compresses on arrival, and only then does progress advance `5 / 8 → 6 / 8` with a track fill `62.5% → 75%`. Continuity of collection, not a toast.

## DOM structure

- `.bci[data-badge-case]` — root; `data-state` idle | running | stored; `data-count` 5 | 6
- `.bci__case` — 4×2 grid of 58px slots / 10px gap
- Slots 1–5 filled with distinct emblems; 6 target; 7–8 empty
- `.bci__incoming` — flyer badge (scale 1.25, ~80px above case)
- Count clip `5→6` + `.bci__track-fill`
- `STORE BADGE` / `RESET` + polite live region + SR summary

## Copy

| Slot | Text |
| --- | --- |
| Title | `TRIAL ARCHIVE` |
| Initial count | `5 / 8` |
| Final count | `6 / 8` |
| Action | `STORE BADGE` |

## Layout and colour contract

| Token | Value |
| --- | --- |
| Slot size | `58 × 58px` |
| Gap | `10px` |
| Grid | `4 × 2` (exactly 8 slots) |
| Incoming start scale | `1.25` |
| Travel | `320ms`, scale `1.25 → 0.78` |
| Target markers | inward `5px` / `100ms` |
| Dock compress | `0.78 → 0.70 → 0.80 → 0.78` / `180ms` |
| Slot frame | `1 → 1.06 → 1` |
| Progress line | `62.5% → 75%` after dock |
| Near / brass / bright | `#0e0c08` / `#c4a05a` / `#f0d78a` |

Incoming emblem `--6` is an original abstract seal (compatible with a future Badge Earned specimen). No Pokémon badge art.

## Reduced motion

Immediately show six occupied slots, docked emblem in slot 6, and `6 / 8`.

## Accessibility

- Visible count text + live announcements (`5 of 8` → `6 of 8`)
- Slots exposed as a list with occupied/empty labels
- Do not rely on visual slot fill alone

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Call `badgeCaseInsert.store()` / `.reset()` or use the buttons.
3. Keep frozen slot geometry, emblem clip-paths, and post-dock progress timing.
4. No rounded SaaS card grids, Pokémon assets, or looping motion.
