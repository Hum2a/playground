import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze snapMs 440 / flickerMs 180 / flickerAtMs 300 / settleMs 150 / boltDeg [18,-24,8] from contract.json.',
    'Wire runLightningTargetAcquisition / resetLightningTargetAcquisition / replayLightningTargetAcquisition.',
    'Honour both reduced-motion triggers — resolve straight to LOCKED.',
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
