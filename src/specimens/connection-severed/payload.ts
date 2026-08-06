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
    'Mount inside a relative overflow-hidden host so recoil fragments and tether travel stay clipped.',
    'Import demo.css verbatim; keep frozen tether segment polygons, 12→5px tension height, 20px gap, and timings.',
    'Wire severConnection / reconnectConnection / replayConnectionSevered without duplicating nodes.',
    'Keep data-state in sync with the polite status announcement; leave tether geometry aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate UNLINKED settle.',
  ],
  acceptance: [
    'Two distinct entities are visibly connected by an irregular 3-segment tether',
    'Tension pulls cards ~3px apart and narrows the centre (~12px → 5px) before the snap',
    'Snap opens a ~20px central gap with exactly three angular fragments',
    'Both tether halves recoil toward their cards; cards recoil ~2px outward then settle',
    'Final state shows UNLINKED on both cards with no remaining line',
    'Reconnect restores the tether for demo replay',
    'Reduced motion removes the connection immediately',
    'Status announces Archive disconnected from Portfolio.',
    'Exact geometry and timing are frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1c1c1c;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
