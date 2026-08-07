import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount cards in relative overflow-hidden stage.',
    'Wire runContradictionFound / resetContradictionFound (420ms collide, 360ms flash).',
  ],
  acceptance: [
    'Collide brings cards together over 420ms',
    'Conflicting time values flash yellow for 360ms',
    'CONTRADICTION banner visible at end with status announcement',
    'Harness restart resets to idle review state',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
