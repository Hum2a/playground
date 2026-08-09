# Required Marker Impact (portable recreation spec)

An EMAIL field whose required marker slams in beside a still label.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Label + native `type="email"` input
- Compact `*` marker: `18 × 18px`, backing `#C94F58`, glyph `#E9EEF5`
- Marker starts hidden; `MARK REQUIRED` slams it in
- Label itself does not move

## Entry (180ms)

`translateX(-18px) scale(1.8) rotate(-12deg) opacity 0`
→ `translateX(0) scale(1) rotate(0) opacity 1`
`cubic-bezier(.1,.9,.2,1)`

## Settle (100ms)

Grow to `1.08`, backing shifts `3px`, then return to scale `1`.
No bounce loop.

## Accessibility

- Marker is `aria-hidden`
- Input `aria-required="true"` when marked
- Visually hidden `required` text accompanies the label
- Colour is never the only required signal

## Reduced motion

Marker appears instantly at final scale. No translation or grow.

## Porting

Import `demo.css` verbatim. Tiny JS API: `window.requiredMarkerImpact`.
