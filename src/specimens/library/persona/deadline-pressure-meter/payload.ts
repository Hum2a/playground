import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount meter inline; wire runDeadlinePressure / resetDeadlinePressure.',
    'Steps frozen: 14→7→3→1 days with matching compress scales.',
  ],
  acceptance: [
    'Compress trigger advances through four discrete day states',
    'Segments and marker update per step (not infinite loop)',
    'Reset and harness restart return to 14 days',
    'Reduced motion jumps to 1-day state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#101010;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
