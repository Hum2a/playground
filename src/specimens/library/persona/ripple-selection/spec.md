# Ripple Selection (portable recreation spec)

Persona 3–inspired selection feedback: choosing an item disturbs a dark blue
liquid surface. Three thin geometric cyan rings expand from the **selected row
centre**, then the choice locks. Original software language — not a game HUD.

Metaphor: user selected something → surface responds → selection locks.

## Visual intent

- Bounded rectangular plate on a deep navy void
- Three stacked option rows (`OPTION A` / `B` / `C`)
- Dark navy rows, 2px border, compact tracked label, angular chevron marker
- Ripple is graphic (faceted rings), not a Material ink blot
- Unselected rows remain visible at opacity `.55`

## DOM structure

```
.rs[data-ripple-selection]
  .rs__kicker                 SURFACE // SELECT
  .rs__plate                  overflow:hidden liquid plate
    .rs__fluid                decorative waterlines
    .rs__list[role=radiogroup]
      button.rs__row[role=radio]
        svg.rs__ripple        3 frozen polygons
        .rs__mark             angular marker
        .rs__label
        .rs__static           RM-only static ring
  .rs__status[role=status]
```

## Copy

| Role | Text |
| --- | --- |
| Kicker | `SURFACE // SELECT` |
| Options | `OPTION A` · `OPTION B` · `OPTION C` |
| Status | `{Option A\|B\|C} selected.` |

## Colours

| Token | Hex |
| --- | --- |
| Void | `#041018` |
| Plate | `#071A2C` |
| Row | `#08182A` |
| Edge | `#163A58` |
| Mid ring | `#236B91` |
| Bright ring | `#72D6E8` |
| Ink | `#D7EEF6` |

## Frozen ripple

| Token | Value |
| --- | --- |
| Rings | 3 |
| Stroke | `2px` (`vector-effect: non-scaling-stroke`) |
| Initial scale | `.1` |
| Final scale | `2.4` |
| Duration | `520ms` |
| Stagger | `45ms` (0 / 45 / 90) |
| Origin | 50% 50% of the selected row |
| Polygon points | `contract.json` → `ripple.rings[].points` |

## Timing

| Phase | Duration |
| --- | --- |
| Selection transition | `120ms` |
| Row illumination | `180ms` |
| Ripple | `520ms` (+ stagger) |
| Total | ≤ `700ms` |

## Selected state

- Opacity `1` vs unselected `.55`
- Stronger cyan border
- Angular marker visible
- Label brighter
- State remains after ripple ends

## API

- `window.rippleSelection.select(root, index)`
- `window.rippleSelection.init(scope?)`

## Reduced motion

Immediate selection lock. No expanding ripple. Selected row shows a **static**
cyan geometric ring plus the stronger border and marker.

## Accessibility

Real `<button>` radios in a `radiogroup`. `aria-checked` exposes selection.
Colour is paired with marker + border + status text. `:focus-visible` cyan ring.
Polite live region announces the final option name only.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep three options, three rings, 2px stroke, `.1→2.4` / `520ms` / `45ms`.
3. Clip overflow on the row and plate.
4. Honour both reduced-motion triggers.
