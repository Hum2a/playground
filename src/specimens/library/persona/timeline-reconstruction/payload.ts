import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'SORT slides cards into order (620ms) with 90ms stagger per card.',
    'Wire sort() / reset(); harness restart resets.',
  ],
  acceptance: [
    'SORT slides four event cards into chronological order',
    'Stagger is 90ms between cards; slide duration 620ms',
    'Timeline track appears when sorted',
    'Visible status announces Timeline reconstructed',
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
