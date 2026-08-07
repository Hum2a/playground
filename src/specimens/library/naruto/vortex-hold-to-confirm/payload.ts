import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze holdMs 900 / cancelMs 200 / confirmPulseMs 180 / ringCount 3 from contract.json.',
    'Wire runVortexHoldToConfirm / resetVortexHoldToConfirm / replayVortexHoldToConfirm.',
    'Core button supports real pointer and Space-key holds; early release must cancel.',
    'Honour both reduced-motion triggers — manual holds keep the threshold; Run/Replay resolve immediately.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
