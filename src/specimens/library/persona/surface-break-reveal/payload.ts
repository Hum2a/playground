import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-clipped host (~240px content height).',
    'Import demo.css verbatim; keep waterline at 38%, 70px rise, five segments, three ripples.',
    'Call surfaceBreakReveal() from SURFACE; resetSurfaceBreak() or harness restart restores idle.',
    'Keep the stage aria-hidden; announce via the polite status region.',
    'Honour both reduced-motion triggers with the immediate recovered path.',
  ],
  acceptance: [
    'Content begins ~70px below final position under the waterline',
    'Submerged portions show ±3px clipped distortion; clear portions do not',
    'Distortion boundary tracks the waterline (including the 8px react bump)',
    'Crossing triggers one restrained surface reaction and exactly three ripples',
    'Water exits downward over ~220ms; final state is static and clear',
    'No heavy blur filters; reduced motion shows recovered state immediately',
    'No external assets; sandbox="allow-scripts" safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020b16;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
