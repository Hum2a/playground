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
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; keep the title and metadata lanes legible at the 380px preview, frozen scan 620ms, thresholds 30%/55%, and seven index values.',
    'Wire register/reset via window.entryRegistration or the controls.',
    'Never announce intermediate index numbers to assistive tech — only idle and final registration.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate registered record.',
  ],
  acceptance: [
    'Initial metadata visibly UNKNOWN / UNREGISTERED',
    'ENTRY title remains aligned above the scan record; metadata labels and values remain legible at the 380px preview',
    'Scanner travels left→right in ~620ms; silhouette resolves behind the beam',
    'NAME reveals at 30%, CLASS at 55%; STATUS waits until lock',
    'Index cycles exactly seven deterministic values then locks 086',
    'Four brackets lock; STATUS → REGISTERED; underline grows; final state static',
    'Reduced motion immediate; no external assets; sandbox allow-scripts',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#19252a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
