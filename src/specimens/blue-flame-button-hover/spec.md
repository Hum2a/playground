# Blue Flame Button Hover

## Visual intent

A static angular button (`OPEN RECORD`, ~190×48px) grows five graphic blue energy polygons from its upper edge on hover and keyboard focus. Shapes are CSS clip-path polygons — restrained energy, not realistic flame. Text shifts 3px right; a thin lower edge brightens.

## DOM structure

- Root `.blue-flame-hover`
- Real `<button>` with decorative energy layer (`aria-hidden`), lower edge, and label

## Copy

| Role | Text |
| --- | --- |
| Label | `OPEN RECORD` |

## Layout and colour contract

Near-black / deep blue / bright cyan (`#020912` / `#071f3d` / `#176fa8` / `#4dbce8` / `#d9f7ff`). Five frozen polygons along the top edge. Rest: `scaleY(0)`. Active: scaleY `{0.85, 1.25, 1, 1.4, 0.65}` and translateY `{-8, -12, -10, -14, -5}px`. Enter 150ms, exit 120ms, optional 1200ms two-state pulse while held.

## Reduced motion

Under `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`, hover/focus shows the five shapes at their settled transforms with no entrance animation and no loop.

## Accessibility

Real button. `:focus-visible` matches `:hover` energy treatment plus a verdigris-adjacent cyan outline. Energy layer is decorative (`aria-hidden`).

## Porting to another stack

Import `demo.css` verbatim. Keep five polygons, scaleY/translate values, and enter/exit timings. Prefer `:hover` + `:focus-visible` together.
