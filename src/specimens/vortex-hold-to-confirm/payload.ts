import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze the 900ms hold threshold and 200ms cancel retreat from contract.json.',
    'Wire runVortexHoldToConfirm / resetVortexHoldToConfirm / replayVortexHoldToConfirm.',
    'The core button supports real pointer and Space-key holds; Run/Replay drive the same deterministic path programmatically.',
    'Honour both reduced-motion triggers — manual holds keep the threshold but drop the rotating animation; Run/Replay resolve immediately.',
  ],
  acceptance: [
    'Idle, holding, cancelled, and confirmed phases are visually distinct',
    'Releasing before 900ms never confirms; holding the full duration always confirms',
    'Replay resets the core before rerunning',
    'Reduced motion keeps the hold threshold but removes the rotating ring animation for manual holds; Run/Replay resolve immediately',
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
