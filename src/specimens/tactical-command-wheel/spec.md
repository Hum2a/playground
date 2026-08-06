# Tactical Command Wheel

## Visual intent

A compact radial command selector. Four commands orbit a centre hub; the wheel rotates in discrete 90° steps so the chosen command snaps into the east (canonical) position. Labels counter-rotate so text stays upright. The final 30° of each step completes faster than the first 60°. Two small cyan brackets frame the selected command. The hub value updates only after the snap finishes.

## DOM structure

- `.tcw[data-tactical-wheel]` — root; `--tcw-rot` drives ring + upright counter-rotation
- `.tcw__ring` — rotating relationship of four slots at ~95px radius
- `.tcw__cmd` — visual command chips (decorative; `aria-hidden` via ring)
- `.tcw__brackets` — fixed east brackets around the selected position
- `.tcw__hub` — centre role `COMMAND` + value (updates after snap)
- `.tcw__list[role=radiogroup]` — semantic radios (VIEW / EDIT / COPY / DELETE)
- `.tcw__controls` — previous / next steppers
- `.tcw__live[aria-live=polite]` — selection announcement

## Copy

| Slot | Text |
| --- | --- |
| Hub role | `COMMAND` |
| Commands | `VIEW`, `EDIT`, `COPY`, `DELETE` |
| Live | `{Command} selected.` |

## Layout and colour contract

| Token | Value |
| --- | --- |
| Radius | `95px` |
| Selected position | East / right |
| Step | `90deg` |
| Travel (first 60°) | `160ms` |
| Snap (final 30°) | `60ms` |
| Total step | `~220ms` |
| Near | `#020912` |
| Deep | `#09233d` |
| Blue | `#1677ad` |
| Bright | `#4bc4ee` |
| Pale | `#d7f7ff` |

No continuous spin — only discrete 90° increments.

## Reduced motion

Under `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`, commands reposition immediately with no travel/snap transition. Hub and selection update together.

## Accessibility

- Real `radiogroup` / `radio` controls with visible labels (spatial position is not the only cue)
- Arrow keys, Home/End, click, and prev/next steppers change selection
- `aria-live` announces the selected command by name
- Decorative ring/brackets/hub are `aria-hidden`
- Visible `:focus-visible` rings on interactive controls

## Porting to another stack

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim into a sandboxed preview host.
2. Call `tacticalCommandWheel.select(index)`, `.next()`, or `.prev()`, or rely on auto-bound controls.
3. Keep `--tcw-rot` registered (`@property`) so ring rotation and upright counter-rotation interpolate together.
4. Do not add continuous rotation, same-origin sandbox flags, or external assets.
