import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host with overflow: hidden.',
    'Wire runLevelUpBurst / resetLevelUpBurst.',
    'Roll 120ms; stat stagger 120ms; stat transition 280ms; burst 700ms.',
  ],
  acceptance: [
    'Level rolls once then stats reorder',
    'Reduced motion shows finals immediately',
    'Harness restart resets to level 12',
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
