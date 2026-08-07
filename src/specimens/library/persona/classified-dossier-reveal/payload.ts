import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'VERIFY lifts CLASSIFIED stamp/seal then clears dossier lines with stagger.',
    'Wire verify() / reset(); harness restart resets.',
  ],
  acceptance: [
    'CLASSIFIED stamp and seal animate out (not bar-only twin of redaction)',
    'Dossier lines clear with staggered bar travel',
    'CLEARED label appears after verify',
    'Visible status announces Case file verified',
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
