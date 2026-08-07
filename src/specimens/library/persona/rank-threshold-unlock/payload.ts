import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount progress bar in overflow-hidden stage.',
    'Wire runRankThresholdUnlock / resetRankThresholdUnlock; threshold frozen at 80%.',
  ],
  acceptance: [
    'Fill animates from 72% to 100% past the 80% threshold mark',
    'UNLOCKED flash keyframe plays once after fill',
    'Assist Follow-Up tier remains visible at end',
    'Reset and harness restart return to 72%',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#F7F3E8;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
