# Moon Orbit Selection (portable recreation spec)

Five fixed destinations around a still orbit. A crescent moon travels the
shortest arc to the active option. Rebuild from this document and
`contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Options (clockwise from top): `HOME`, `STATUS`, `MAP`, `ARCHIVE`, `SETTINGS`
- Do **not** rotate the menu — labels stay put
- Orbit: `260px` diameter, `1px` stroke `#236B91`
- Crescent moon marker: `34px`, sits on the orbit beside the active option
- Active: brighter text, small cyan underline, subtle glow, moon marker
- Field `#09111D`, text `#C7CDD8`, active `#72D6E8`

## Motion

Selection updates a continuous angle. Unwrap the shortest route within
`±180°` so CSS never takes the long way around. Transition `420ms`
`ease-in-out`.

Keyboard (deterministic):

| Key | Direction |
| --- | --------- |
| `ArrowRight` / `ArrowDown` | clockwise (+1) |
| `ArrowLeft` / `ArrowUp` | counterclockwise (−1) |
| `Enter` | select focused option |

## Reduced motion

Moon jumps to the target slot. No travel. Honour both
`@media (prefers-reduced-motion: reduce)` and
`[data-force-reduced-motion="true"]`.

## Accessibility

- `role="radiogroup"` + `role="radio"` with roving `tabindex`
- `:focus-visible` ring `2px #72D6E8`
- Moon geometry is decorative (`aria-hidden`)

## Porting

Import `demo.css` and `demo.js` verbatim. Call `selectOrbit(index)`.
