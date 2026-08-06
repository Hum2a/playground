import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze the staggered rise (500ms total) / settle (150ms) from contract.json.',
    'Wire runEarthWallBlocker / resetEarthWallBlocker / replayEarthWallBlocker.',
    'Honour both reduced-motion triggers — resolve straight to raised/PROTECTED.',
  ],
  acceptance: [
    'Five slabs rise with a visible 55ms stagger between each',
    'Zone label switches from EXPOSED to PROTECTED once the wall is fully up',
    'Replay lowers and re-raises the wall',
    'Reduced motion shows the wall raised immediately with no stagger',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
