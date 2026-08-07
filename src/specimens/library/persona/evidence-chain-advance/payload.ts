import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'ADVANCE steps 0→3; each step keyframe-draws the preceding link (scaleX, 320ms + 80ms stagger).',
    'Wire advance() / reset(); harness restart resets to step 0.',
  ],
  acceptance: [
    'ADVANCE activates nodes sequentially with yellow link draw from left',
    'Link draw uses scaleX over --eca-link-ms (320ms) with stagger',
    'Visible status reports Chain at step N',
    'Reduced motion shows full links instantly',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`,
  files: { html, css, js },
  spec,
  contract,
}

export default payload
