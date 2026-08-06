import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~400×320).',
    'Import demo.css verbatim; wire toggleControlCenter for open/dismiss.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Open raises bottom strip; dismiss restores full game view',
    'TITLE A game surface remains visible while strip is open',
    'Reduced motion shows strip instantly at final position',
    'Palette uses #2E90FF / #0B0F14 / #F4F6F8 / #7EB6FF',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
