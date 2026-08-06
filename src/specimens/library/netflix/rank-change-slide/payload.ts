import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: ['Mount inline; import demo.css verbatim.', 'Honour both reduced-motion triggers.'],
  acceptance: ['Implements Rank Change Slide', 'Reduced motion preserves semantic state'],
  scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
