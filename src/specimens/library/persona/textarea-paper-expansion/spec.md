# Textarea Paper Expansion (portable recreation spec)

A MESSAGE field that unfolds like stacked paper on focus and stays open
after blur if it still holds text. Rebuild from this document and
`contract.json`. CSS-only.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Real `<label>`: `MESSAGE`
- Native `<textarea>` `360 × 76px` at rest → `190px` tall when open
- Three paper layers:
  - Main `#E9EEF5`
  - Mid `#C7CDD8` offset `4px`
  - Back `#72D6E8` offset `7px`
- `18 × 18px` CSS corner fold
- No blur filters, no texture images

Use `placeholder=" "` so `:placeholder-shown` detects emptiness.

## Motion

Focus / `:focus-within`: height `76 → 190` in `420ms`,
`cubic-bezier(.2,.8,.2,1)`.

Blur collapse `320ms` **only if empty**. `:not(:placeholder-shown)` keeps
the stack expanded. Do not move focus.

Text stays readable throughout.

## Reduced motion

Instant expand and collapse. All three layers remain visible.

## Porting

Import `demo.css` verbatim. No JavaScript.
