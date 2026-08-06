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
    'Mount in a relative overflow-hidden host.',
    'Keep --impact-freeze: 80ms and the hard freeze hold (do not slow-mo travel).',
    'Call runImpactFreeze / resetImpactFreeze; state flips to APPLIED only after release.',
    'Six wedges must remain static for the entire freeze window.',
  ],
  acceptance: [
    'Action visibly approaches target with accelerated final 30px',
    'Exact contact is readable; animation freezes for exactly 80ms',
    'Six wedges stay static during freeze',
    'Consequence (wedges out, settle, token collapse) only after freeze',
    'PENDING → APPLIED after release; no looping motion',
    'Reduced motion immediately shows APPLIED',
    'Documented --impact-freeze: 80ms; portable for buttons/cards',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#101218;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
