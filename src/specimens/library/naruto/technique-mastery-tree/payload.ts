import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze nodeIds n1–n4 / step 150ms / edge draw 150ms from contract.json.',
    'Wire runTechniqueMasteryTree / resetTechniqueMasteryTree / replayTechniqueMasteryTree.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly 4 nodes unlock in order n1→n4 with 150ms steps',
    'Each unlock draws the preceding edge (scaleX 0→1) before the next node',
    'Resolved shows MASTERED with all nodes and edges filled',
    'Replay locks all nodes/edges before rerunning',
    'Reduced motion shows MASTERED immediately',
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
