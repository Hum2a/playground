import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze node positions / snap 260ms / link draw 200ms from contract.json.',
    'Wire runThreePersonCellFormation / resetThreePersonCellFormation / replayThreePersonCellFormation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly 3 nodes (LEAD/SCOUT/SUPPORT) snap from scattered positions',
    'Snap completes in 260ms then 3 links draw over 200ms',
    'Resolved shows FORMED with links fully drawn',
    'Replay returns nodes to scattered before rerunning',
    'Reduced motion shows FORMED with links drawn immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1a1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
