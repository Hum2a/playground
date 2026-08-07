import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount corkboard stage; SOLVE reorganises nodes (680ms) then draws links (520ms).',
    'Wire solve() / reset(); harness restart calls reset.',
  ],
  acceptance: [
    'SOLVE reorganises scattered nodes into a hub graph over 680ms',
    'Yellow/ink links draw over 520ms after reorg',
    'Visible status announces Relationship graph solved',
    'Root is not aria-hidden; decorative SVG is',
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
