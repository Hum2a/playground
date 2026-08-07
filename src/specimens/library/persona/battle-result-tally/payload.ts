import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host with overflow: hidden.',
    'Wire runBattleResultTally / resetBattleResultTally.',
    'Row delay 180ms; tick 32ms; count XP 500 / SCORE 600 / TOTAL 400.',
  ],
  acceptance: [
    'Rows keyframe in then values count up once',
    'Reduced motion shows finals immediately',
    'Harness restart resets to zeros',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
