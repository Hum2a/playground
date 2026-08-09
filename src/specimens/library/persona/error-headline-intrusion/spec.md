# Error Headline Intrusion (portable recreation spec)

A contact-form rejection where a giant decorative ERROR word slides in
behind the card, the form recoils once, and readable inline errors settle.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Fields: `NAME`, `EMAIL`, `MESSAGE` (intentionally invalid)
- Decorative headline: `ERROR` (`aria-hidden`)
- Trigger: `SHOW ERROR` (also autoplays once; replay resets then plays)

Layering (bottom → top): ERROR headline → form background → controls.
Headline is slightly clipped by the overflow-hidden stage.

## Headline

- `font-size: clamp(72px, 18vw, 180px)`, weight `900`
- Colour `#C94F58`, opacity `.16`
- `position: absolute`, `pointer-events: none`
- `translateX(100% → 0)` + `scale(.92 → 1)`
- `420ms`, `cubic-bezier(.15,.85,.25,1)`

## Recoil + error state

Form `translateX(-3px)` once. Red border plus semantic inline error text
(`aria-invalid`, `aria-describedby`). Colour is never the only signal.

## Reduced motion

Final headline immediately. No slide. No form movement. Errors still appear.

## Porting

Import `demo.css` verbatim. Tiny JS trigger API: `window.errorHeadlineIntrusion`.
