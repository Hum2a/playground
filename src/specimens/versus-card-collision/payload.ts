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
    'Mount inside a relative overflow-hidden arena host.',
    'Import demo.css verbatim; keep rush and impact timings.',
    'Wire START via versusCardCollision.run(root).',
    'Cards must start off-screen and collide at centre.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'ALPHA and BETA cards rush from opposite edges',
    'Brief impact flash at collision',
    'VS label scales up at clash',
    'Final tilted locked positions',
    'Replay resets to staged idle',
    'Clipped to arena; sandbox allow-scripts',
    'Reduced motion shows clashed state immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
