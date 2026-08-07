import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with preview.scaffold host.',
    'Import demo.css verbatim; freeze corner coords / edge 220ms / fill 260ms from contract.json.',
    'Wire runFourPointBarrierConstruct / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#070B0E;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
