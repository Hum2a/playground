import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the password well in a dark host; keep the mask covering 100% of the field.',
    'Import demo.css verbatim; freeze the jagged clip-path and 2px #72D6E8 tear edge.',
    'Toggle type password↔text for visibility; the mask is visual only.',
    'Reveal 520ms translateX(0→110%); hide 360ms slam from the right — not a reversed peel.',
    'Honour both reduced-motion triggers with an instant mask pose and type swap.',
  ],
  acceptance: [
    'Field is a genuine input type=password with a demo value',
    'REVEAL / HIDE button uses aria-pressed and swaps the input type',
    'Dark mask covers 100% of the well with a deterministic jagged right edge',
    'Reveal peels translateX 0→110% in 520ms cubic-bezier(.2,.8,.2,1) with a 2px cyan tear',
    'Hide slams back from the right in 360ms and is not a literal reverse',
    'Reduced motion swaps type and mask instantly; keyboard toggle works',
    'No external assets, randomness, parent access, or storage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#0a1018;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
