import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount card in relative overflow-hidden host.',
    'Wrap sequence 500ms; total 1150ms.',
    'Wire Restrict / Replay to runBindingWrapLock.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Four strips wrap card from edges',
    'LOCKED label appears at end',
    'Card border shifts to accent lock state',
    'Replay clears strips and lock',
    'Reduced motion: instant locked state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#F4F7FA;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
