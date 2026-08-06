import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×380+).',
    'Import demo.css verbatim; freeze rotate/stagger/settle timings from contract.json.',
    'Wire runShurikenRadialMenu / resetShurikenRadialMenu / replayShurikenRadialMenu.',
    'Sector buttons stay real, focusable elements; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Central glyph rotates and exactly four sectors emerge radially, staggered',
    'Closed, opening, and open states are visually distinct',
    'Sector buttons are keyboard-reachable only while open',
    'Replay closes then reopens the menu',
    'Reduced motion shows all four sectors open immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
