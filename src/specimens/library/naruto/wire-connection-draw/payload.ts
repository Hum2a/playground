import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~400×280+).',
    'Import demo.css verbatim; freeze pathLength 100 / drawMs 180 / snapMs 90 / settleMs 80 from contract.json.',
    'Wire runWireConnectionDraw / resetWireConnectionDraw / replayWireConnectionDraw.',
    'Honour both reduced-motion triggers — show LINKED immediately.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#070B0E;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
