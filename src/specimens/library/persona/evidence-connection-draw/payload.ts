import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount stage relative; SVG line connects clue button centers.',
    'Two-click selection: first clue then second draws link (480ms).',
  ],
  acceptance: [
    'Selecting two clues draws a yellow line over 480ms',
    'Visible status reads Relationship: linked when connected',
    'Reset clears selection and line; harness restart resets',
    'Reduced motion shows full line without dash draw',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
