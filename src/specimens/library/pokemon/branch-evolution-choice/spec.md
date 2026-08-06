# Branch Evolution Choice (portable recreation spec)

One current identity branches into three futures; the user chooses which path
the build becomes. Rebuild from this document and `contract.json`.

Do **not** reproduce Pokémon art, logos, sprites, fonts, or proprietary assets.
Use original abstract geometry only.

## Visual intent

- Current: `BUILD // STANDARD` at ~`50% / 68%`
- Futures: `PERFORMANCE` (left) · `BALANCED` (centre) · `PORTABLE` (right)
- Controls: `EVOLVE` → select → `CHOOSE` → `RESET`

## Frozen SVG geometry (viewBox `0 0 400 320`)

| Point | Coordinates |
| ----- | ----------- |
| Source | `(200, 250)` |
| Fork | `(200, 205)` — stem ≈ **45px** |
| PERFORMANCE | `(70, 72)` |
| BALANCED | `(200, 58)` |
| PORTABLE | `(330, 72)` |

Paths:

- Stem: `M 200 250 L 200 205`
- Left: `M 200 205 C 200 160 120 110 70 72`
- Mid: `M 200 205 L 200 58`
- Right: `M 200 205 C 200 160 280 110 330 72`

Growth uses `pathLength="100"` + `stroke-dashoffset` draw.

## Timing

| Phase | Duration |
| ----- | -------- |
| Shared stem draw | `180ms` |
| Branch split draw | `260ms` |
| Outer node stagger | `~40ms` after mid |
| Unselected retract | `220ms` |
| Travel along branch | `320ms` |

## Selection

- Radiogroup of three radios; arrow keys move selection
- Selected: larger node, stronger branch stroke, two brackets
- Unselected: subdued paths/nodes (still visible)

## Confirm

Unselected branches retract to the fork; selected thickens; current entity
travels to the destination and becomes `BUILD // {NAME}`.

## Reduced motion

Immediate branch structure; instant selection; Choose → final identity.

## API

- `window.branchEvolutionChoice.evolve(root)`
- `window.branchEvolutionChoice.select(root, index)`
- `window.branchEvolutionChoice.choose(root)`
- `window.branchEvolutionChoice.reset(root)`
