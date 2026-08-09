# Form Completion Strike (portable recreation spec)

A contact-form confirmation: the last valid field enables COMPLETE FORM.
Success brightens the card once, draws a cyan slash, then seats a COMPLETE
badge with four radial accents. Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Fields: `NAME`, `EMAIL`, `MESSAGE`
- Rest: NAME and EMAIL valid; MESSAGE empty / invalid
- Trigger: `COMPLETE FORM` — disabled or no-op until all three are valid
- Replay restores the idle invalid MESSAGE

## Strike + badge

- Slash: `180 × 6px`, rotate `-8deg`, `scaleX(0 → 1)` in `180ms`,
  `cubic-bezier(.15,.85,.25,1)`, colour `#72D6E8`
- COMPLETE badge enters slightly after the strike begins (`220ms`)
- Exactly four radial `2px` accents — no particles
- Form border brightens once

## Status

`role="status"` announces completion. Slash and accents are decorative.

## Reduced motion

COMPLETE + final slash immediately. No draw, no movement.

## Porting

Import `demo.css` verbatim. Tiny JS API: `window.formCompletionStrike`.
