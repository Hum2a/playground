# Successful Field Stamp (portable recreation spec)

A form validation success where an `OK` stamp lands beside a still-readable
email field. Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Label: `EMAIL`
- Input value (valid): `user@example.com`
- Trigger: `VALIDATE`
- Stamp text: `OK`

Stamp sits beside the field. Input text stays readable throughout.

## Stamp

- `76 × 46px`, `3px` border `#72D6E8`, face `#111827`
- Rest rotation `-8deg`
- Hard backing `#236B91` (offset, not a blur)
- Decorative (`aria-hidden`)

## Motion

Enter from `translate(24px, -8px) scale(0.75) rotate(-18deg)` to
`translate(0, 0) scale(1) rotate(-8deg)` in `280ms`,
`cubic-bezier(.15,.85,.25,1)`.

At ~`220ms`: overshoot `scale(1.05)`, backing becomes visible.
Settle `120ms` to final scale. No bounce loop.

## Success state

Input border `#72D6E8` plus a subtle highlight. `aria-invalid="false"`.
Polite live status announces validity. Colour is not the only signal
(stamp glyph + border + status).

## Replay

`VALIDATE` resets then replays. Reuse existing nodes — never append stamp copies.

## Reduced motion

Stamp and success border appear immediately at the settled pose.
No rotation or scale animation.

## Porting

Import `demo.css` verbatim. Tiny JS trigger API: `window.successfulFieldStamp`.
