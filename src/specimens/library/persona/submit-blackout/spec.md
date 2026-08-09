# Submit Blackout (portable recreation spec)

A compact form that blackouts into graphic silhouettes while submitting.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

Native compact form: `NAME` · `EMAIL` · `MESSAGE` · `SUBMIT`.
`preventDefault` on submit. Values stay in the controls.

## Sequence

1. Button compresses (`~90ms`, scale `0.86`)
2. Overlay `#09111D` expands from the **button centre** — `420ms`,
   `cubic-bezier(.2,.8,.2,1)` (circle clip-path)
3. Labels disappear; field text is visually hidden; geometric silhouette
   blocks stand in for NAME / EMAIL / MESSAGE
4. `PROCESSING` in `#72D6E8` plus a static 1px line (no spinner)
5. Hold `900ms`
6. Reveal `360ms` — overlay retracts, form restores

Submit is disabled for the whole run. Duplicate submits are ignored.
No focus trap. `aria-busy` on the form; `role="status"` announces state.

## Reduced motion

Instant processing composition (no expansion), same `900ms` hold, instant restore.

## Porting

Import `demo.css` verbatim. Tiny JS API: `window.submitBlackout`.
Measure button centre relative to the form and set `--sb-ox`, `--sb-oy`, `--sb-or`.
