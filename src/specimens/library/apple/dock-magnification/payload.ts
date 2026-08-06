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
    'Mount inside a relative overflow-clipped host; rail needs horizontal pointer tracking.',
    'Import demo.css verbatim; freeze tile 42px, gap 8px, padding 12px, sigma 70, max scale 1.65.',
    'Distance uses rest centres; layout redistributes scaled widths without overlap.',
    'Pointer leave settles all scales to 1 over 240ms.',
    'Honour both reduced-motion triggers with outline-only feedback.',
  ],
  acceptance: [
    'Exactly nine items labelled 01–09 with original geometric glyphs',
    'Maximum scale 1.65; closest tile largest; magnification falls with distance',
    'Enlarged tiles do not overlap; baseline-anchored growth',
    'Leaving dock restores exact baseline layout over 240ms',
    'No runtime randomness; keyboard focus understandable without motion',
    'No Apple logos or proprietary icons',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:120px;background:#12151c;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
