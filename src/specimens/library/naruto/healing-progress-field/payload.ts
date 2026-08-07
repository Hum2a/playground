import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with preview.scaffold host.',
    'Import demo.css verbatim; freeze healOrder [0,1,2] / 25 tiles / 160ms from contract.json.',
    'Wire runHealingProgressField / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    '25 tiles heal by ring order 0→1→2 (centre outward) with 160ms steps',
    'Idle shows DAMAGED; done shows RESTORED with all tiles healed',
    'Replay returns all tiles damaged before rerunning',
    'Reduced motion shows RESTORED immediately',
    'Effect stays inside clipped stage / scaffold host',
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
