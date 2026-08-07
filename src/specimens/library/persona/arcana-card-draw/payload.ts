import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount deck stage in overflow-hidden host with perspective.',
    'Wire runArcanaCardDraw / resetArcanaCardDraw; rise 480ms then flip 520ms.',
  ],
  acceptance: [
    'Card rises from deck then flips via keyframes (finite)',
    'Face shows CATEGORY / VII (abstract labels)',
    'Reset and harness restart return card face-down in deck',
    'Reduced motion shows face-up end state immediately',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
