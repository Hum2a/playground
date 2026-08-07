import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×340+).',
    'Import demo.css verbatim; freeze travelMs 340 / mergeMs 200 / settleMs 160 / travelPx 104 / seam 3×44 from contract.json.',
    'Wire runElementMergeRecipe / resetElementMergeRecipe / replayElementMergeRecipe.',
    'Honour both reduced-motion triggers — show the result token directly.',
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
