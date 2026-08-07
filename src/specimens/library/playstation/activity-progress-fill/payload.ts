import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire Advance to the next frozen step (0→28→55→82→100).',
    'Keep the completion-boundary tick at the track end.',
    'Import demo.css verbatim; freeze fill 480ms from contract.json.',
    'Preserve both reduced-motion overrides on .apf__fill / .apf__card / .apf__chip.',
  ],
  acceptance: [
    'Progress fills in discrete steps 0 → 28 → 55 → 82 → 100 over 480ms each.',
    'A visible completion-boundary tick marks the 100% track end.',
    'At 100%, the percent chip and card read as completed.',
    'Reduced motion jumps to 100% with no fill transition.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
