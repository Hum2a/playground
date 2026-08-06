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
    'Mount inside a relative overflow-hidden host (~360×360).',
    'Import demo.css verbatim; keep stroke-dash scribble timings.',
    'Wire RUN via analysisScribbleReveal.run(root) or the trigger.',
    'Replay resets to unmarked idle before rerunning.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Circle, arrow, and underline marks draw in sequence on profile panel',
    'OUTPUT value emphasised in accent at end state',
    'Status announces annotation completion',
    'Replay returns to exact idle before rerun',
    'Clipped to host; no external assets; sandbox allow-scripts',
    'Reduced motion shows all marks immediately',
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
