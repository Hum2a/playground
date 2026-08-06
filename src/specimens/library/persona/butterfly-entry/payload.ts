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
    'Mount inside a relative overflow-hidden host so edge entry and orbit stay clipped.',
    'Import demo.css verbatim; keep frozen entry points, waypoints, stagger, and timings.',
    'Wire receiveButterflyRecord / dismissButterflyRecord; dismiss must not reverse the choreography.',
    'Keep the swarm aria-hidden; announce once via the polite status node when the card settles.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate card.',
  ],
  acceptance: [
    'Exactly six abstract CSS forms; no butterfly assets, emoji, or particle systems',
    'Entry positions deterministic; forms approach from multiple directions with frozen waypoints',
    'One partial orbit (~150deg) then all forms converge (scale → ~0.35)',
    'Card emerges from the convergence point with three angular blue backings',
    'Visual relationship clear — forms tuck under card edges before swarm clears',
    'Settled card is static; no remaining motion; DISMISS resets immediately',
    'Reduced motion shows the card immediately; status announces New record received. Specimen 043.',
    'Exact waypoints/delays frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020912;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
