import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire Unlock final to collection→locking→transform→master.',
    'Import demo.css verbatim; freeze collapse 320ms / master 480ms from contract.json.',
    'Keep the collection grid collapsing into the master emblem (not a fifth slot only).',
    'RM selectors must stay on .psc__grid / .psc__slot / .psc__master only — no mega-kit orphans.',
  ],
  acceptance: [
    'Starts at 4 of 5 earned with one empty final slot.',
    'Unlocking the final slot collapses the collection and reveals MASTER COMPLETE.',
    'Master emblem shows four geometric shapes replacing the slot grid.',
    'Reduced motion jumps to master with no collapse/transform animation.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
