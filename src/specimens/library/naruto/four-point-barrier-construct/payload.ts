import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; four corner nodes connect edge-by-edge before the field fills, timings from contract.json.',
    'Wire runFourPointBarrierConstruct / resetFourPointBarrierConstruct / replayFourPointBarrierConstruct.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Exactly four corner nodes; each activates as the connecting edge reaches it',
    'Protected field only fills once all four edges have closed the perimeter',
    'Idle, constructing, and resolved states are visually distinct',
    'Replay resets all nodes/edges/field before rerunning',
    'Reduced motion shows the closed barrier and filled field immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
