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
    'Mount inside relative overflow-hidden host.',
    'Import demo.css verbatim; freeze 520ms snap translation.',
    'Call runPartSnap() from SNAP.',
    'Use reset/replay for harness restart.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'MODULE-3 starts offset from SLOT A',
    'Magnetic highlight appears on slot before snap',
    'Part locks into slot at settle with checkmark',
    'Replay restores initial positions',
    'Reduced motion jumps to snapped state',
    'Sandbox-safe with no external resources',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:2px solid #101820;background:#F4F7FA;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
