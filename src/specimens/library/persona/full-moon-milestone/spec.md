# Full Moon Milestone (portable recreation spec)

Incomplete lunar disc becomes a full moon when a milestone is reached.
Numeric progress and milestone symbolism stay distinct. Rebuild from this
document and `contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Label: `PROJECT COMPLETION`
- Initial progress: `74%` → target: `75%`
- Milestone copy: `PHASE III` / `MILESTONE COMPLETE`
- Trigger: `COMPLETE MILESTONE`
- Moon diameter ≈ `130px`

## Illumination vs progress

| Channel | Role |
| ------- | ---- |
| `aria-valuenow` / displayed `%` | Honest project completion (ends at **75**) |
| `--fmm-illum` shade occlusion | Symbolic phase (may reach **100** for full-moon emblem) |

Shade mapping (waxing right→left): `translateX(calc(var(--fmm-illum) * -1%))`.

## Sequence

| Phase | Time | Action |
| ----- | ---- | ------ |
| Step | `0–220ms` | Illum + value `74 → 75` |
| Hold | `220–320ms` | Pause at threshold |
| Sweep | `320–620ms` | Symbolic illum `75 → 100` (progress stays 75) |
| Full | `~620ms` | Thin outer ring |
| Marks | `~660–820ms` | Exactly **8** radial marks, sequential (~20ms stagger), then gone |
| Done | after marks | `PHASE III` settled + `MILESTONE COMPLETE` |

## Accessibility

- `role="progressbar"` with `aria-valuenow` never above 75 after complete
- Live status: e.g. `Project completion 75 percent. Phase III milestone complete.`
- Moon geometry decorative (`aria-hidden`)

## Reduced motion

Immediate `75%` + static full-moon emblem + `PHASE III` + `MILESTONE COMPLETE`.

## API

- `window.fullMoonMilestone.complete(root)`
- `window.fullMoonMilestone.reset(root)`
- `window.fullMoonMilestone.init(scope?)`
