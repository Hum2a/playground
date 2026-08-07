import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze chargeMs 380 / launchMs 220 / impactMs 200 / settleMs 150 / travelPx 216 from contract.json.',
    'Wire runFireballCommit / resetFireballCommit / replayFireballCommit.',
    'Honour both reduced-motion triggers — resolve straight to CONFIRMED.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0C0806;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
