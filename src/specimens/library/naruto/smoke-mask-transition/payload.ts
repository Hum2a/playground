import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze coverAtMs 300 / totalMs 700 / settleMs 140 / puffCount 6 from contract.json.',
    'Wire runSmokeMaskTransition / resetSmokeMaskTransition / replaySmokeMaskTransition.',
    'Honour both reduced-motion triggers — swap immediately.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#071018;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
