import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; each completed checkpoint sends a pulse to activate the next, timings from contract.json.',
    'Wire runObjectiveChainAdvance / resetObjectiveChainAdvance / replayObjectiveChainAdvance.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Exactly four checkpoints; only one is ever the current active node at a time',
    'A pulse visibly travels the connecting line before the next checkpoint activates',
    'Idle, advancing, and resolved states are visually distinct',
    'Replay resets the chain to checkpoint one before rerunning',
    'Reduced motion shows all four checkpoints complete immediately',
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
