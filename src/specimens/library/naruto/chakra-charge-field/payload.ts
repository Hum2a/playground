import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~360×300+).',
    'Import demo.css verbatim; freeze diameters [72,96,118,140] and charge 620ms from contract.json.',
    'Wire hold-to-charge plus runChakraChargeField / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Hold charges an irregular boundary through diameters 72→96→118→140px',
    'Release commits current level; full charge settles READY',
    'Run auto-charges to 100% over 620ms then commits 150ms',
    'Replay returns to 0% / idle boundary before rerunning',
    'Reduced motion shows READY at full diameter immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
