import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; barrier starts intact/secure, then fractures at the fixed breach point on trigger.',
    'Wire runBarrierBreachAlert / resetBarrierBreachAlert / replayBarrierBreachAlert.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Barrier starts fully intact (SECURE) with a filled protected field',
    'Breach fractures at one exact fixed point on the perimeter, not a random one',
    'Field and edge recolour to the alert colour once breached; a bounded (non-looping) alarm flash plays once',
    'Idle, breaching, and resolved states are visually distinct',
    'Replay resets to the intact SECURE state before rerunning',
    'Reduced motion shows the breached/alert state immediately with no flash animation',
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
