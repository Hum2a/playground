import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'STRIKE draws -12deg ink line (280ms); FALSE LEAD label remains readable.',
    'Wire strike() / reset(); harness restart resets.',
  ],
  acceptance: [
    'Strike draws a single angled (~-12deg) ink line over the lead',
    'FALSE LEAD label is visible and readable after strike',
    'Hypothesis text stays on the card (not faded away)',
    'Visible status announces False lead struck out',
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
