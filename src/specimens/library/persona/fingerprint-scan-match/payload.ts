import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'SCAN runs 900ms ridge align then MATCH beat (320ms).',
    'Wire scan() / reset(); harness restart resets to idle.',
  ],
  acceptance: [
    'Scan runs for 900ms while ridges align',
    'MATCH label beats in after alignment',
    'Visible status reports scanning then match confirmed',
    'Reduced motion jumps straight to MATCH',
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
