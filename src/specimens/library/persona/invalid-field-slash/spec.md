# Invalid Field Slash (portable recreation spec)

A form validation rejection where a sharp graphic slash crosses underneath
the still-readable input. Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Label: `USERNAME`
- Input value (intentionally invalid): `humza_123`
- Field: `320 × 58px`
- Trigger: `VALIDATE`

Layering (bottom → top): opaque paper plate → slash → transparent input text.

## Slash

- `350 × 8px`, rotate `-7deg`, `transform-origin: left center`
- `scaleX(0 → 1)` in `220ms`, `cubic-bezier(.15,.8,.25,1)`, starts at `40ms`
- Colour `#C94F58`
- Remains visible after settle

## Recoil

Field `translateX(-3px)` for `90ms` once. No continuous shake.

## Error state

Dark-red border, visible slash, `INVALID VALUE` via `aria-describedby`.
Input `aria-invalid="true"`.

## Reduced motion

Immediate final slash + error text. No draw, no recoil.

## Porting

Import `demo.css` verbatim. Tiny JS trigger API: `window.invalidFieldSlash`.
