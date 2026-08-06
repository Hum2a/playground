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
    'Mount the discovery-tear card in a relative overflow-hidden host.',
    'Keep the secret underlay in the DOM for the whole life of the effect.',
    'Import demo.css verbatim; keep frozen idle/grown clip-paths and flap polygons.',
    'Wire openDiscoveryTear / resetDiscoveryTear; corner button label must stay “Reveal hidden content”.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the immediate final tear state.',
  ],
  acceptance: [
    'Initial surface appears mostly intact with a ~28×28 torn UR corner clue',
    'Activation begins at that corner control',
    'Opening grows irregularly (not a circular hole) with ~8 frozen edge points',
    'Underlying SECRET SPECIMEN becomes progressively then fully visible',
    'Surface divides into three major flaps that pull outward; residual edges remain',
    'SECRET SPECIMEN does a tiny .96→1 pop near completion',
    'Reduced motion shows final torn-open state immediately; secret becomes available',
    'No external assets/network; geometry and timing frozen in contract',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#1a1a1a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
