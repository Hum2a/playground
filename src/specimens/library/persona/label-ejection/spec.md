# Label Ejection (portable recreation spec)

A floating label that **shoots** upward in two hard stages instead of
gliding on a Material-style curve. Rebuild from this document and
`contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Real `<label for="le-email">` + `<input type="email">`
- Label copy: `EMAIL`
- Label sits **inside** the field at rest
- Angled backing: `90 × 22px`, `#236B91`, rotate `-3deg`
- Ejected text: `#E9EEF5`
- Focused input border: `#72D6E8`

## Eject (focus, empty → up)

Two-stage, **not** a float curve. Total `180ms`, linear:

| Window | Pose |
| --- | --- |
| 0–90ms | `translateY(-20px) scale(0.82)` |
| 90–180ms | `translateY(-34px) scale(0.72)` |

Stay ejected while focused **or** while `:not(:placeholder-shown)`.

## Return (blur, empty)

`140ms` back to the in-field rest pose. Populated fields stay ejected.

## Reduced motion

Jump to the final ejected or rest pose. No travel.

## Porting

Import `demo.css` verbatim. CSS-only: `:focus` + `:not(:placeholder-shown)`
plus `le-eject` keyframes. Use `placeholder=" "` so empty detection works.
