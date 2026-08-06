import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; five signal bars rise to fixed target heights from contract.json, tracing the dashed reference line.',
    'Wire runChakraSignatureMatch / resetChakraSignatureMatch / replayChakraSignatureMatch.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Exactly five signal bars rise to meet a dashed reference profile one at a time',
    'Idle, comparing, and resolved states are visually distinct',
    'Replay resets all bars before rerunning',
    'Reduced motion shows all five bars matched immediately',
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
