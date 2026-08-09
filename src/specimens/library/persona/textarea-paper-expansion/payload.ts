import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the 360px paper stack with room for the 7px cyan offset; import demo.css verbatim.',
    'Keep a real MESSAGE label + native textarea; placeholder is a single space for :placeholder-shown.',
    'Expand on :focus / :focus-within to 190px in 420ms; collapse 320ms only while empty.',
    'Do not move focus. Text stays readable. Three layers remain visible when motion is reduced.',
    'Honour both reduced-motion triggers with instant expand/collapse.',
  ],
  acceptance: [
    'Real label MESSAGE and a native textarea 360×76 at rest',
    'Focus expands height to 190px over 420ms cubic-bezier(.2,.8,.2,1)',
    'Three paper layers: #E9EEF5, #C7CDD8 at 4px, #72D6E8 at 7px, plus an 18×18 corner fold',
    'Blur collapses in 320ms only when empty; filled text keeps the tall stack',
    'Focus is not relocated; typed text stays readable throughout',
    'Reduced motion snaps expand/collapse; layers remain visible',
    'CSS-only; no blur filters, textures, or external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
