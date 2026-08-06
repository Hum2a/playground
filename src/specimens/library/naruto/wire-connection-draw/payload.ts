import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×280+).',
    'Import demo.css verbatim; freeze draw/settle timings from contract.json.',
    'Wire runWireConnectionDraw / resetWireConnectionDraw / replayWireConnectionDraw.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'A single thin line draws from node A to node B',
    'Idle, drawing, and linked states are visually distinct',
    'Both endpoints pulse once the wire completes',
    'Replay retracts the wire before rerunning',
    'Reduced motion shows the completed linked wire immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
