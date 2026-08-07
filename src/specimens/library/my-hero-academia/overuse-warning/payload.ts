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
    'Wire ACTIVATE to runOveruseWarning; RESET restores 25% NOMINAL.',
    'Preserve 580ms step fill; hazard plates and 120ms jitter at WARNING+.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Five deterministic strain steps at 580ms per ACTIVATE',
    'WARNING+ shows hazard plates, hatch overlay, and one-shot ink jitter',
    'ACTIVATE disabled at EXHAUSTED; RESET returns to 25% NOMINAL',
    'Reduced motion skips fill and jitter animations',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
