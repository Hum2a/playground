import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'SWEEP retracts bars left→right (480ms) with 180ms delay on second chunk.',
    'Wire sweep() / reset(); harness restart resets.',
  ],
  acceptance: [
    'Bars sweep left→right (translateX) over 480ms',
    'Second bar delayed 180ms',
    'Visible status announces Content authorised',
    'Reduced-motion selectors target .rr root (not orphan .spec)',
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
