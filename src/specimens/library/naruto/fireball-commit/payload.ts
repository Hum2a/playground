import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze charge (380ms) → launch (220ms) → impact (200ms) → settle (150ms) from contract.json.',
    'Wire runFireballCommit / resetFireballCommit / replayFireballCommit.',
    'Honour both reduced-motion triggers — resolve straight to CONFIRMED.',
  ],
  acceptance: [
    'Charge, launch, impact, and confirmed phases are visually distinct',
    'Orb visibly grows at the source before travelling to the target',
    'Replay resets the track before rerunning',
    'Reduced motion shows CONFIRMED immediately with no travel',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
