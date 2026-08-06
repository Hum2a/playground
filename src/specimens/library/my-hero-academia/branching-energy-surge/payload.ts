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
    'Mount inside a relative host with overflow hidden (~360×360).',
    'Import demo.css verbatim; keep branch paths, stroke-dash draw, and core pulse timings.',
    'Wire ACTIVATE via branchingEnergySurge.run(root) or the trigger button.',
    'Replay resets to STANDBY before rerunning the surge sequence.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate READY state.',
  ],
  acceptance: [
    'Four angular branches draw inward from corners toward centre',
    'Core node scales and settles after branch convergence',
    'Brief flash accent at convergence (~520ms)',
    'Final label reads READY with armed status text',
    'Replay returns to exact STANDBY idle before rerun',
    'Effect clipped to host; no external assets; sandbox allow-scripts',
    'Reduced motion shows static converged READY composition',
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
