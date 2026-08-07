import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with preview.scaffold host.',
    'Import demo.css verbatim; freeze fractureDeg −18 / alarm 280ms / flashCount 1 from contract.json.',
    'Wire runBarrierBreachAlert / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Single −18° fracture appears once; no looping flash',
    'Alert latches BREACHED after 280ms alarm beat',
    'Replay returns to SECURE before rerunning',
    'Reduced motion shows BREACHED with static fracture immediately',
    'preview.scaffold hosts the overlay',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
