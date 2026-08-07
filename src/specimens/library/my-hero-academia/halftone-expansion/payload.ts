import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden viewport.',
    'Import demo.css verbatim; origin set from trigger centroid via --htx-ox/--htx-oy.',
    'Swap content at coverMs 220 while mask is fully expanded.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: contract.acceptance,
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
