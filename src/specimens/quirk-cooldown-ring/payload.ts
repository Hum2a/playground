import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'SVG ring circumference 289.03; drain 580ms linear.',
    'Wire runQuirkCooldownRing / reset / replay.',
    'Honour reduced-motion triggers.',
  ],
  acceptance: [
    'Run drains ring COOLDOWN 100% → READY 0%',
    'Accent flash on completion',
    'Replay resets ring to idle READY',
    'Reduced motion skips drain animation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
