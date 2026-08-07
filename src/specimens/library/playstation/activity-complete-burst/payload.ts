import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire Complete to idle→burst→done with exactly 8 geometric particles.',
    'Import demo.css verbatim; freeze burst 560ms / settle 180ms from contract.json.',
    'Preserve circle/cross/square/triangle particle silhouettes.',
    'Preserve both reduced-motion overrides on particles, card, and badge.',
  ],
  acceptance: [
    'Complete fires exactly 8 finite particles (circle, cross, square, triangle ×2).',
    'Burst lasts 560ms then settles with a visible DONE badge.',
    'Particles do not loop after settling.',
    'Reduced motion skips the burst and shows the done state immediately.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
