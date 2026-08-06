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
    'Mount inside a relative, overflow-hidden host (~360×320).',
    'Import demo.css verbatim; card enter 420ms, settle hold to 1070ms total.',
    'Wire Dispatch / Replay to runMissionIncoming / replayMissionIncoming.',
    'Keep speed lines aria-hidden; announce via aria-live region.',
    'Honour both reduced-motion triggers with instant settled card.',
  ],
  acceptance: [
    'Dispatch trigger slides mission card in from the right',
    'ALERT badge and MISSION ref visible at settled state',
    'Speed lines appear during entry then fade',
    'Replay resets to idle before re-entering',
    'Effect clipped to specimen stage',
    'Reduced motion: card visible immediately without slide',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
