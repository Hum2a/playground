# Checkbox Impact (portable recreation spec)

A native checkbox whose custom chrome hits a hard offset backing, then draws
a cyan checkmark. Rebuild from this document and `contract.json`. CSS-only.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Native `<input type="checkbox">` (opacity overlay, still clickable/focusable)
- Custom square `34 × 34px`, `2px` border, `1px` radius
- Hard backing always visible: `translate(5px, 5px)` `#236B91`
- Foreground `#111827`
- Label: `ACCEPT TERMS`
- Inline SVG checkmark, `2px` stroke `#72D6E8` — no icon library

## Motion

On check:

- Backing impact snap `90ms`
- Checkmark `stroke-dashoffset` draw `220ms`
- Slight expand, settle `100ms`

On uncheck: reverse in `160ms`.

States are driven by `:checked`. Space toggles the native control.

## Reduced motion

Snap to checked or unchecked immediately. No draw, no scale.

## Accessibility

Focus-visible ring `2px solid #72D6E8` on the custom box. Checkmark shape
(not colour alone) marks the checked state.

## Porting

Import `demo.css` verbatim. No JavaScript.
