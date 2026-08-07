# Card-to-Details Morph

One shared surface morphs from compact tile bounds (`100×120`) to a details
panel (`280×168`). Body copy fades in after an `80ms` delay — shared-element
continuity, not a separate overlay.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `440 × 320px`, `overflow: hidden` |
| Tile size | `100 × 120px` |
| Details size | `280 × 168px` |
| Morph travel | `260ms` |
| Body opacity | `200ms` after `80ms` delay |
| Border | `200ms` |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Phases | `tile` / `details` |

## Interaction

- Click the surface to toggle `data-phase`.
- `aria-expanded` tracks details open state.

## Acceptance

- Same surface morphs 100×120 → 280×168 over 260ms.
- Details body reveals after 80ms delay within the morph.
- Reduced motion snaps size and body with no transition.

## Reduced motion

Both triggers disable `.ctdm__surface` and `.ctdm__body` transitions.
