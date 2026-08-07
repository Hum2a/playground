import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount destination plus six outgoing panel layers inside a 620×400 relative overflow-hidden plate.',
    'Keep panels as the real page fragments — do not generate random shards.',
    'Trigger anticipate → shatter via data-state (or the demo SHATTER control).',
    'Replace demo panel copy with host content; keep gutter, stagger, and flight values unchanged.',
    'Honour both reduced-motion triggers — destination only, no flying pieces.',
  ],
  acceptance: [
    'Exactly six fragments move.',
    'Fragment shapes correspond to the visible page panels (rigid rectangles).',
    'No runtime randomness.',
    'Destination reaches complete visibility.',
    'Replay reconstructs the exact original page.',
    'Reduced motion has no flying pieces.',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:620px;height:400px;max-width:100%;margin:0 auto;background:#111;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
