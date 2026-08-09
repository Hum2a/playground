import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a 620×400 dark host so the horizon sits at 72% of the preview height.',
    'Import demo.css verbatim; keep the 120px moon, +110px start offset, and −15px rest pose.',
    'Treat sky geometry as decorative; announce the revealed state in surrounding UI if needed.',
    'Honour both reduced-motion triggers with the final risen composition and visible NIGHT PHASE label.',
  ],
  acceptance: [
    'Moon begins 110px below the horizon at opacity .35 and rises once to −15px at opacity 1',
    'Rise lasts 1100ms with cubic-bezier(.2,.8,.2,1); cyan rim brightens during the travel',
    'Horizon highlight lasts 220ms; NIGHT PHASE enters after 750ms over 320ms',
    'Exactly 18 deterministic stars; at most 5 pulse once; no looping twinkle',
    'Reduced motion shows the final moon, horizon, stars, and label immediately',
    'No JavaScript, external images, or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#09111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
