import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'LOCK IN converges observations (560ms) then LOCKED flash (360ms).',
    'Wire lock() / reset(); harness restart resets.',
  ],
  acceptance: [
    'Observations converge into conclusion card over 560ms',
    'LOCKED stamp flashes over 360ms at end',
    'Visible status announces Deduction locked in',
    'Reduced motion shows conclusion + LOCKED immediately',
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
