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
    'Mount the ~620×360 surface in a relative overflow-clipped host; keep NEXT PHASE outside the stage.',
    'Import demo.css verbatim; freeze 520px crescent, left -420px → calc(100% + 420px), 900ms cubic-bezier(.65,0,.25,1), 2px cyan edge.',
    'Call window.crescentWipe.trigger(root); reset to PAGE A then wipe once; ignore re-entry while busy; never auto-loop.',
    'Keep the crescent aria-hidden; announce state via visible copy and the polite status region.',
    'Honour both reduced-motion triggers with instant PAGE B and no crescent travel.',
  ],
  acceptance: [
    'NEXT PHASE resets to PAGE A then runs exactly one 900ms crescent wipe; busy-guard prevents stacking',
    'Crescent is one 520px circle minus an offset dark circle — reads as a crescent, not a rectangular wipe',
    'Travels left -420px → calc(100% + 420px) with 2px cyan leading edge',
    'PAGE B sits underneath and is fully visible after the wipe',
    'Effect never loops; restart only via NEXT PHASE after settle',
    'Reduced motion: instant PAGE B, no crescent motion',
    'No external dependencies; sandbox allow-scripts only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#09111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
