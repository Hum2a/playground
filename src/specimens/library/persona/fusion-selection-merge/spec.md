# Fusion Selection Merge (portable recreation spec)

Two selected sources merge into one result: A + B → C. Rebuild from this document
and `contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.
The metaphor is combination, not destruction.

## Visual intent

- Left: `SOURCE A` / `MOTION` (~140×170, left 22%)
- Right: `SOURCE B` / `GLASS` (~140×170, right 78%)
- Both start bracket-selected (thin blue corners, no looping pulse)
- `FUSE` runs the merge; `RESET` restores both sources exactly
- Result: `RESULT C` / `REFRACTION` with inherited A left notch + B top-right diagonal
- Small `FUSION COMPLETE` label after settle — no success explosion

## Phases (~950ms)

| Phase | Time | Action |
| ----- | ---- | ------ |
| Converge | `0–360ms` | A +95px, B −95px; scale `1→0.9`; rotate `0→±5deg` |
| Compress | `300–480ms` | Overlap; horizontal clip/compress; seam `2→5px` |
| Cover | `420–650ms` | Three glass polygons grow from seam; sources retract inward |
| Result | `600–850ms` | Result `scaleX .15→1.05→1`; backs unfold 0/40/80ms |
| Done | `~950ms` | `FUSION COMPLETE`; single result remains |

## Convergence geometry (frozen)

| Card | Anchor | Travel | End rotate | End scale |
| ---- | ------ | ------ | ---------- | --------- |
| A | `left: 22%` | `+95px` (`--fsm-travel`) | `5deg` | `0.9` |
| B | `left: 78%` | `−95px` | `−5deg` | `0.9` |

Narrow viewports may reduce travel to `72px` while keeping the same ratios.

## Coverage geometry

Three translucent blue polygons expand `scaleX 0.05 → 1.15` from the centre
seam (stagger 0 / 40 / 80ms). No white flash. Hidden state change happens under cover.

## Inheritance

| Source | Trait |
| ------ | ----- |
| A | Left-edge notch (`fsm__notch--a` + notched clip-path) |
| B | Top-right diagonal (`fsm__diag--b` + diagonal clip-path) |
| C | Both traits on the result card |

## Colours

| Token | Value |
| ----- | ----- |
| Near-black | `#020912` |
| Deep blue | `#071e38` |
| Blue | `#176da1` |
| Bright | `#43b8e8` |
| Pale | `#d6f5ff` |

## Accessibility

- Before merge: expose Source A Motion and Source B Glass
- After merge: expose Result C, Refraction; hide decorative source duplicates
- Announce: `Sources merged into Result C.`

## Reduced motion

Immediate sources → result + static `FUSION COMPLETE`.

## API

- `window.fusionSelectionMerge.fuse(root)`
- `window.fusionSelectionMerge.reset(root)`
- `window.fusionSelectionMerge.init(scope?)`
