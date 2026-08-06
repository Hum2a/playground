import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze cover-at (300ms) / total (700ms) / settle (140ms) from contract.json.',
    'Wire runSmokeMaskTransition / resetSmokeMaskTransition / replaySmokeMaskTransition.',
    'Content swap fires mid-animation while circles are at maximum cover; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Six overlapping circles animate in, fully obscure the panel, then disperse',
    'Content swap is invisible to the viewer — it happens only while fully covered',
    'Replay resets to state one before rerunning',
    'Reduced motion swaps state instantly with no circle choreography',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
