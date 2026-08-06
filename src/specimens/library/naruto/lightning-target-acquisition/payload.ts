import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze snap (440ms) / settle (150ms) from contract.json.',
    'Wire runLightningTargetAcquisition / resetLightningTargetAcquisition / replayLightningTargetAcquisition.',
    'Honour both reduced-motion triggers — resolve straight to LOCKED.',
  ],
  acceptance: [
    'Idle, acquiring, and locked phases are visually distinct',
    'Reticle visibly travels from an offset position onto the target',
    'Branch marks flicker briefly just before lock, then disappear',
    'Replay resets the reticle before rerunning',
    'Reduced motion shows LOCKED immediately with no snap/flicker',
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
