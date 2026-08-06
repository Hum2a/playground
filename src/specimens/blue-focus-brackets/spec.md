# Blue focus brackets (portable recreation spec)

Accessible keyboard focus treatment: four small angular blue brackets appear
around the focused interactive element. This is a **focus** primitive — not
hover, selected, or active state.

Rebuild from this document, `demo.css`, and `contract.json`. CSS-only.

## Scaffold

Real buttons: `PREVIEW` · `COPY` · `EXPORT`

## Brackets

Four corners, each ≈ `12 × 12px`, stroke `2px`, pale blue `#b9e7ff`.

Rest (unfocused): offset outward by `4px`, opacity `0`.

`:focus-visible`: travel inward `4px` over ≈ `120ms`, opacity → `1`. No overshoot.

Blur/exit: retract outward and fade over ≈ `80ms`.

## Distinction

| State | Brackets |
| --- | --- |
| Hover | No |
| `:focus-visible` | Yes |
| `:active` / click | No permanent brackets |
| Selected | N/A (no selection model) |

## Accessibility

- Real `<button>` controls; Tab navigation works
- Use `:focus-visible` (not bare `:focus`) so mouse click does not leave brackets
- Decorative brackets `aria-hidden`
- Native outline replaced only with an equivalent high-contrast visible treatment

## Reduced motion

Brackets appear immediately at final inset. No travel animation.
